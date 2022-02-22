import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
// import s from "./Chat.module.css";
import {Form} from "../Form/index";
import Message from "../Message/index";
import {useDispatch, useSelector} from "react-redux";
import {messagesSelector} from "../../store/selectors/messages";
import {addMessage, deleteChatMessages} from "../../store/actionCreators/messages";
import {deleteChat} from "../../store/actionCreators/chats";
import Button from "@material-ui/core/Button/Button";

export const Chat = () => {
    const dispatch = useDispatch()
    const {chatId} = useParams()
    const navigate = useNavigate()

    const messageList = useSelector(messagesSelector)

    useEffect(() => {
        let timeout
        if(messageList[chatId][messageList[chatId]?.length -1]?.author === 'me') {
            timeout = setTimeout(() => {
                dispatch(addMessage(chatId,
                    {text: `Your message is: ${messageList[chatId][messageList[chatId].length-1].text}`, author: 'robot', id: `msg-${Date.now()}`}))
            }, 1500)
        }

        return () => clearTimeout(timeout)
    }, [messageList])

    const handleSubmit = (messageText) => {
        dispatch(addMessage(chatId, {text: messageText, author: 'me', id: `msg-${Date.now()}`}))
    }

    if (!messageList[chatId]) {
        return navigate('../chats', {replace: true})
    }

    const handleDelete = () => {
        dispatch(deleteChatMessages(chatId))
        dispatch(deleteChat(chatId))
        navigate('/chats', {replace: true})
    }

    return (
        <div>
            <Button aria-label="delete" onClick={handleDelete}>
                delete chat
            </Button>
            {
                messageList[chatId]?.map((message) =>
                    <Message text={message.text} author={message.author} key={message.id}/>)
            }
            <Form onSubmit={handleSubmit}/>
        </div>
    )
}
