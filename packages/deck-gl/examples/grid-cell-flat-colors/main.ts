// GridCellLayer: extruded false, with the value as a colour ramp
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import { GridCellLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { gridCells, type GridCell } from '../../shared/core-layers-1-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** Dark blue through teal to yellow, by value 0..1. */
function ramp(v: number): Color {
  const stops: Color[] = [[20, 30, 110], [30, 150, 160], [250, 230, 90]];
  const x = Math.min(0.999, v) * 2;
  const i = Math.floor(x);
  const f = x - i;
  const [a, b] = [stops[i]!, stops[i + 1]!];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f, 220];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const n = ctx.preview ? 16 : 30;
  const data = gridCells(n, n, 2000, [2.0, 48.5], 4);
  const view: MapViewState = { longitude: 2.3, latitude: 48.8, zoom: ctx.preview ? 9.7 : 10.4, pitch: 45 };

  const cells = (extruded: boolean): GridCellLayer<GridCell> =>
    new GridCellLayer<GridCell>({
      id: 'cells',
      data,
      extruded,
      cellSize: 2000,
      coverage: 0.95,
      getPosition: (d) => d.position,
      getFillColor: (d) => ramp(d.value),
      getElevation: (d) => d.value * 6000,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), cells(false)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), cells(Math.floor(t / 3) % 2 === 1)], viewState: { ...view, bearing: t * 6 } }));
  } else {
    check(controlBar(el), 'extruded', false, (v) => deck.setProps({ layers: [landLayer(), cells(v)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
