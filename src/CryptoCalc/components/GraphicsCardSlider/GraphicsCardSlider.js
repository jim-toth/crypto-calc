import React from 'react';
import './GraphicsCardSlider.css';

export default class GraphicsCardSlider extends React.Component {
  constructor(props) {
    super(props);

    this.num_rigs = parseInt(this.props.rigs, 10);
    if (isNaN(this.num_rigs)) {
      this.num_rigs = 4;
    } else if (this.num_rigs < 1) {
      this.num_rigs = 1;
    }
    this.display_rigs = [];
    for (let i=1; i <= this.num_rigs; i++) {
      this.display_rigs.push(i);
    }

    this.cards_per_rig = parseInt(this.props.cards_per_rig, 10);
    if (isNaN(this.cards_per_rig)) {
      this.cards_per_rig = 6;
    } else if (this.cards_per_rig < 1) {
      this.cards_per_rig = 1;
    }
    this.display_cards = [];
    for (let i=1; i <= this.cards_per_rig; i++) {
      this.display_cards.push(i);
    }

    this.handleMouseEnterCard = this.handleMouseEnterCard.bind(this);
    this.handleClickCard = this.handleClickCard.bind(this);
    this.handleMouseEnterSlider = this.handleMouseEnterSlider.bind(this);
    this.handleMouseLeaveSlider = this.handleMouseLeaveSlider.bind(this);

    this.state = {
      hoverGraphicsCards: 0,
      mouseInside: false
    };
  }

  handleMouseEnterCard(i, j) {
    return new Promise(resolve => {
      this.setState({hoverGraphicsCards: i*this.cards_per_rig+j+1}, () => {
        resolve();
      });
    });
  }

  handleClickCard(i, j) {
    this.props.onGraphicsCardsChange(i*this.cards_per_rig+j+1);
  }

  handleMouseEnterSlider() {
    return new Promise(resolve => {
      this.setState({mouseInside: true}, () => {
        resolve();
      });  
    });
  }

  handleMouseLeaveSlider() {
    return new Promise(resolve => {
      this.setState({
        hoverGraphicsCards: 0,
        mouseInside: false
      }, () => {
        resolve();
      });
    });
  }

  render() {
    const mouseInside = this.state.mouseInside;
    var graphicsCards;
    if (mouseInside && this.state.hoverGraphicsCards === 0) {
      graphicsCards = this.props.graphicsCards;
    } else if (mouseInside) {
      graphicsCards = this.state.hoverGraphicsCards;
    } else {
      graphicsCards = this.props.graphicsCards;
    }
    const totalRigs = Math.floor(graphicsCards / this.cards_per_rig);
    const cardsPerRig = this.cards_per_rig;

    return (
      <div className="GraphicsCardSlider"
        onMouseEnter={(e) => {return this.handleMouseEnterSlider()}}
        onMouseLeave={(e) => {return this.handleMouseLeaveSlider()}}>
        {this.display_rigs.map((_, i) =>
          <div key={i}
            className={
              "GraphicsCardSlider-rig"
              + (i < totalRigs ? " selected" : "")
            }>
            {this.display_cards.map((_, j) =>
              <div key={j}
                className={
                  "GraphicsCardSlider-card"
                  + (i*cardsPerRig+j < graphicsCards ? " selected" : "")
                }
                onMouseEnter={(e) => {return this.handleMouseEnterCard(i,j)}}
                onClick={(e) => this.handleClickCard(i,j)}>
                <div className={
                  "GraphicsCardSlider-tooltip"
                  + (mouseInside && i*cardsPerRig+j === this.state.hoverGraphicsCards-1 ? " show":"")
                  }>
                  {i*cardsPerRig+j+1}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
