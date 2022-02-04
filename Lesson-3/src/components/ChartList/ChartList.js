import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import "../ChartList/style.scss";

const ChartList = ({chats}) => {
    return(
    <div className="users-list">
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {chats.map((chat) => {
          return (
            <ListItem key={chat.id} alignItems="flex-start">
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar src={chat.img}/>
                </ListItemAvatar>
                <ListItemText  primary={chat.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
    )
}

export default ChartList;


