// parameters: GPU blend and depth state applied while one layer draws
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const MODES = ['normal', 'additive', 'additive, no depth write'] as const;
type Mode = (typeof MODES)[number];
const DATA = pointCloud(500, { seed: 14, spread: 2.2, centres: [[8, 47], [14, 50], [3, 45]] });

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let mode: Mode = 'additive';

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'glow',
      data: DATA,
      getPosition: (d) => d.position,
      getFillColor: [255, 110, 40, 90],
      getRadius: 26,
      radiusUnits: 'pixels',
      // Applied only while this layer draws. Additive: source colour times its alpha plus
      // what is already on screen, so overlaps brighten instead of covering.
      parameters:
        mode === 'normal'
          ? {}
          : {
              blend: true,
              blendColorOperation: 'add',
              blendColorSrcFactor: 'src-alpha',
              blendColorDstFactor: 'one',
              blendAlphaOperation: 'add',
              blendAlphaSrcFactor: 'one',
              blendAlphaDstFactor: 'one',
              depthWriteEnabled: mode === 'additive',
            },
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const apply = (): void => {
    deck.setProps({ layers: layers() });
    label.textContent = `parameters: ${mode}`;
  };
  apply();

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      mode = mode === 'normal' ? 'additive' : 'normal';
      apply();
    }, 1800);
  } else {
    select(controlBar(el), 'blend', MODES, (v) => {
      mode = v;
      apply();
    }, mode);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
