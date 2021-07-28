import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Modal from 'views/utils/modal';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import routes from "routes.js";
import Loader from "views/utils/loader";

import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ProfilePage from "views/profile";

var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: "blue",
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
    }
  }

  handleColorClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <Navbar {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
            <Route
              path="/profile"
              component={ProfilePage}
            />
            <Redirect from="/" to="/dashboard" />
          </Switch>
          <Modal />
          <Footer fluid />
          <NotificationContainer />
          <Loader active={this.props.state.loading} />
        </div>
      </div>
    );
  }
}

Dashboard.propsTypes = {
  state: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  state: state.default
})

const mappedDashboard = connect(mapStateToProps, null)(Dashboard)

export default mappedDashboard;
