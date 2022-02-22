import PropTypes from 'prop-types'
import React from 'react'
import "./styles.scss";


export const Message = ({ text, author }) => {
    return (
      <div className="message-list">
        <div className={author === "me" ? "message" : "answer" }>
          {author}: {text}
        </div>
      </div>
    );
  };
  
  Message.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number]),
    author: PropTypes.string.isRequired,
  };
  
  
  


