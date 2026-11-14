// ColumnLayer: angle, offset and coverage on square columns (diskResolution 4)
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ColumnLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { gridCells, type GridCell } from '../../shared/core-layers-1-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const n = ctx.preview ? 7 : 10;
  const data = gridCells(n, n, 3000, [2.1, 48.7]);
  const view: MapViewState = { longitude: 2.3, latitude: 48.85, zoom: ctx.preview ? 9.6 : 10.6, pitch: 50, bearing: 20 };

  const columns = (angle: number, offset: [number, number], coverage: number): ColumnLayer<GridCell> =>
    new ColumnLayer<GridCell>({
      id: 'columns',
      data,
      diskResolution: 4,
      radius: 1500,
      getPosition: (d) => d.position,
      getFillColor: (d) => [90 + d.value * 160, 140, 255 - d.value * 140],
      getElevation: (d) => 400 + d.value * 5000,
      angle, // degrees, counter-clockwise
      offset, // relative to the radius: [1, 0] moves a column one radius east
      coverage, // 0..1 multiplier on the radius
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), columns(0, [0, 0], 1)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), columns(t * 30, [Math.sin(t) * 0.5, 0], 0.7 + Math.sin(t * 0.6) * 0.25)] }));
  } else {
    let [a, ox, oy, c] = [0, 0, 0, 1];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), columns(a, [ox, oy], c)] });
    const bar = controlBar(el);
    slider(bar, 'angle', 0, 360, 5, a, (v) => ((a = v), refresh()));
    slider(bar, 'offset x', -1, 1, 0.05, ox, (v) => ((ox = v), refresh()));
    slider(bar, 'offset y', -1, 1, 0.05, oy, (v) => ((oy = v), refresh()));
    slider(bar, 'coverage', 0.1, 1, 0.05, c, (v) => ((c = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
