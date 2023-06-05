const express = require('express');
const xml2js = require('xml2js');


const router = express.Router();

const apiHelper = require('../util/http');
const papersHelper = require('../util/papers');

const HOST = "eutils.ncbi.nlm.nih.gov";
const BASE_PATH = "/entrez/eutils";



const parser = new xml2js.Parser();

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
const getArticleUIDs = (query) => {
    const options = apiHelper.genOptionsObject(
        query,
        HOST,
        `${BASE_PATH}/esearch.fcgi`
    );
    return apiHelper.genApiRequestPromise(options);
}

// Function to obtain article metadata (abstract, citations, etc.)
const getArticleInfo = (uidList,retmode,rettype,db) => {
    const options = apiHelper.genOptionsObject(
        {db, retmode, rettype},
        HOST,
        `${BASE_PATH}/efetch.fcgi`
    );
    options.path = options.path + "&id=" + uidList;
    
    return apiHelper.genApiRequestPromise(options);
}



router.get("/search", 
    async (req,res,next) => {
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
        try {
                // get returned article IDs
            const response = await getArticleUIDs(req.query);
            let data = null;
            parser.parseString(response, (e,d) => data = d);
            if (data.eSearchResult.Count == '0') {
                const ERROR = {
                    message: "Invalid Query. 0 Articles found matching entered query.",
                    status: 400
                };
                return next(ERROR);
                
            }
            // Array of article IDs
            const aUIDs = data.eSearchResult.IdList[0]['Id'] 
            // get metadata about article
            const articleInfo = await getArticleInfo(aUIDs.toString(),"","",db);
            
            let ainfo = null;
            parser.parseString(articleInfo, (e,d) => ainfo = d);
            const rval = [];
            // iterate over pubmed articles
            for (article of ainfo.PubmedArticleSet.PubmedArticle) {
                const articleObject = papersHelper.genArticleObject(db,article);
                if (articleObject !== null) {
                    rval.push(articleObject);
                }
                
            }
            
            return res.status(200).json({
                data: rval,
                success: true,
                message: "",
                code: res.statusCode
            }); 
        } catch (error) {
            res.status(500);
            return next(error);
        }
});



router.use(errorHandler);

module.exports = router;
