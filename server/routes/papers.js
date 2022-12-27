const express = require('express');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

const router = express.Router();
const https = require('https');

const HOST = "eutils.ncbi.nlm.nih.gov";
const BASE_PATH = "/entrez/eutils";


// Define Error Handling Middleware
const errorHandler = (error, req, res, next) => {
    res.json({
        message: error.message,
        code: error.status || 400,
        data: [],
        success: false 
    })
    res.status(error.status)
    return res.send();
}

// Function to obtain article UIDs, based on database and query term
const getArticleUIDs = (db,term) => {
    const options = {
        host: HOST,
        path: `${BASE_PATH}/esearch.fcgi?db=${db}&term=${term}`,
        method: "GET"
    }
    return new Promise( (resolve,reject) => {
        https.request(
            options,
            (apiResponse) => {
                let data = '';
                // get the data 
                apiResponse.on('data', chunk => data += chunk);
                // when request completes, resolve the promise with final data object
                apiResponse.on('end', () => resolve(data));
            }).on('error',error => { // throw err
                reject(error.message);
            }).end();
    });
}

// Function to obtain article metadata (abstract, citations, etc.)
const getArticleInfo = (uidList,retmode,rettype,db) => {
    const options = {
        host: HOST,
        path: `${BASE_PATH}/efetch.fcgi?db=${db}&retmode=${retmode}&rettype=${rettype}&id=${uidList}`,
        method: "GET"
    }
    return new Promise( (resolve, reject) => {
        https.request(
            options,
            apiResponse => {
                let data = '';
                // get data in chunks
                apiResponse.on('data', chunk => data += chunk);
                // resolve promise when response ends
                apiResponse.on('end', () => resolve(data));
            }).on('error', error => reject(error.message) )
            .end();
    } );
}

const genArticleObject = (db,article) => {
    // assuming db is pubmed for now
    if (db === "pubmed") {
        let title = article.MedlineCitation[0].Article[0].ArticleTitle[0];
        let abstract = '';
        const uid = article.MedlineCitation[0].PMID[0]._;

        // get title
        if (typeof(title) !== 'string' && typeof(title) === "object") {
            title = title._;
        }
        // get abstract text    
        if (!("Abstract" in article.MedlineCitation[0].Article[0])) {
            return null;
        } 
        if (article.MedlineCitation[0].Article[0].Abstract[0].AbstractText.length === 1){
            abstract = article.MedlineCitation[0].Article[0].Abstract[0].AbstractText[0]
            if (typeof(abstract) !== "string" && typeof(abstract) === "object") {
                abstract = abstract._;
            }
        }
        // if abstract composed of sections: (Intro, methods, results, discussion,...)
        else {
            for (const section of article.MedlineCitation[0].Article[0].Abstract[0].AbstractText) {
                abstract += `${section._} `
            }
        }
        return {
            'id': uid,
            'title': title,
            'abstract': abstract
            }; 
    };
}

router.get("/search", 
    (req,res,next) => {
        // get query params
        
        const db = req.query.db; 
        let term = req.query.term; 
        
        // *** VALIDATE DB ***
        if (!db || db.trim() === "") {
            const err = new Error("Please provide a valid database to search a query for.");
            err.status = 400;
            return next(err);
        }

        // ***VALIDATE TERM***
        if (!term || term.trim() === "") {
            const err = new Error("Please provide a valid query term to search in a database.");
            err.status = 400;
            return next(err); 
        }
        // replace spaces in search query with '+' sign
        term = term.replaceAll(" ","+");
        console.log(term);
        // get returned article IDs
        const UIDs =  getArticleUIDs(db,term);
        
        // if successfull call
        UIDs.then( response => { // response var contains UIDs
            // convert xml to json
            let data = null;
            parser.parseString(response, (e,d) => data = d);
            
            // Array of article IDs
            const aUIDs = data.eSearchResult.IdList[0]['Id'] 
            // get metadata about article
            const articleInfo = getArticleInfo(aUIDs.toString(),"","",db);
            articleInfo.then( info => {
                // convert to json
                let ainfo = null;
                parser.parseString(info, (e,d) => ainfo = d);
                const rval = [];
                // iterate over pubmed articles
                for (article of ainfo.PubmedArticleSet.PubmedArticle) {
                    const articleObject = genArticleObject(db,article);
                    if (articleObject !== null) {
                        rval.push(articleObject);
                    }
                    
                }
                
                res.status(200);
                res.json({
                    data: rval,
                    success: true,
                    message: "",
                    code: res.statusCode
                }); 
            })
            articleInfo.catch( error => {
                res.status(400);
                next(error);
            })
        })
        UIDs.catch( error => {
            res.status(400);
            next(error);
        });
    
});

// Alternative method, using async/await

// router.get("/search", 
//     // define async fxn (returns promise)
//     async (req,res) => {
//         try {
//             // wait until promise is settled
//             const UIDs = await getArticleUIDs("pubmed","covid");
//             res.send(UIDs);
//         }
//         catch (error) {
//             res.status(400);
//         }
// })

router.get("/", (req,res) => {
    
    res.send({some:"json"})
})


router.use(errorHandler);

module.exports = router;
