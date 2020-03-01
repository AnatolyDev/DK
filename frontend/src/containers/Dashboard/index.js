import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Settings from './Settings';
import Tickets from './Tickets';

const Dashboard = (props) => {

    const [tabNum, setTabNum] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabNum(newValue);
      };

    return (
        <div>
            {!props.user && <Redirect to='/signin' />}
            <Paper >
                <Tabs
                    value={tabNum}
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    centered
                >
                    <Tab label='Личные данные' />
                    <Tab label='Билеты' />
                </Tabs>
            </Paper>

            {tabNum == 0 &&
                <Settings />
            }

            {tabNum == 1 &&
                <Tickets />
            }

        </div>
    )
}

const mapStateToProps = state => ({
    user  : state.auth.user
})

export default connect(mapStateToProps)(Dashboard);