/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/react-in-jsx-scope */
import React, {
  FC, ReactNode, useEffect, useState, useContext,
} from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  useTheme,
} from '@material-ui/core';
import {
  Redirect,
  useLocation,
} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { auth } from '../../firebaseSetup';
import { AuthContext } from '../context/AuthContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& .MuiAppBar-colorPrimary': {
      color: '#000',
      backgroundColor: '#ffffff',

    },
    '& .MuiToolbar-gutters': {
      paddingRight: '16px',
      paddingLeft: '16px',
    },
    '& .MuiListItemIcon-root': {
      minWidth: '40px',
    },
  },
  logoImg: {
    marginLeft: '8px',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  // menuButton: {
  //   marginRight: [20, '!important'],
  // },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(5) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    color: '#ffffff',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    paddingBottom: '50px',
  },
  listClass: {
    paddingLeft: '0px',
  },
  sideBarIcon: {
    color: '#ffffff',
    width: '20px',
  },
  sideBarIcon1: {
    color: '#ffffff',
    width: '22px',
  },
  subMenu: {
    fontSize: '12px;',
    paddingLeft: '40px',
    // color: '#ffffff'
  },
  paper: {
    background: '#24384C',
    color: '#ffffff',
  },
  listActive: {
    // background: '#3F51B5 !important',
  },
  footer: {
    position: 'fixed',
    borderTop: '1px solid black',
    bottom: '0px',
    zIndex: theme.zIndex.drawer + 1,
    width: '100%',
    marginLeft: theme.spacing(7) + 1,
    paddingLeft: '8px',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#fafafa',
  },
  footerShift: {
    position: 'fixed',
    borderTop: '1px solid black',
    bottom: '0px',
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '20px',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  pfmenu: {
    fontSize: '14px',
  },

}));

// define interface to represent component props
interface LayoutProps {
  children: ReactNode;
}

