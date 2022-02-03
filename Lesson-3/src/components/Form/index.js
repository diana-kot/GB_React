import React, { useState, useRef, useEffect } from "react";
import "../Form/style.scss";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { TextField } from "@material-ui/core";

export const Form = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const textField = useRef();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim()) {
      onSubmit(value);
      setValue("");
    }
  };

  useEffect(() => {
    textField.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form__mes">
      <div className="mes__content">
        <TextField
          style={{ margin: "10px" }}
          id="outlined-basic"
          variant="outlined"
          value={value}
          onChange={handleChange}
          placeholder="type your message..."
          size="small"
          inputRef={textField}
        />
        <Stack direction="row" spacing={2}>
          <Button className="btn" type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Stack>
      </div>
    </form>
  );
};
