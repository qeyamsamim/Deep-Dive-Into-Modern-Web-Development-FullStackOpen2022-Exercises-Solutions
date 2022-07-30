import React from "react";
import "./Message.css";

const Message = ({message, messageType}) => {

    return <div>
        <p className={`text-color ${messageType === "success" || "text-color-red"}`}>{message}</p>
    </div>
}

export default Message;