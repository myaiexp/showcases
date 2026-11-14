// BitmapLayer: textureParameters, smooth versus pixelated
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { drawChecker } from '../../shared/core-layers-1-art.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const FILTERS = {
  'linear (default)': { minFilter: 'linear', magFilter: 'linear' },
  'nearest': { minFilter: 'nearest', magFilter: 'nearest' },
} as const;
type Filter = keyof typeof FILTERS;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 5, latitude: 49, zoom: ctx.preview ? 3.2 : 4.2 };
  const image = drawChecker();
  // textureParameters is read when the image first loads or changes, so a new layer id per setting
  // makes the layer build a new texture.
  const bitmap = (f: Filter): BitmapLayer =>
    new BitmapLayer({ id: `checker-${f}`, image, bounds: [-2, 45, 12, 53], textureParameters: FILTERS[f] });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), bitmap('nearest')] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), bitmap(Math.floor(t / 2) % 2 ? 'linear (default)' : 'nearest')] }));
  } else {
    select(controlBar(el), 'textureParameters', Object.keys(FILTERS) as Filter[], (v) => deck.setProps({ layers: [landLayer(), bitmap(v)] }), 'nearest');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
