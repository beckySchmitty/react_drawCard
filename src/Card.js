import React from "react";

const Card = ({name, img}) => {

    return (    
        <div>
            <img alt={name} src={img}></img>
        </div>
    )
}

export default Card;