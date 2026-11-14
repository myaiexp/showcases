// GridCellLayer: cellSize, coverage and elevationScale on square cells
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { GridCellLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { gridCells, type GridCell } from '../../shared/core-layers-1-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // 3 km cells laid out on a lattice of the same size, so cellSize 3000 tiles them exactly.
  const n = ctx.preview ? 14 : 22;
  const data = gridCells(n, n, 3000, [2.0, 48.5], 9);
  const view: MapViewState = { longitude: 2.3, latitude: 48.85, zoom: ctx.preview ? 9.4 : 10, pitch: 55, bearing: 25 };

  const cells = (cellSize: number, coverage: number, elevationScale: number): GridCellLayer<GridCell> =>
    new GridCellLayer<GridCell>({
      id: 'cells',
      data,
      getPosition: (d) => d.position,
      getFillColor: (d) => [60 + d.value * 195, 200 - d.value * 120, 255 - d.value * 200],
      getElevation: (d) => d.value * 9000, // metres
      cellSize,
      coverage,
      elevationScale,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), cells(3000, 1, 1)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), cells(3000, 0.85, 0.4 + (1 + Math.sin(t)) * 0.4)], viewState: { ...view, bearing: 25 + t * 5 } }));
  } else {
    let [size, cov, scale] = [3000, 1, 1];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), cells(size, cov, scale)] });
    const bar = controlBar(el);
    slider(bar, 'cellSize (m)', 1000, 6000, 250, size, (v) => ((size = v), refresh()));
    slider(bar, 'coverage', 0.1, 1, 0.05, cov, (v) => ((cov = v), refresh()));
    slider(bar, 'elevationScale', 0, 3, 0.1, scale, (v) => ((scale = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
