import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import './style/CryptoCalc.css';
import { GraphicsCardSlider } from './components/GraphicsCardSlider/GraphicsCardSlider';

export class CryptoCalc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphicsCards: 8,
      cardHashrate: 25.0,
      networkDifficulty: 2347166887832420,
      blockReward: 5.0
    };
  }

  handleGraphicsCardChange = (graphicsCards) => {
    this.setState({graphicsCards: graphicsCards});
  }
  handleNetworkDifficultyChange = (networkDifficulty) => {
    this.setState({networkDifficulty: networkDifficulty});
  }
  handleCardHashrateChange = (cardHashrate) => {
    this.setState({cardHashrate: cardHashrate});
  }
  handleBlockRewardChange = (blockReward) => {
    this.setState({blockReward: blockReward});
  }

  render() {
    return (
      <div className="CryptoCalc">
        <GraphicsCardSlider
          graphicsCards={this.state.graphicsCards}
          onGraphicsCardChange={this.handleGraphicsCardChange} />
        <Paper zDepth={2}>
          <div className="CryptoCalc-controls-wrapper">
            <div className="pure-g">
              <div className="pure-u-1-2">
                <div className="CryptoCalc-control">
                  <TextField
                    value={this.state.graphicsCards}
                    onChange={(e) => this.handleGraphicsCardChange(e.target.value)}
                    fullWidth={true}
                    floatingLabelText="# Graphics Cards" />
                </div>
              </div>
              <div className="pure-u-1-2">
                <div className="CryptoCalc-control">
                  <TextField
                    value={this.state.cardHashrate}
                    onChange={(e) => this.handleCardHashrateChange(e.target.value)}
                    fullWidth={true}
                    floatingLabelText="GPU Hashrate (MH/s)" />
                </div>
              </div>
            </div>
            <div className="pure-g">
              <div className="pure-u-1-2">
                <div className="CryptoCalc-control">
                  <TextField
                    value={this.state.networkDifficulty}
                    onChange={(e) => this.handleNetworkDifficultyChange(e.target.value)}
                    fullWidth={true}
                    floatingLabelText="Network Difficulty" />
                </div>
              </div>
              <div className="pure-u-1-2">
                <div className="CryptoCalc-control">
                  <TextField
                    value={this.state.blockReward}
                    onChange={(e) => this.handleBlockRewardChange(e.target.value)}
                    fullWidth={true}
                    floatingLabelText="Block Reward" />
                </div>
              </div>
            </div>
            <div className="pure-g">
              <div className="pure-u-1-2">
                <h1>
                  { parseFloat(this.state.graphicsCards * this.state.cardHashrate).toFixed(2) } MH/s
                </h1>
                <h4>Total Hashrate</h4>
              </div>
              <div className="pure-u-1-2">

              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}