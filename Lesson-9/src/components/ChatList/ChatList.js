import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";

import { Form } from "../FormItem/index";
import "./style.scss";

import { selectChats } from "../../store/selectors/chats";
import { addChat, deleteChat } from "../../store/actionCreators/chats";

export const ChatList = () => {
  const chats = useSelector(selectChats);
  const dispatch = useDispatch();

  // Добавляем новый чат в стор.
  const handleAddChat = (newChatName) => {
    const newId = `chat${Date.now()}`;
    dispatch(addChat(newId, newChatName));
  };

  // Удаляем чат из стора.
  const handleDeleteChat = (id) => {
    dispatch(deleteChat(id));
  };

  return (
    <>
      <div>
        <List className="list">
          <ListItem className="listItem">
            {chats.map((chat) => (
              <ListItem key={chat.id}>
                <Link to={`/chats/${chat.id}`} className="link">
                  {chat.name}
                </Link>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={chat.avatar} />
                </ListItemAvatar>
                <IconButton
                  onClick={() => handleDeleteChat(chat.id)}
                  aria-label="delete"
                  className="deleteButton"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItem>
            ))}
          </ListItem>
        </List>
        <Form onSubmit={handleAddChat} />
      </div>
      <Outlet />
    </>
  );
};
