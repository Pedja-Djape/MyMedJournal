import classes from "./Card.module.css";
import tmp from '../../images/search.png'

import { useState } from 'react';

const Card = (props) => {
    
    return <>
        <div className={classes.card} style={{'backgroundColor': props.color}}>
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