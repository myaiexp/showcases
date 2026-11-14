// BitmapLayer: a canvas picture over [left, bottom, right, top] bounds
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { BitmapLayer } from '@deck.gl/layers';
import type { BitmapBoundingBox, BitmapLayerPickingInfo } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { drawPicture } from '../../shared/core-layers-1-art.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

// [left, bottom, right, top] in longitude and latitude: the same image, three stretches.
const BOUNDS = {
  'wide (4:3 on the map)': [-4, 44, 14, 54],
  'tall and thin': [2, 42, 8, 56],
  'small': [4, 47, 10, 51],
} satisfies Record<string, BitmapBoundingBox>;
type Preset = keyof typeof BOUNDS;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 5, latitude: 49, zoom: ctx.preview ? 3 : 4.2 };
  const image = drawPicture();

  const bitmap = (bounds: BitmapBoundingBox): BitmapLayer =>
    new BitmapLayer({ id: 'picture', image, bounds, pickable: !ctx.preview });

  const info = ctx.preview ? null : readout(el, 'Hover the picture to read the pixel under the cursor');
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    onHover: (picked) => {
      // Deck's callback is typed for any layer; BitmapLayer adds the `bitmap` field.
      const b = (picked as BitmapLayerPickingInfo).bitmap;
      if (info) info.textContent = b ? `pixel [${b.pixel.join(', ')}] of ${b.size.width} x ${b.size.height}, uv [${b.uv.map((n) => n.toFixed(2)).join(', ')}]` : 'Hover the picture to read the pixel under the cursor';
    },
    layers: [landLayer(), bitmap(BOUNDS['wide (4:3 on the map)'])],
  });

  let stop: () => void = () => {};
  if (ctx.preview) {
    const names = Object.keys(BOUNDS) as Preset[];
    stop = animate((t) => deck.setProps({ layers: [landLayer(), bitmap(BOUNDS[names[Math.floor(t / 2.5) % 3]!])] }));
  } else {
    select(controlBar(el), 'bounds', Object.keys(BOUNDS) as Preset[], (v) => deck.setProps({ layers: [landLayer(), bitmap(BOUNDS[v])] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
