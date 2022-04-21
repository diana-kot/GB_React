import { getProfileNameRef } from "../../services/firebase";
import { set } from "firebase/database";
import { auth } from "./../../services/firebase";

export const CHANGE_NAME = "PROFILE::CHANGE_NAME";

export const changeName = (nameNew) => ({
  type: CHANGE_NAME,
  payload: {
    nameNew,
  },
});

export const changeNameWithThunk = (nameNew) => {
  return (dispatch, getState) => {
    set(getProfileNameRef(auth.currentUser.uid), nameNew);
    dispatch(changeName(nameNew));
  };
};
