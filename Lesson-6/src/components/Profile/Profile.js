import React from 'react';
import { connect } from 'react-redux';

// Material UI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

// Action Creator 
import toggleOnlineAction from '../../store/actionCreators/toggle_online_action'

// Selectors 
import { getProfile } from '../../store/selectors/getProfile'

const Profile = ({profile, toggleAction}) => {

  const toggleCheckbox = () => {
    let copyObj = Object.assign({}, profile);
    copyObj.online = !profile.online
    toggleAction(copyObj)
  }

  return (
    <Container maxWidth="sm">
      <Typography component="h1" variant="h3">Profile</Typography>
      <Typography variant="body1">{profile.name}</Typography>
      <Typography variant="body1">{profile.age}</Typography>
      <Typography variant="body1">{profile.online ? 'Online' : 'Offline'}</Typography>
      <Checkbox
        onClick={() => toggleCheckbox()}
        checked={profile.online}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </Container>
  );
}

const mapStateToProps = (store) => {
  return {
    profile: getProfile(store)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAction: (payload) => dispatch(toggleOnlineAction(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
