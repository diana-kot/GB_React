import React, { useState } from "react";
import "../Form/style.scss";

export const Form = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };
  return (
    <form onSubmit={handleSubmit} className="form__mes">
      <div className="mes__content">
        <input
          className="mes__input"
          type="text"
          value={value}
          type="text"
          placeholder="type your message..."
          onChange={handleChange}
        />
        <button className="mes__button" type="submit">
          send
        </button>
      </div>
    </form>
  );
};
