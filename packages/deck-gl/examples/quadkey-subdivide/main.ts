// QuadkeyLayer: click a cell and swap its key for its four children
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { QuadkeyLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { quadkeyChildren, quadkeyOf } from '../../shared/geo-layers-cells.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const START = ['0', '1', '2', '3'];
const MAX_LEVEL = 8;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 40, zoom: ctx.preview ? 0.6 : 1.4 };
  let keys = START;

  const layer = (): QuadkeyLayer<string> =>
    new QuadkeyLayer<string>({
      id: 'keys',
      data: keys,
      getQuadkey: (d) => d,
      // Deeper cells are more saturated, so the hierarchy reads at a glance.
      getFillColor: (d) => [60 + d.length * 20, 190 - d.length * 12, 255 - d.length * 14, 150],
      getLineColor: [255, 255, 255, 160],
      stroked: true,
      lineWidthMinPixels: 1,
      pickable: !ctx.preview,
      autoHighlight: true,
    });

  const info = ctx.preview ? null : readout(el, 'Click a cell to split it.');
  const show = (): void => {
    deck.setProps({ layers: [landLayer(), layer()] });
    if (info) info.textContent = `${keys.length} cells: ${keys.slice(0, 8).join(' ')}${keys.length > 8 ? ' …' : ''}`;
  };
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), layer()],
    onClick: ({ object }: PickingInfo<string>) => {
      if (!object || object.length >= MAX_LEVEL) return;
      keys = keys.flatMap((k) => (k === object ? quadkeyChildren(k) : [k]));
      show();
    },
  });

  if (!ctx.preview) button(controlBar(el), 'Reset', () => ((keys = START), show()));

  // Card: keep splitting the cell over Europe, then start again.
  const target = quadkeyOf([10, 48], MAX_LEVEL);
  let depth = 1;
  const timer = ctx.preview
    ? setInterval(() => {
        depth = depth >= 5 ? 1 : depth + 1;
        keys = START.flatMap((k) => (target.startsWith(k) ? expand(k, target, depth) : [k]));
        show();
      }, 1100)
    : 0;
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

/** Splits `key` toward `target` until `depth` digits are shared, keeping the siblings. */
function expand(key: string, target: string, depth: number): string[] {
  if (key.length >= depth) return [key];
  return quadkeyChildren(key).flatMap((k) => (target.startsWith(k) ? expand(k, target, depth) : [k]));
}

export default mount;
