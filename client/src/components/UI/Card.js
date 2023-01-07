import classes from "./Card.module.css";


const Card = (props) => {

    
    
    const handleCardClick = () => {
        props.onCardClick(props.title,props.body)
    }


    
    return <>
        <div className={classes.card} style={{'backgroundColor': props.color}} onClick={handleCardClick}>
            <div className={classes['card-header']}>
                {props.title}
            </div>
            <div className={classes['card-body']}>
                {props.body}
            </div>
            <div className={classes['card-footer']}>
                <button type='button'>See More.</button>
            </div> 
        </div>
    </>
};

export default Card;