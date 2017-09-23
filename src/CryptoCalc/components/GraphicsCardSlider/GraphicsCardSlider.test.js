import React from 'react';
import { shallow, mount } from 'enzyme';
import GraphicsCardSlider from './GraphicsCardSlider';

const NUM_RIGS = 4;
const CARDS_PER_RIG = 6;
const TEST_VALUES = [-1,0,1,2,6,8,12,15,18,24,25];
const HOVER_TEST_VALUES = [1,2,6,8,12,15,18,24];
const CUSTOM_INPUT = [-1,0,1,3,15,"","foo",{},{foo:1},null,NaN];
const MAX_CARDS = NUM_RIGS * CARDS_PER_RIG;

describe('GraphicsCardSlider', () => {
  it('creates DOM successfully (default props)', () => {
    const slider = shallow(<GraphicsCardSlider />);
    const rigs = slider.find('div.GraphicsCardSlider-rig');
    expect(rigs).toHaveLength(NUM_RIGS);
    rigs.forEach(rig => {
      expect(rig.find('div.GraphicsCardSlider-card'))
        .toHaveLength(CARDS_PER_RIG);
      expect(rig.find('div.GraphicsCardSlider-tooltip'))
        .toHaveLength(CARDS_PER_RIG);
    });
  });

  it('creates DOM successfully (custom props)', () => {
    for (let i=0; i < CUSTOM_INPUT.length; i++) {
      for (let j=0; j < CUSTOM_INPUT.length; j++) {
        const slider = shallow(
          <GraphicsCardSlider
            rigs={CUSTOM_INPUT[i]}
            cards_per_rig={CUSTOM_INPUT[j]} />
        );
        const rigs = slider.find('div.GraphicsCardSlider-rig');
        let expectedRigs = parseInt(CUSTOM_INPUT[i]);
        let expectedCards = parseInt(CUSTOM_INPUT[j]);
        if (isNaN(expectedRigs)) {
          expectedRigs = NUM_RIGS;
        } else if (expectedRigs < 1) {
          expectedRigs = 1;
        }
        if (isNaN(expectedCards)) {
          expectedCards = CARDS_PER_RIG;
        } else if (expectedCards < 1) {
          expectedCards = 1;
        }
        expect(rigs.length).toEqual(expectedRigs);
        rigs.forEach(rig => {
          expect(rig.find('div.GraphicsCardSlider-card').length)
            .toEqual(expectedCards);
          expect(rig.find('div.GraphicsCardSlider-tooltip').length)
            .toEqual(expectedCards);
        });
      }
    }
  });

  it('highlights selected cards and full rigs', () => {
    for (let i=0; i < TEST_VALUES.length; i++) {
      const N = TEST_VALUES[i];
      const slider = shallow(
        <GraphicsCardSlider graphicsCards={N} />
      );

      const expectedCards = (N > MAX_CARDS) ? MAX_CARDS : N;
      const expectedRigs = (Math.floor(N/6) > NUM_RIGS) ? NUM_RIGS : Math.floor(N/6);
      // first N cards are highlighted
      slider.find('div.GraphicsCardSlider-card').forEach((node, idx) => {
        expect(node.hasClass('selected')).toEqual(idx+1 <= expectedCards);
      });
      // first floor(N/6) rigs are highlighted
      slider.find('div.GraphicsCardSlider-rig').forEach((node, idx) => {
        expect(node.hasClass('selected')).toEqual(idx+1 <= expectedRigs);
      });
    }
  });

  it('highlights selected cards and full rigs on mouse hover', () => {
    expect.assertions(HOVER_TEST_VALUES.length*(MAX_CARDS+NUM_RIGS));
    for (let i=0; i < HOVER_TEST_VALUES.length; i++) {
      const N = HOVER_TEST_VALUES[i];
      const slider = mount(
        <GraphicsCardSlider graphicsCards={0} />
      );
      // Trigger mouseEnter on Nth card
      const nthCard = slider.find('div.GraphicsCardSlider-card').at(N-1);
      slider.find('div.GraphicsCardSlider').prop('onMouseEnter')({},() => {
        nthCard.prop('onMouseEnter')({},() => {
          const expectedCards = (N > MAX_CARDS) ? MAX_CARDS : N;
          const expectedRigs = (Math.floor(N/6) > NUM_RIGS) ? NUM_RIGS : Math.floor(N/6);
          // first N cards are highlighted
          slider.find('div.GraphicsCardSlider-card').forEach((node, idx) => {
            expect(node.hasClass('selected')).toEqual(idx+1 <= expectedCards);
          });
          // first floor(N/6) rigs are highlighted
          slider.find('div.GraphicsCardSlider-rig').forEach((node, idx) => {
            expect(node.hasClass('selected')).toEqual(idx+1 <= expectedRigs);
          });
        });
      });
    }
  });

  it('displays proper tooltip on mouse hover', () => {
    expect.assertions(HOVER_TEST_VALUES.length);
    for (let i=0; i < HOVER_TEST_VALUES.length; i++) {
      let N = HOVER_TEST_VALUES[i];
      const slider = mount(
        <GraphicsCardSlider graphicsCards={0} />
      );
      // Trigger mouseEnter on Nth card
      const nthCard = slider.find('div.GraphicsCardSlider-card').at(N-1);
      slider.find('div.GraphicsCardSlider').prop('onMouseEnter')({},() => {
        nthCard.prop('onMouseEnter')({},() => {
          const expectedCards = (N > MAX_CARDS) ? MAX_CARDS : N;
          const tooltip = slider.find('div.GraphicsCardSlider-tooltip.show');
          expect(tooltip.length).toEqual(1);
        });
      });
    }
  });
});
