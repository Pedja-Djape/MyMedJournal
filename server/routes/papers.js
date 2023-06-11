const express = require('express');
const xml2js = require('xml2js');


const router = express.Router();

const apiHelper = require('../util/http');
const papersHelper = require('../util/papers');
const authenticateToken = require('../middleware/auth');
const Articles = require('../models/acticles.model')

const HOST = "eutils.ncbi.nlm.nih.gov";
const BASE_PATH = "/entrez/eutils";



const parser = new xml2js.Parser();

// Define Error Handling Middleware
const errorHandler = (error, req, res, next) => {
    return res.status(error.status).json({
        message: error.message,
        code: error.status || 400,
        data: [],
        success: false 
    })
}

const isValidQueryParam = p => {
    if (!p || p && p.trim() === "") {
        return false
    }
    return true;
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

async function searchArticles({query}) {
    // get search query params
    const db = query.db;
    let term = query.term;
    const articleIds = query.articleIds;
    // need valid db
    if (!isValidQueryParam(db)) {
        return {
            status: 422,
            data: {
                errors: {
                    db: "Error! Please specify a valid database.",
                }
            }
        }
    }
    // if articleIDs not specified and invalid search term
    if (!isValidQueryParam(articleIds) && !isValidQueryParam(term)) {
        return {
            status: 422,
            data: {
                errors: {
                    term: "Error! Please specify a valid search term.",
                }
            }
        }
    }
    let searchTerm;
    try {
        let aUIDs = null;
        // if articleIds not specified
        if (!isValidQueryParam(articleIds)) {
            // replace spaces in search query with '+' sign
            searchTerm = term.replace(" ","+");

            // get returned article IDs
            query.term = searchTerm;
            const response = await getArticleUIDs(query);
            
            let data = null;
            parser.parseString(response, (e,d) => data = d);
            if (data.eSearchResult.Count == '0') {
                return {
                    status: 422,
                    data: {
                        errors: {
                            term: "Invalid search term. Found no articles relating to query"
                        }
                    }
                }
            }
            // Array of article IDs
            aUIDs = data.eSearchResult.IdList[0]['Id'].toString()
        } else {
            aUIDs = articleIds;
        }

        // get metadata about article
        const articleInfo = await getArticleInfo(aUIDs,"","",db);
        
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
        return {
            status: 200,
            data: {
                data: rval,
                success: true,
                message: "Sucessfully obtained article information."
            }
        }
    } catch (error) {
        return {
            status: 500,
            data: {
                errors: {
                    server: "Unable to fetch articles."
                }
            }
        }
     }
}

router.get("/search", async (req, res) => {
    
    const response = await searchArticles({query: req.query});
    return res.status(response.status).send(response.data);
});

router.get('/', authenticateToken, async (req, res) => {
    const uid = req.user.userId;
    try {
        const favIds = await Articles.findOne({_id: uid}).exec();
        
        if (favIds.articles.length === 0) {
            return res.status(200).send({
                message: "Successfully obtained user's favorite articles.",
                data: [],
            });
        }
        const userFavorites = await searchArticles({
            query: {
                db: 'pubmed',
                term: null,
                articleIds: favIds.articles.toString()
            }
        });
        return res.status(userFavorites.status).send(userFavorites.data);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Failed to obtain favorite articles.",
            error
        })
    }
    
})

router.put('/', authenticateToken, async (req, res) => {
    const uid = req.user.userId;
    const aid = req.body.articleId;

    if (!isValidQueryParam(aid)) {
        return res.status(422).send({
            errors: {
                articleId: "Error! Please provide a valid article ID."
            }
        });
    }
    
    try {
        await Articles.updateOne(
            {_id: uid},
            {$addToSet: { articles: aid }}
        );
        return res.status(200).send({
            message: "Successfully added article to favorites.",
            articleId: aid
        });
    } catch (error) {
        return res.status(500).send({
            message: "Failed to add article to favorites.",
            error
        });
    }
    
});

router.delete('/', authenticateToken, async (req,res) => {
    const uid = req.user.userId;
    const aid = req.body.articleId;
    if (!aid || (aid && aid.trim() === "")) {
        return res.status(422).send({
            errors: {
                articleId: "Error! Please provide a valid article ID."
            }
        });
    }

    try {
        await Articles.updateOne(
            { _id: uid },
            { $pull: { articles: { $in: aid } } }
        );
        return res.status(200).send({
            message: "Sucessfully removed article from favorites.",
            articleId: aid
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to remove article from favorites.",
            error
        })
    }
    
})



router.use(errorHandler);

module.exports = router;
