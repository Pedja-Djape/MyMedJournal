import { useSelector } from "react-redux";
import classes from "./Card.module.css";
import { useNavigate } from "react-router-dom";



const Card = (props) => {

    const { buttonInfo } = props;
    const authState = useSelector(state => state.auth);   
    const navigate = useNavigate(); 
    const handleCardClick = () => {
        props.onCardClick(props.title,props.body,props.id);
    }

    const favHandler = () => {
        fetch("http://localhost:9000/papers", {
            method: buttonInfo.method,
            headers: {
                "Authorization": "Bearer " + authState.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                articleId: props.id
            })
        });
        navigate('.')
        
    }
    
    return <>
        <div className={classes.card} style={{'backgroundColor': props.color}} >
            <div className={classes['card-header']}>
                {props.title}
            </div>
            <div className={classes['card-body']}>
                {props.body}
            </div>
            <div className={classes['card-footer']}>
                <button onClick={handleCardClick} type='button'>See More.</button>
                <div className={classes.fav}>
                    <button onClick={favHandler} type='button'>{buttonInfo.title}</button>
                </div>
            </div> 
        </div>
    </>
};

export default Card;