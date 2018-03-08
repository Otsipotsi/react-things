import React from 'react';
import { IndexLink, Link } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './PageLayout.scss';

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
      <a className="navbar-brand" href="#">React stuff</a>
      <div className="collapse navbar-collapse justify-content-center">
        <ul className="navbar-nav ">
          <li className="nav-item">
            <IndexLink to='/' className="nav-link" activeClassName='active'>Home</IndexLink>
          </li>
          { children.props.routes[0].childRoutes.map(route => {
            return (
            <li key={route.label} className="nav-item">
              <Link to={route.path} className="nav-link" activeClassName='active'>{route.label}</Link>
            </li>
          )}) }
        </ul>
      </div>
    </nav>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
