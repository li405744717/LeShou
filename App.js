import React from 'react';

//redux
import configureStore from './src/store';
import {
  Provider
} from 'react-redux';

import {
  RootStack
} from './src/router';
export default class App extends React.Component {
  static app;
  constructor() {
    super();
    console.log("init app");
    App.app = this;
    console.log(App.app);
  }
  render() {
    return <Provider store = {
        configureStore
      } >
      <
      RootStack / >
      <
      /Provider> ;
  }
}