// H3ClusterLayer: connected busy cells grouped into clusters, outlined as polygons
import { Deck } from '@deck.gl/core';
import { H3ClusterLayer } from '@deck.gl/geo-layers';
import { gridDisk, latLngToCell } from 'h3-js';
import type { Mount } from '@/types.ts';
import { europeView, spots } from '../../shared/aggregation-data.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { countBy } from '../../shared/geo-layers-cells.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Hotspot {
  hexagons: string[];
  count: number;
}

const PALETTE: [number, number, number][] = [[255, 150, 60], [90, 210, 255], [255, 110, 150], [150, 240, 140], [190, 150, 255]];

/** Groups cells with at least `min` points into clusters of neighbouring cells. */
function hotspots(counts: Map<string, number>, min: number): Hotspot[] {
  const hot = new Set([...counts].filter(([, n]) => n >= min).map(([id]) => id));
  const seen = new Set<string>();
  const out: Hotspot[] = [];
  for (const start of hot) {
    if (seen.has(start)) continue;
    const members: string[] = [];
    const queue = [start];
    seen.add(start);
    while (queue.length) {
      const cell = queue.pop()!;
      members.push(cell);
      for (const next of gridDisk(cell, 1)) {
        if (hot.has(next) && !seen.has(next)) {
          seen.add(next);
          queue.push(next);
        }
      }
    }
    out.push({ hexagons: members, count: members.reduce((s, c) => s + counts.get(c)!, 0) });
  }
  return out;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const res = ctx.preview ? 3 : 4;
  const points = spots(ctx.preview ? 2000 : 6000);
  const counts = countBy(points, (p) => latLngToCell(p.position[1], p.position[0], res));
  const view = europeView(ctx.preview);

  const clusters = (min: number): H3ClusterLayer<Hotspot> =>
    new H3ClusterLayer<Hotspot>({
      id: 'hot',
      data: hotspots(counts, min),
      getHexagons: (d) => d.hexagons,
      getFillColor: (d) => [...PALETTE[d.hexagons.length % PALETTE.length]!, 110],
      getLineColor: (d) => PALETTE[d.hexagons.length % PALETTE.length]!,
      lineWidthMinPixels: 2,
      pickable: !ctx.preview,
    });
  const initial = ctx.preview ? 8 : 20;
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), clusters(initial)],
    getTooltip: ({ object }: { object?: Hotspot }) => (object ? `${object.hexagons.length} cells, ${object.count} points` : null),
  });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), clusters(2 + Math.round((1 + Math.sin(t * 0.8)) * 7))] }));
  } else {
    slider(controlBar(el), 'minimum points per cell', 1, 120, 1, initial, (v) => deck.setProps({ layers: [landLayer(), clusters(v)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
