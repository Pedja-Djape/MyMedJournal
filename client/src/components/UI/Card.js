import classes from "./Card.module.css";
import tmp from '../../images/search.png'

import { useState } from 'react';

const Card = (props) => {
    
    const mainText = props.body.slice(0,300);
    const remainingText = props.body.slice(300,props.body.length);

    const [textBody, setTextBody] = useState(mainText + '...');

    

    const onSeeMore = () => {
        setTextBody(props.body);
    }

    return <>
        <div className={classes.card}>
            <div className={classes['card-header']}>
                {props.title}
            </div>
            <div className={classes['card-body']}>
                {textBody}
            </div>
            <div className={classes['card-footer']}>
                <button type='button' onClick={onSeeMore}>See More.</button>
            </div> 
        </div>
    </>
};

export default Card;