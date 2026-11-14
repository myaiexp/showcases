// Deck parameters: GPU blend and depth state applied to every layer
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

// Each mode is the object handed to Deck's `parameters` prop.
const MODES = {
  default: {},
  additive: {
    blendColorSrcFactor: 'one',
    blendColorDstFactor: 'one',
    blendAlphaSrcFactor: 'one',
    blendAlphaDstFactor: 'one',
    depthWriteEnabled: false,
  },
  'no blending': { blend: false },
  'depth test off': { depthCompare: 'always', depthWriteEnabled: false },
} as const;
type Mode = keyof typeof MODES;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  const points = pointCloud(ctx.preview ? 500 : 2500, { seed: 4, spread: 3 });
  let mode: Mode = 'additive';

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    parameters: MODES[mode],
    layers: [
      landLayer(),
      new ScatterplotLayer<SamplePoint>({
        id: 'points',
        data: points,
        getPosition: (d) => d.position,
        getRadius: 14,
        radiusUnits: 'pixels',
        getFillColor: [255, 120, 60, 120],
      }),
    ],
  });

  const apply = (next: Mode): void => {
    mode = next;
    deck.setProps({ parameters: MODES[mode] });
    label.textContent = `parameters: ${JSON.stringify(MODES[mode])}`;
  };
  apply(mode);

  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    const names = Object.keys(MODES) as Mode[];
    let i = 0;
    timer = window.setInterval(() => apply(names[++i % names.length]!), 1600);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(8 + Math.sin(t / 3) * 3) } }));
  } else {
    select(controlBar(el), 'parameters', Object.keys(MODES) as Mode[], apply, mode);
  }

  return () => {
    window.clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
