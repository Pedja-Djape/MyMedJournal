import classes from "./NoteCard.module.css";


const NoteCard = (props) => {

    return <>
        <div className={classes.card} >
            <div className={classes['card-header']}>
                {props.title}
            </div>
            <div className={classes['card-body']}>
                {props.content}
            </div>
        </div>
    </>
};

export default NoteCard;