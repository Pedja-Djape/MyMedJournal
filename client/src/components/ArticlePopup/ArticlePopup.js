
import classes from "./ArticlePopup.module.css";


const ArticlePopup = (props) => {
    
    return (<>
        <div className={classes.card} >
            <div className={classes['card-header']}>
                <a href={`https://pubmed.ncbi.nlm.nih.gov/${props.id}/`} target="_blank">{props.title}</a>
            </div>
            <div className={classes.abstractTitle}>Abstract</div>
            <div className={classes['card-body']}>
                {props.body}
            </div>
            <div className={classes['card-footer']}>
                <button type='button' className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div> 

        </div>
    </>)
};


export default ArticlePopup;
