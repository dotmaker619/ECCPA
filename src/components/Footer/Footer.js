
import React from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import grayLogo from "logo-gray.png"
class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <nav>
            <ul>
              <li>
                <a href="/">
                  <img src={grayLogo} alt="logo" width="100px" />
                </a>
              </li>
              <li>
                <a
                  href="#Terms"
                >
                  Terms
                </a>
              </li>
              |
              <li>
                <a
                  href="#Policy"
                >
                  Privacy Policy
                </a>
              </li>
              |
              <li>
                <a
                  href="#Site-map"
                >
                  Site Map
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright">
            Copyright
            &copy; Eric Coleman. All rights reserved.
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
