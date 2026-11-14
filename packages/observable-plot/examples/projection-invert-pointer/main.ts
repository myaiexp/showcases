// projection.invert turns a pointer position back into longitude and latitude
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { topojson, worldTopology } from '../../shared/data.ts';
import { mountStatic, plotSvg, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  const stop = mountStatic(el, ctx, ({ width, height }) => {
    const plot = Plot.plot({
      width,
      height,
      projection: 'equal-earth',
      marks: [Plot.graticule(), Plot.geo(land, { fill: 'currentColor', fillOpacity: 0.4 }), Plot.sphere()],
    });
    const projection = plot.scale('projection') as { invert?: (p: [number, number]) => [number, number] | null } | undefined;
    const svg = d3.select(plotSvg(plot)!);
    const dot = svg.append('circle').attr('r', 4).attr('fill', 'red').attr('display', 'none');
    const label = svg.append('text').attr('fill', 'currentColor').attr('font-size', 11).attr('x', 6).attr('y', 14);
    svg.on('pointermove', (event: PointerEvent) => {
      const [x, y] = d3.pointer(event);
      const lonlat = projection?.invert?.([x, y]);
      dot.attr('display', lonlat ? null : 'none').attr('cx', x).attr('cy', y);
      label.text(lonlat ? `lon ${lonlat[0].toFixed(1)}°, lat ${lonlat[1].toFixed(1)}°` : '');
    });
    return plot;
  });
  // A card has no pointer: sweep a synthetic one along a slanted path.
  let undo = () => {};
  const timer = ctx.preview
    ? setTimeout(() => {
        const root = el.querySelector('svg');
        if (root) undo = sweepPointer(root, (t) => [0.15 + 0.7 * t, 0.3 + 0.4 * Math.sin(t * Math.PI * 2)]);
      }, 100)
    : 0;
  return () => {
    clearTimeout(timer);
    undo();
    stop();
  };
};

export default mount;
