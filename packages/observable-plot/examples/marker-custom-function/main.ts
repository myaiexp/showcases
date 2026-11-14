// A marker as a function: it gets the stroke colour, returns an SVG marker
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SVG = 'http://www.w3.org/2000/svg';

function makeMarker(shape: 'diamond' | 'square' | 'triangle'): (color: string, context: { document: Document }) => SVGMarkerElement {
  const paths = { diamond: 'M0,-5 L5,0 L0,5 L-5,0 Z', square: 'M-4,-4 H4 V4 H-4 Z', triangle: 'M0,-5 L5,4 L-5,4 Z' };
  return (color, { document }) => {
    const marker = document.createElementNS(SVG, 'marker') as SVGMarkerElement;
    marker.setAttribute('viewBox', '-6 -6 12 12');
    marker.setAttribute('markerWidth', '8');
    marker.setAttribute('markerHeight', '8');
    marker.setAttribute('refX', '0');
    marker.setAttribute('refY', '0');
    marker.setAttribute('markerUnits', 'userSpaceOnUse');
    const path = document.createElementNS(SVG, 'path');
    path.setAttribute('d', paths[shape]);
    path.setAttribute('fill', color);
    path.setAttribute('stroke', 'var(--bg)');
    marker.append(path);
    return marker;
  };
}

const SHAPES = ['diamond', 'square', 'triangle'] as const;

const mount: Mount = async (el, ctx) => {
  const aapl = (await csv('aapl.csv')).slice(-25);
  return mountPlot<{ shape: (typeof SHAPES)[number] }>(el, ctx, {
    initial: { shape: 'diamond' },
    render: ({ shape }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `marker: function (${shape})` : undefined,
        y: { grid: true },
        marks: [Plot.lineY(aapl, { x: 'Date', y: 'Close', stroke: 'orange', strokeWidth: 1.5, marker: makeMarker(shape) })],
      }),
    step: (_s, i) => ({ shape: SHAPES[i % SHAPES.length] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'marker function', SHAPES, live.state.shape, (shape) => live.set({ shape }));
    },
  });
};

export default mount;
