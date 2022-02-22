import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List/List";
import { Link, Outlet } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem/ListItem";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import { addChat, deleteChat } from "../../store/actionCreators/chats";
import {addMessage, deleteChatMessages} from "../../store/actionCreators/messages";
import { chatsSelector } from "../../store/selectors/chats";
import Button from "@material-ui/core/Button/Button";
import { Dialog, DialogContent, Modal, TextField } from "@material-ui/core";
import { addChatMessages } from "../../store/actionCreators/messages";

const useStyles = makeStyles({
  list: {
    display: "flex",
    flexWrap: "wrap",
  },
  listItem: {
    flexWrap: "wrap",
    width: "calc(33.333% - 40px)",
    minWidth: "300px",
    margin: "20px",
    padding: "25px",
  },
  link: {
    fontSize: ".8em",
    textTransform: "uppercase",
    textDecoration: "none",
    textAlign: "center",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "140px",
    height: "33px",
    borderRadius: "10px",
    background: "#490b52",
  },
  deleteButton: {
    margin: "0 0 0 10px",
  },
});

export const ChatList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const chats = useSelector(chatsSelector);

  const {chatId} = useParams()
    const navigate = useNavigate()
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addChat(`chat-${name}`, name));
    dispatch(addChatMessages(`chat-${name}`));
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteChatMessages(chatId))
    dispatch(deleteChat(chatId))
    navigate('/chats', {replace: true})
}

  return (
    <div>
      <div>
        <List className={classes.list}>
          <ListItem className={classes.listItem} button>
            {chats.map(({ id, name, avatar, handleDelete }) => (
              <ListItem key={id}>
                <Link to={`/chats/${id}`} className={classes.link}>
                  {name}
                </Link>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={avatar} />
                </ListItemAvatar>
                <IconButton
              aria-label="delete"
              className={classes.deleteButton}
              onClick={handleDelete}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
              </ListItem>
            ))}
            
          </ListItem>
        </List>
        <Button onClick={handleOpen}>add new chat</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <TextField value={name} onChange={handleChange} />
            <Button onClick={handleSubmit}>new chat</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Outlet />
    </div>
  );
};
