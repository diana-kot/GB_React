import React, { useState } from "react";
import PropTypes from 'prop-types'

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);
  return {
   bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddChat({ onCreate }) {
  const input = useInputValue("");

  function submitHandler(e) {
    e.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type="submit">Add chat</button>
    </form>
  );
}

AddChat.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddChat;
