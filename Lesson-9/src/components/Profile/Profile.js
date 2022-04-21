import React, { useState, useCallback, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import {
  logout,
  getProfileNameRef,
  profileRef,
  auth,
} from "../../services/firebase";
import { get } from "firebase/database";
import { changeNameWithThunk } from "../../store/profile/action";
import { profileSelector } from "../../store/profile/profile";
import "./Profile.scss";
import { onValue, set } from "firebase/database";
import { userNameSelector } from "../../store/profile/profile";

function Profile() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [valueName, setvalueName] = useState();
  const { age } = useSelector(profileSelector);

  const handleChangeName = () => {
    setvalueName("");
    setName(valueName);
    dispatch(changeNameWithThunk(valueName));
  };

  const handleChange = (e) => {
    setvalueName(e.target.value);
  };

  useEffect(() => {
    get(getProfileNameRef(auth.currentUser.uid)).then((snapshot) => {
      setName(snapshot.val());
    });
  }, []);



  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h2>Profile</h2>
        <Avatar sizes="large" src="/broken-image.jpg" />

        <div className="profile-age name">
          <div variant="span" style={{ fontWeight: 700 }}>
            Name:{" "}
          </div>
          <div>{name}</div>
        </div>
        <div className="profile-age">
          <div variant="span" style={{ fontWeight: 700 }}>
            Age:{" "}
          </div>
          <div variant="span">{age}</div>
        </div>
        <TextField
          onChange={handleChange}
          value={valueName}
          type="text"
          id="filled-basic"
          label="Введите новое имя"
          variant="filled"
        />
        <br />

        <Button variant="contained" type="submit" onClick={handleChangeName}>
          Rename
        </Button>
        <br />
        <br />

        <Button onClick={handleLogout} variant="outlined">
          LOGOUT
        </Button>
      </div>
    </div>
  );
}

export default Profile;
