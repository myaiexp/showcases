// transitions: enter sets where new objects start; onStart, onEnd, onInterrupt
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const ALL = pointCloud(160, { seed: 40, spread: 2.4 });

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let count = 30;
  let events = '';

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      data: ALL.slice(0, count),
      getPosition: (d) => d.position,
      getFillColor: [255, 190, 90, 230],
      getRadius: 6,
      radiusUnits: 'pixels',
      transitions: {
        getPosition: {
          duration: 1200,
          // Objects that appear with this update start from Paris instead of their own position.
          enter: () => [2.35, 48.86],
          onStart: () => (events = 'onStart'),
          onEnd: () => (events = 'onEnd'),
          onInterrupt: () => (events = 'onInterrupt'),
        },
      },
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    onAfterRender: () => {
      label.textContent = `${count} points, last transition event: ${events || 'none'}`;
    },
  });
  const set = (n: number): void => {
    count = n;
    deck.setProps({ layers: layers() });
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => set(count >= 150 ? 30 : count + 60), 1800);
  } else {
    const bar = controlBar(el);
    button(bar, 'Add 40 points', () => set(Math.min(ALL.length, count + 40)));
    button(bar, 'Reset to 30', () => set(30));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