// functional component
const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [catalogSubMenuOpen, setCatalogSubMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const [path, setPath] = useState('');

  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
    console.log(location.pathname);
  }, [location, setPath]);

  const activetRoute = (route: string) =>
  // console.log(route, path);
    route === path;
  // return false

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setSubMenuOpen(false);
    setCatalogSubMenuOpen(false);
  };

  const handleSubMenu = () => {
    setOpen(true);
    setSubMenuOpen(!subMenuOpen);
  };

  const handleCatalogSubMenu = () => {
    setOpen(true);
    setCatalogSubMenuOpen(!catalogSubMenuOpen);
  };

  // code for profile icon
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    await auth.signOut();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      id={menuId}
      getContentAnchorEl={null}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem>
        <ListItemIcon>
          <PersonOutlineIcon fontSize="large" />
        </ListItemIcon>
        <Typography className={classes.pfmenu} variant="inherit">
          user
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem className={classes.pfmenu} onClick={() => signOut()}>Log Out</MenuItem>
    </Menu>
  );
    // code for profile icon end

  const user = useContext(AuthContext);
  console.log(user);
  if (!user) {
    return <Redirect to="/" />;
  }
  console.log(user);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            BlueYonder
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <PersonOutlineIcon fontSize="large" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div className={classes.logoImg}><img src="/logo.png" alt="logo" className={classes.sideBarIcon} /></div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon className={classes.sideBarIcon} />}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.listClass}>

          <ListItem button key="Dashboard" component="a" href="/" selected={activetRoute('/')} classes={{ selected: classes.listActive }}>
            <ListItemIcon>
              {/* <Dashboard className={classes.sideBarIcon} />  */}
              <img src="/dashboard.png" width="20" alt="dashboard" className={classes.sideBarIcon} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={handleCatalogSubMenu}>
            <ListItemIcon>
              <MenuBookOutlinedIcon className={classes.sideBarIcon} />
              {/* <img src="/setting.png" width='20' alt="setting" className={classes.sideBarIcon} /> */}
            </ListItemIcon>
            <ListItemText primary={(
              <Typography>
                Catalog
              </Typography>
          )}
            />
            {catalogSubMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={catalogSubMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button key="Brand" component="a" className={clsx({ selected: classes.listActive })} href="/#/brands" selected={activetRoute('/#/brand')}>

                <ListItemText primary={(
                  <Typography className={classes.subMenu}>
                    Brand
                  </Typography>
              )}
                />
              </ListItem>

              <ListItem button key="Category" component="a" className={clsx({ selected: classes.listActive })} href="/#/collections" selected={activetRoute('/collections')}>
                {/* <ListItemIcon>
              </ListItemIcon> */}
                <ListItemText primary={(
                  <Typography className={classes.subMenu}>
                    Category
                  </Typography>
              )}
                />
              </ListItem>

              <ListItem button key="Products" component="a" href="/#/products" className={clsx({ selected: classes.listActive })}>
                <ListItemText primary={(
                  <Typography className={classes.subMenu}>
                    Products
                  </Typography>
              )}
                />
              </ListItem>

              <ListItem button key="Orders" component="a" className={clsx({ selected: classes.listActive })} href="/orders" selected={activetRoute('/orders')}>
                {/* <ListItemIcon>
                </ListItemIcon> */}
                <ListItemText primary={(
                  <Typography className={classes.subMenu}>
                    Orders
                  </Typography>
              )}
                />
              </ListItem>
            </List>
          </Collapse>

        </List>
        <Divider />
        <List className={classes.listClass}>
          <ListItem button onClick={handleSubMenu}>
            <ListItemIcon>
              {/* <Settings className={classes.sideBarIcon} />   */}
              <img src="/setting.png" width="20" alt="setting" className={classes.sideBarIcon} />
            </ListItemIcon>
            <ListItemText primary={(
              <Typography>
                Settings
              </Typography>
          )}
            />
            {subMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button key="general" component="a" className={clsx({ selected: classes.listActive })} href="/setting/general" selected={activetRoute('/setting/general')}>
                <ListItemText primary={(
                  <Typography className={classes.subMenu}>
                    General
                  </Typography>
              )}
                />
              </ListItem>
              <ListItem button key="countries" component="a" className={clsx({ selected: classes.listActive })} href="/#/countries" selected={activetRoute('/countries')}>
                <ListItemText primary={(
                  <Typography className={classes.subMenu}>
                    Countries
                  </Typography>
              )}
                />
              </ListItem>
              <ListItem button key="taxes" component="a" className={clsx({ selected: classes.listActive })} href="/#/taxes" selected={activetRoute('/taxes')}>
                <ListItemText primary={(
                  <Typography className={classes.subMenu}>
                    Taxes
                  </Typography>
              )}
                />
              </ListItem>

              <ListItem button key="productType" component="a" className={clsx({ selected: classes.listActive })} href="/#/product-types" selected={activetRoute('/product-types')}>
                <ListItemText primary={(
                  <Typography className={classes.subMenu}>
                    Product Type
                  </Typography>
              )}
                />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button key="Profile">
            <ListItemIcon className={classes.sideBarIcon}>
              <AccountCircleOutlinedIcon className={clsx(classes.sideBarIcon1)} />
              {/* <img src="/setting.png"  width='20' alt="setting" className={classes.sideBarIcon} /> */}
            </ListItemIcon>
            <ListItemText primary={(
              <Typography>
                Profile
              </Typography>
          )}
            />
          </ListItem>

          <ListItem button key="Customer" component="a" href="/#/customers" selected={activetRoute('/')} classes={{ selected: classes.listActive }}>
            <ListItemIcon>
              <GroupAddIcon className={classes.sideBarIcon1} />
              {/* <img src="/dashboard.png" width='20' alt="dashboard" className={classes.sideBarIcon} /> */}
            </ListItemIcon>
            <ListItemText primary="Customer" />
          </ListItem>

        </List>

      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      <div
        className={clsx(classes.footer, {
          [classes.footerShift]: open,
        })}
      >
        <p> Footer   </p>
      </div>
    </div>
  );
};

export default Layout;
