import React from 'react';
import './GraphicsCardSlider.css';

export class GraphicsCardSlider extends React.Component {
  constructor(props) {
    super(props);

    this.cards_per_rig = 6;
    this.display_rigs = [1,2,3,4];
    this.display_cards = [1,2,3,4,5,6];

    this.state = {
      hoverGraphicsCards: 0,
      mouseInside: false
    };
  }

  handleMouseEnterCard = (i, j) => {
    this.setState({hoverGraphicsCards: i*this.cards_per_rig+j+1});
  }

  handleClickCard = (i, j) => {
    this.props.onGraphicsCardChange(i*this.cards_per_rig+j+1);
  }

  handleMouseEnterSlider = () => {
    this.setState({mouseInside: true});
  }

  handleMouseLeaveSlider = () => {
    this.setState({
      hoverGraphicsCards: 0,
      mouseInside: false
    });
  }

  render() {
    const mouseInside = this.state.mouseInside;
    const graphicsCards = this.props.graphicsCards;
    const hoverGraphicsCards = this.state.hoverGraphicsCards;
    const totalRigs = Math.floor(graphicsCards / this.cards_per_rig);
    const totalHoverRigs = Math.floor(hoverGraphicsCards / this.cards_per_rig);

    return (
      <div className="GraphicsCardSlider"
        onMouseEnter={this.handleMouseEnterSlider}
        onMouseLeave={this.handleMouseLeaveSlider}>
        {this.display_rigs.map((_, i) =>
          <div key={i}
            className={
              "GraphicsCardSlider-rig"
              + (i < totalHoverRigs ? " GraphicsCardSlider-rig-hover":"")
              + (!mouseInside && i < totalRigs ? " GraphicsCardSlider-rig-selected":"")
            }>
            {this.display_cards.map((_, j) =>
              <div key={j}
                className={
                  "GraphicsCardSlider-card"
                  + (i*this.cards_per_rig+j < hoverGraphicsCards ? " GraphicsCardSlider-card-hover":"")
                  + (!mouseInside && i*this.cards_per_rig+j < graphicsCards ? " GraphicsCardSlider-card-selected":"")
                }
                onMouseEnter={(e) => this.handleMouseEnterCard(i,j)}
                onClick={(e) => this.handleClickCard(i,j)}>
                <div className={
                  "GraphicsCardSlider-card-tooltip"
                  + (i*this.cards_per_rig+j === hoverGraphicsCards-1 ? " show":"")
                  + ((j+1)%this.cards_per_rig === 0 ? " full":"")
                  }>
                  {i*this.cards_per_rig+j+1}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
