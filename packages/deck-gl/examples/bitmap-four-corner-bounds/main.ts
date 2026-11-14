// BitmapLayer: bounds as four corners, to skew or rotate the image
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { BitmapLayer } from '@deck.gl/layers';
import type { BitmapBoundingBox } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { drawPicture } from '../../shared/core-layers-1-art.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const CENTRE = [5, 49] as const;

/**
 * Corners in the order the docs require: [[left, bottom], [left, top], [right, top],
 * [right, bottom]], rotated by `deg` around the centre and sheared by `shear` degrees.
 */
function corners(deg: number, shear: number): BitmapBoundingBox {
  const a = (deg * Math.PI) / 180;
  const base: [number, number][] = [[-8, -5], [-8 + shear, 5], [8 + shear, 5], [8, -5]];
  const [cx, cy] = CENTRE;
  const [c, s] = [Math.cos(a), Math.sin(a)];
  const [bl, tl, tr, br] = base.map(([x, y]): [number, number] => [cx + x * c - y * s * 1.3, cy + (x * s + y * c) * 0.75]);
  return [bl!, tl!, tr!, br!];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 5, latitude: 49, zoom: ctx.preview ? 3 : 4 };
  const image = drawPicture();
  const bitmap = (deg: number, shear: number): BitmapLayer => new BitmapLayer({ id: 'quad', image, bounds: corners(deg, shear) });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), bitmap(0, 0)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), bitmap(Math.sin(t * 0.7) * 40, Math.sin(t) * 4)] }));
  } else {
    let deg = 0;
    let shear = 0;
    const refresh = (): void => deck.setProps({ layers: [landLayer(), bitmap(deg, shear)] });
    const bar = controlBar(el);
    slider(bar, 'rotate (deg)', -90, 90, 1, 0, (v) => ((deg = v), refresh()));
    slider(bar, 'shear (deg of longitude)', -8, 8, 0.5, 0, (v) => ((shear = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
