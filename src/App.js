import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'purecss/build/base.css';
import 'purecss/build/grids.css';
import 'purecss/build/pure.css';
import './App.css';

import { CryptoCalc } from './CryptoCalc/CryptoCalc';

class App extends Component {
  render() {
    darkBaseTheme.fontFamily = 'Michroma, Roboto, sans-serif';
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">
          <div className="App-header">
            <h2>CryptoCalc</h2>
            <p className="App-intro">
              A CryptoCurrency Mining Calculator
            </p>
          </div>
          <CryptoCalc />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
