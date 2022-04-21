import { useState, useRef, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import "./form.scss";

export const Form = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const textField = useRef("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value) return;
    onSubmit(value);
    setValue("");
  };

  useEffect(() => {
    textField.current.focus();
  }, []);

  return (
    <form className="typeform" onSubmit={handleSubmit}>
      <TextField
        className="typeform__input"
        id="outlined-basic"
        variant="outlined"
        size="small"
        type="text"
        value={value}
        onChange={handleChange}
        inputRef={textField}
      />
      <Button
        className="typeform__submit"
        endIcon={<SendIcon />}
        variant="contained"
        size="small"
        type="submit"
      >Add chat</Button>
    </form>
  );
};
