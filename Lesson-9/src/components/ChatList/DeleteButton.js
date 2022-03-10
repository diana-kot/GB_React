import { remove} from "@firebase/database";
import { getChatsRefById } from "../../services/firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@mui/material/IconButton";
import { getMessagesRefByChatId } from '../../services/firebase';
import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const DeleteButton =  ({ id }) => {
  const dispatch = useDispatch();
  const handleDeleteChat = useCallback (() => {
    remove(getChatsRefById(id));
    remove(getMessagesRefByChatId(id))
  }, [dispatch]);

  return (
    <div>
      <IconButton
        onClick={handleDeleteChat}
        aria-label="delete"
        className="deleteButton"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};
