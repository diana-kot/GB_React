import { remove} from "@firebase/database";
import { getChatsRefById } from "../../services/firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@mui/material/IconButton";

export const DeleteButton = ({ id }) => {

  const handleDeleteChat = () => {
    remove(getChatsRefById(id));
  };

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
