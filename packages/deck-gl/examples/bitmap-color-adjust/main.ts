// BitmapLayer: desaturate, tintColor and transparentColor
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { drawPicture } from '../../shared/core-layers-1-art.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const TINTS: Record<string, Color> = {
  none: [255, 255, 255],
  red: [255, 120, 120],
  green: [120, 255, 140],
  blue: [120, 160, 255],
};
const BACKDROPS: Record<string, Color> = {
  'clear [0,0,0,0]': [0, 0, 0, 0],
  'magenta': [255, 0, 255, 255],
  'white, half': [255, 255, 255, 140],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 5, latitude: 49, zoom: ctx.preview ? 3 : 4.1 };
  const image = drawPicture();
  const bitmap = (desaturate: number, tintColor: Color, transparentColor: Color): BitmapLayer =>
    new BitmapLayer({ id: 'picture', image, bounds: [-4, 44, 14, 54], desaturate, tintColor, transparentColor });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), bitmap(0, TINTS['none']!, BACKDROPS['clear [0,0,0,0]']!)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    const tints = Object.values(TINTS);
    stop = animate((t) => deck.setProps({ layers: [landLayer(), bitmap((1 + Math.sin(t)) / 2, tints[Math.floor(t / 2) % 4]!, BACKDROPS['magenta']!)] }));
  } else {
    let [d, tint, back] = [0, 'none', 'clear [0,0,0,0]'];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), bitmap(d, TINTS[tint!]!, BACKDROPS[back!]!)] });
    const bar = controlBar(el);
    slider(bar, 'desaturate', 0, 1, 0.05, 0, (v) => ((d = v), refresh()));
    select(bar, 'tintColor', Object.keys(TINTS), (v) => ((tint = v), refresh()));
    select(bar, 'transparentColor', Object.keys(BACKDROPS), (v) => ((back = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
