// Three ways to change a scatterplot, and how often each calls getRadius
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const N = ctx.preview ? 500 : 20_000;
  const base = pointCloud(N, { seed: 31, spread: 2.5 });
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Press a button: the count is how often getRadius ran.');

  let data = base;
  let year = 0;
  let scale = 1;
  let calls = 0;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      data,
      getPosition: (d) => d.position,
      getRadius: (d) => {
        calls++;
        return 2 + d.value * 3 + year;
      },
      radiusUnits: 'pixels',
      getFillColor: [255, 170, 70, 160],
      // 1) a new data array, 2) a new updateTriggers value, 3) a new radiusScale
      updateTriggers: { getRadius: year },
      radiusScale: scale,
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  const run = (name: string, change: () => void): void => {
    calls = 0;
    change();
    deck.setProps({ layers: layers() });
    // Attributes are updated during the next frame, so look at the counter shortly after.
    window.setTimeout(() => (label.textContent = `${name}: getRadius called ${calls} times (${N} points)`), 250);
  };
  const actions: [string, () => void][] = [
    ['new data array (same contents)', () => (data = base.slice())],
    ['updateTriggers.getRadius changed', () => (year = (year + 1) % 3)],
    ['radiusScale changed', () => (scale = scale === 1 ? 1.8 : 1)],
  ];

  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => run(...actions[i++ % 3]!), 1800);
  } else {
    const bar = controlBar(el);
    for (const [name, change] of actions) button(bar, name, () => run(name, change));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
