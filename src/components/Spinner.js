import React, { Component } from 'react';

export default class Spinner extends Component {
  render() {
    return (
      <div className=" mt-4 d-flex justify-content-center">
        <div>
          <div
            className="spinner-border text-info "
            style={{ marginTop: '4rem', marginLeft: '1rem' }}
            role="status"
          ></div>
          <div className="mt-2">
            <b>Loading...</b>
          </div>
        </div>
      </div>
    );
  }
}
