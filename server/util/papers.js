const genArticleObject = (db,article) => {
    // assuming db is pubmed for now
    if (db === "pubmed") {
        let title = article.MedlineCitation[0].Article[0].ArticleTitle[0];
        let abstract = '';
        const uid = article.MedlineCitation[0].PMID[0]._;
        
        let isFreeFT = false;
        for (id of article.PubmedData[0].ArticleIdList[0].ArticleId) {
            if (id['$'].IdType === 'pmc') {
                isFreeFT = true;
            }
        }
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
            'abstract': abstract,
            'isFreeFT': isFreeFT
            }; 
    };
}

module.exports = { genArticleObject }