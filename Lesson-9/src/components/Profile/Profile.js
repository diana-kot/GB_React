import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";



import { changeUserName } from "../../store/actionCreators/profile";
import { profileSelector } from "../../store/selectors/profile";
import "./Profile.scss"

function Profile() {
  const dispatch = useDispatch();

  const { userName, age } = useSelector(profileSelector);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const setUserName = useCallback(() => {
    dispatch(changeUserName(value));
  }, [dispatch, value]);

  return (
    <div className="profile-page">
    <div className="profile-info">
        <h2>Profile</h2>
        <Avatar sizes="large" src="/broken-image.jpg" />
        <div className="profile-age name">
        <div variant="span" style={{ fontWeight: 700 }}>Name: </div>
        <div>{ userName }</div>
        </div>
        <div className="profile-age">
        <div variant="span" style={{ fontWeight: 700 }}>Age: </div>
        <div variant="span">{age}</div>
        </div>
       
        <div className="acount-rename">
            <input value={value} onChange={handleChange} type="text" />
            <button className="rename-btn" onClick={setUserName}>Rename</button>
        </div>
    </div>
</div>
  );
}

export default Profile;
