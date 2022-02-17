import React from "react";
const Message = (props) => {
    return (<>
        <p>&nbsp;</p>
        <h5>{props.title}</h5>
        <p>&nbsp;</p>
        <p>{props.header}</p>
        <p>&nbsp;</p>
        <p>{props.body}</p>
        <p>&nbsp;</p>
        <p>{props.footer}</p>
    </>);
}
export default Message;