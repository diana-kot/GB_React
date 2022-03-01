import React, { useState, useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { FormName } from "../FormName/index";
import { logout, getProfileNameRef, auth } from "../../services/firebase";

import { changeName } from "../../store/actionCreators/profile";
import { profileSelector } from "../../store/selectors/profile";
import "./Profile.scss";
import { onValue, set } from "firebase/database";

function Profile() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const { age } = useSelector(profileSelector);

  const handleChangeName = (text) => {
    // dispatch(changeName(text));
    set(getProfileNameRef(auth.currentUser.uid), text);
  };

  // useEffect(() => {
  //   onValue(profileRef, (snapshot) => {
  //     setName(snapshot.val());
  //   });
  // }, []);

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

        <FormName onSubmit={handleChangeName} />
        <div>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
