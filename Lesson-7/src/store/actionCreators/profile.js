export const CHANGE_USER_NAME = "PROFILE::CHANGE_USER_NAME"

export const changeUserName = (payload) => ({
  type: CHANGE_USER_NAME,
  payload,   
})