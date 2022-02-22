import React, {useEffect, useState} from "react";

import List from "@material-ui/core/List/List";
import {Link, Outlet } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem/ListItem";
import {useDispatch, useSelector} from "react-redux";
import {addChat, deleteChat} from "../../store/actionCreators/chats";
import {chatsSelector} from "../../store/selectors/chats";
import Button from "@material-ui/core/Button/Button";
import {Dialog, DialogContent, Modal, TextField} from "@material-ui/core";
import {addChatMessages} from "../../store/actionCreators/messages";

export const ChatList = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')

    const chats = useSelector(chatsSelector)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addChat(`chat-${name}`, name))
        dispatch(addChatMessages(`chat-${name}`))
        setOpen(false)
    }

    return (
        <div>
            <div>
                <List>
                    {
                        chats.map((chat) =>
                            <ListItem key={chat.id}>
                                <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
                            </ListItem>)
                    }
                </List>
                <Button onClick={handleOpen}>add chat</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogContent>
                        <TextField value={name} onChange={handleChange}/>
                        <Button onClick={handleSubmit}>add chat</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <Outlet/>
        </div>
    );
}
