import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { NavLink } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';

import { connect } from 'react-redux';

const Header = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const open = Boolean(anchorEl);

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setOpenDrawer(open);
      };

    const sideList = (userName) => (
      <div
        className='menu-list'
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>

            {userName &&
                <NavLink to='/dashboard' style={{textDecoration: 'none'}}>
                    <ListItem button onClick={toggleDrawer(false)} style={{ backgroundColor: 'cornsilk' }} >
                        <ListItemText primary={userName} style={{ color: 'blue' }}/>
                    </ListItem>              
              </NavLink>
            }

            {!userName &&
                <NavLink to='/signin' style={{textDecoration: 'none', color: grey}}>
                    <ListItem button onClick={toggleDrawer(false)}>
                        <ListItemText primary='Войти' style={{color: 'black'}}/>
                    </ListItem>              
              </NavLink>
            }

            <Divider />

          <NavLink to='/' style={{textDecoration: 'none', color: grey}}>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText primary='Главная' style={{color: 'black'}}/>
            </ListItem>              
          </NavLink>

          <NavLink to='/catalog' style={{textDecoration: 'none', color: grey}}>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText primary='Каталог' style={{color: 'black'}}/>
            </ListItem>              
          </NavLink>

          <Divider />

          {props.user &&
            <NavLink to='/zayavki' style={{textDecoration: 'none', color: grey}}>
                <ListItem button onClick={toggleDrawer(false)}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <ListItemText primary='Заявки' style={{color: 'black'}}/>
                </ListItem>              
            </NavLink>
          }

        </List>

        
      </div>
    );
  
    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div className='header-main'>
            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                {sideList(props.user)}
            </Drawer>
            <AppBar position="static">
                <Toolbar className='header-toolbar'>
                    <IconButton edge="start" className='menu-button' color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className='header-title'>
                        Заголовок
                    </Typography>
                    <NavLink to='/signup' style={{textDecoration: 'none', color: grey}}>
                      <Button>
                        Регистрация
                      </Button>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = state => ({
  user : state.auth.user
})

export default connect(mapStateToProps)(Header);