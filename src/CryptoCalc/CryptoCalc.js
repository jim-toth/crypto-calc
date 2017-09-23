import React from 'react';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './style/CryptoCalc.css';
import GraphicsCardSlider from './components/GraphicsCardSlider/GraphicsCardSlider';

export default class CryptoCalc extends React.Component {
  constructor(props) {
    super(props);

    this.defaults = props.defaults || {
      currency: 'ethereum',
      currencySymbol: 'ETH',
      graphicsCards: 8,
      cardHashrate: 25.0,
      networkDifficulty: 2347166887832420,
      blockReward: 5.0,
      priceUSD: 300
    };

    this.state = {
      currency: this.defaults.currency,
      currencySymbol: this.defaults.currencySymbol,
      graphicsCards: this.defaults.graphicsCards,
      cardHashrate: this.defaults.cardHashrate,
      networkDifficulty: this.defaults.networkDifficulty,
      blockReward: this.defaults.blockReward,
      priceUSD: this.defaults.priceUSD
    };
  }
  componentDidMount() {
    if (this.props.endpoint) {
      // axios.get(this.props.endpoint).then(res => {
      //   if (res.data.data) {
      //     this.setState({
      //       priceUSD:res.data.data.usd,
      //       networkDifficulty:res.data.data.difficulty
      //     });
      //   }
      //   // if (res.data) {
      //   //   for (var i=0; i < res.data.length; i++) {
      //   //     if (res.data[i].id === this.state.currency) {
      //   //       this.setState({priceUSD: parseFloat(res.data[i].price_usd).toFixed(2)});
      //   //       continue;
      //   //     }
      //   //   }
      //   // }
      // });
    }
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
  handlePriceUSDChange = (priceUSD) => {
    this.setState({priceUSD: priceUSD});
  }
  calculateRewards(timeScale) {
    // Hashes per second = MH/s * 1000 * 1000 = H/s
    const hps = this.state.graphicsCards * this.state.cardHashrate * 1000 * 1000;

    // Coins per second = (reward * hashrate) / difficulty
    const cps = (this.state.blockReward * hps) / this.state.networkDifficulty;

    if (timeScale === "hourly") {
      return cps * 3600;
    } else if (timeScale === "daily") {
      return cps * 3600 * 24;
    } else if (timeScale === "weekly") {
      return cps * 3600 * 24 * 7;
    } else if (timeScale === "monthly") {
      return cps * 3600 * 24 * 30;
    } else if (timeScale === "annually") {
      return cps * 3600 * 24 * 365;
    }

    return cps;
  }

  render() {
    const hourly = this.calculateRewards('hourly');
    const hourlyUSD = hourly * this.state.priceUSD;
    const daily = this.calculateRewards('daily');
    const dailyUSD = daily * this.state.priceUSD;
    const weekly = this.calculateRewards('weekly');
    const weeklyUSD = weekly * this.state.priceUSD;
    const monthly = this.calculateRewards('monthly');
    const monthlyUSD = monthly * this.state.priceUSD;
    const annually = this.calculateRewards('annually');
    const annuallyUSD = annually * this.state.priceUSD;

    return (
      <div className="CryptoCalc">
        <GraphicsCardSlider
          graphicsCards={this.state.graphicsCards}
          onGraphicsCardsChange={this.handleGraphicsCardChange} />
        <div className="CryptoCalc-controls pure-g">
          <div className="pure-u-1-2 CryptoCalc-paper left">
            <TextField
              value={this.state.graphicsCards}
              onChange={(e) => this.handleGraphicsCardChange(e.target.value)}
              fullWidth={true}
              floatingLabelText="# Graphics Cards" />
            <TextField
              value={this.state.cardHashrate}
              onChange={(e) => this.handleCardHashrateChange(e.target.value)}
              fullWidth={true}
              floatingLabelText="GPU Hashrate (MH/s)" />
            <TextField
              value={this.state.networkDifficulty}
              onChange={(e) => this.handleNetworkDifficultyChange(e.target.value)}
              fullWidth={true}
              floatingLabelText="Network Difficulty" />
            <TextField
              value={this.state.blockReward}
              onChange={(e) => this.handleBlockRewardChange(e.target.value)}
              fullWidth={true}
              floatingLabelText="Block Reward" />
            <TextField
              value={this.state.priceUSD}
              onChange={(e) => this.handlePriceUSDChange(e.target.value)}
              fullWidth={true}
              floatingLabelText="Price (USD)" />
          </div>
          <div className="pure-u-1-2 CryptoCalc-paper right">
            <div className="CryptoCalc-hashrate">
              <span className="CryptoCalc-hashrate-value">
                {parseFloat(this.state.graphicsCards * this.state.cardHashrate).toFixed(2)}
              </span>
              MH/s
            </div>
            <Table>
              <TableBody>
                <TableRow>
                  <TableRowColumn>Hourly</TableRowColumn>
                  <TableRowColumn className="CryptoCalc-table-number">{hourly.toFixed(4)} {this.state.currencySymbol}</TableRowColumn>
                  <TableRowColumn className="CryptoCalc-table-price">${hourlyUSD.toFixed(2)}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Daily</TableRowColumn>
                  <TableRowColumn className="CryptoCalc-table-number">{daily.toFixed(4)} {this.state.currencySymbol}</TableRowColumn>
                  <TableRowColumn className="CryptoCalc-table-price">${dailyUSD.toFixed(2)}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Weekly</TableRowColumn>
                  <TableRowColumn className="CryptoCalc-table-number">{weekly.toFixed(4)} {this.state.currencySymbol}</TableRowColumn>
                  <TableRowColumn className="CryptoCalc-table-price">${weeklyUSD.toFixed(2)}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Monthly</TableRowColumn>
                  <TableRowColumn className="CryptoCalc-table-number">{monthly.toFixed(4)} {this.state.currencySymbol}</TableRowColumn>
                  <TableRowColumn className="CryptoCalc-table-price">${monthlyUSD.toFixed(2)}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Annually</TableRowColumn>
                  <TableRowColumn className="CryptoCalc-table-number">{annually.toFixed(4)} {this.state.currencySymbol}</TableRowColumn>
                  <TableRowColumn className="CryptoCalc-table-price">${annuallyUSD.toFixed(2)}</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}