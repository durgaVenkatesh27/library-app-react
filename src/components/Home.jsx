import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import User from './User';
import Book from './Book';
import Maintain from './Maintain';
import * as api from '../commons/Api';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const Home = props => {
  const { userInfo, bookInfo, updateUserInfo, updateBookInfo } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateUserData = () => {
    api.getUserData("http://localhost:9090/user/viewUsers", updateUserInfo);
  }


  const updateBookData = () => {
    api.getUserData("http://localhost:9090/library/viewBooks", updateBookInfo);
  }


  useEffect(() => {
    console.log('entered');
    updateUserData();
    updateBookData();
  }, []);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="home-page">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="User" {...a11yProps(0)} />
            <Tab label="Book" {...a11yProps(1)} />
            <Tab label="Maintain" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <User
              updateUserData={updateUserData}
              userInfo={userInfo} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Book
              updateBookData={updateBookData}
              bookInfo={bookInfo} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Maintain
              userInfo={userInfo}
              bookInfo={bookInfo}
              updateUserData={updateUserData}
              updateBookData={updateBookData}
            />
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}

Home.propTypes = {
  updateUserInfo: PropTypes.func.isRequired,
  updateBookInfo: PropTypes.func.isRequired,
};

Home.defaultProps = {

};

export default Home;
