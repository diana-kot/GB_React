import React from "react"
import './styles.scss';


export function Message ({messages}) {
  return(
      <div className="message-list">
          {messages.map((message) => {
              return <div className={message.author === "me" ? "message" : "answer"}>
                  {message.text}
                  <div className="author">{message.author}</div>
              </div>
          })}
      </div>
  )
}





