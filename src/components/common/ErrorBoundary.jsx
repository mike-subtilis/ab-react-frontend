/* eslint-disable class-methods-use-this */
import PropTypes from 'prop-types';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() { // also passed: error
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info); // eslint-disable-line no-console
  }

  render() {
    if (this.state.hasError) {
      return <div>
        <h1>
          Sorry, Something went wrong...
        </h1>
      </div>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = { children: PropTypes.any };
export default ErrorBoundary;
