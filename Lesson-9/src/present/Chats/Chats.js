import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List/List";
import { Link, Outlet } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Button from "@material-ui/core/Button/Button";
import { Dialog, DialogContent, Modal, TextField } from "@material-ui/core";
import "./style.scss";



export const Chats = ({chats, open, handleDelete, name, handleOpen, handleClose, handleSubmit, handleChange }) => (
  <div>
    <div>
      <List className="list">
        <ListItem className="listItem" button>
          {chats.map((chat) => (
            <ListItem key={chat.id} chat={chat}>
              <Link to={`/chats/${chat.id}`}  className="link">
                {chat.name}
              </Link>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={chat.avatar} />
              </ListItemAvatar>
              <IconButton
                onClick={handleDelete}
                aria-label="delete"
                className="deleteButton"
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
