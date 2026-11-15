// vega.projection registers named projections, built-in based or from d3-geo
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import { geoProjection } from 'd3-geo';
import type { Spec, View, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// Two registrations. The first reuses a built-in constructor and fixes its tilt and clip;
// the second wraps a d3-geo raw projection (sinusoidal), as the docs do for d3-geo-projection.
const sinusoidal = (lambda: number, phi: number): [number, number] => [lambda * Math.cos(phi), phi];
api.projection('showcase-tilted', () => api.projection('orthographic')().rotate([-20, -35]).clipAngle(75));
api.projection('showcase-sinusoidal', () => geoProjection(sinusoidal));

const choices: Record<string, number> = { 'showcase-sinusoidal': 78, 'showcase-tilted': 105, 'equalEarth': 75 };
const names = Object.keys(choices);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (type: string): Spec => ({
    width: 440,
    height: 230,
    padding: 4,
    signals: [{ name: 'spin', value: 0, bind: { input: 'range', min: -180, max: 180, step: 1 } }],
    data: [
      { name: 'countries', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'countries' } },
      { name: 'graticule', transform: [{ type: 'graticule', step: [20, 20] }] },
    ],
    // The typings list only the built-in projection names, so the type is cast.
    projections: [{ name: 'proj', type: type as never, scale: choices[type] ?? 80, translate: { signal: '[width / 2, height / 2]' }, rotate: [{ signal: 'spin' }, 0, 0] }],
    marks: [
      { type: 'shape', from: { data: 'graticule' }, encode: { update: { stroke: { value: '#3b4252' }, fill: { value: 'transparent' } } }, transform: [{ type: 'geoshape', projection: 'proj' }] },
      { type: 'shape', from: { data: 'countries' }, encode: { update: { fill: { value: '#1e3a5f' }, stroke: { value: '#7dd3fc' }, strokeWidth: { value: 0.5 } } }, transform: [{ type: 'geoshape', projection: 'proj' }] },
      { type: 'text', encode: { update: { x: { value: 4 }, y: { value: 12 }, text: { value: type }, fill: { value: '#f59e0b' }, font: { value: 'monospace' }, fontSize: { value: 12 } } } },
    ],
  });

  let view: View | null = null;
  const build = async (type: string): Promise<void> => {
    view?.finalize();
    view = stage.adopt(new vega.View(vega.parse(make(type), stage.config), { ...stage.options, hover: true, logLevel: vega.Warn } as ViewOptions));
    await view.runAsync();
  };
  await build(names[0] ?? '');
  if (stage.bar) select(stage.bar, 'projection', names, names[0] ?? '', (v) => void build(v));
  if (stage.preview) {
    stage.every(120, (i) => {
      // Spin one projection, and move to the next type every full turn.
      if (i % 60 === 0) return build(names[(i / 60) % names.length] ?? '');
      view?.signal('spin', ((i % 60) * 6) % 360 - 180);
      return view?.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
