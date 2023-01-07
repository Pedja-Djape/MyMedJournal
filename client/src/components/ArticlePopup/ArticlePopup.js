
import classes from "./ArticlePopup.module.css";


const ArticlePopup = (props) => {
    
    return (<>
        <div className={classes.card} style={{'backgroundColor': props.color}}>
            <div className={classes['card-header']}>
                {props.title}
            </div>
            <div className={classes.abstractTitle}>Abstract</div>
            <div className={classes['card-body']}>
                {props.body}
            </div>
            <div className={classes['card-footer']}>
                <div>
                    <button type='button' className={classes.button} onClick={props.onClose}>
                        Close
                    </button>
                </div>
            </div> 

        </div>
    </>)
};


export default ArticlePopup;
