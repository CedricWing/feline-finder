import React from 'react';
import runningCat from '../../assets/images/running-cat.gif';
// Our favourite loading cat spinner
export default () => (
  <div className="loader">
    <img src={runningCat}></img>
    Loading...
  </div>
);
