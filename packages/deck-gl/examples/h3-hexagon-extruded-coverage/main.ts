// H3HexagonLayer: extruded cells with getElevation, shrunk by coverage
import { Deck } from '@deck.gl/core';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { latLngToCell } from 'h3-js';
import type { Mount } from '@/types.ts';
import { europeView, spots } from '../../shared/aggregation-data.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { countBy, heat, toCells, type CellCount } from '../../shared/geo-layers-cells.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const res = ctx.preview ? 3 : 4;
  const points = spots(ctx.preview ? 1500 : 5000);
  const data = toCells(countBy(points, (p) => latLngToCell(p.position[1], p.position[0], res)));
  const max = data[0]?.count ?? 1;
  const view = europeView(ctx.preview, { pitch: 55, bearing: -15 });

  const hexagons = (coverage: number, extruded: boolean): H3HexagonLayer<CellCount> =>
    new H3HexagonLayer<CellCount>({
      id: 'h3',
      data,
      getHexagon: (d) => d.id,
      getFillColor: (d) => heat(Math.sqrt(d.count / max)),
      getElevation: (d) => d.count,
      elevationScale: ctx.preview ? 120 : 60,
      extruded,
      // 1 draws the real hexagon; below 1 each one shrinks toward its centre.
      coverage,
      material: { ambient: 0.6, diffuse: 0.6 },
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), hexagons(0.9, true)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), hexagons(0.55 + (1 + Math.sin(t)) * 0.22, true)], viewState: { ...view, bearing: -15 + t * 6 } }));
  } else {
    let coverage = 0.9;
    let extruded = true;
    const refresh = (): void => deck.setProps({ layers: [landLayer(), hexagons(coverage, extruded)] });
    const bar = controlBar(el);
    slider(bar, 'coverage', 0.1, 1, 0.05, coverage, (v) => ((coverage = v), refresh()));
    check(bar, 'extruded', extruded, (v) => ((extruded = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
