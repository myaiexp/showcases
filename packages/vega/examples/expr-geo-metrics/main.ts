// Geographic functions: geoArea, geoBounds, geoCentroid, geoScale and geoTranslate for the state under the pointer
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { exprMarks, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const guard = (e: string): string => `pick ? ${e} : "hover a state"`;
const rows: ExprRow[] = [
  { expr: guard('"id " + pick.id'), label: 'pick.id' },
  { expr: guard('format(geoArea("projection", pick), ",.0f") + " px²"'), label: 'geoArea("projection", pick)' },
  { expr: guard('format(geoArea(null, pick), ".4f") + " sr"'), label: 'geoArea(null, pick)' },
  { expr: guard('round(geoCentroid("projection", pick)[0]) + ", " + round(geoCentroid("projection", pick)[1])'), label: 'geoCentroid("projection", pick)' },
  { expr: guard('round(geoBounds("projection", pick)[1][0] - geoBounds("projection", pick)[0][0]) + " x " + round(geoBounds("projection", pick)[1][1] - geoBounds("projection", pick)[0][1]) + " px"'), label: 'geoBounds(...) as width x height' },
  { expr: guard('format(geoBounds(null, pick)[0][0], ".1f") + " to " + format(geoBounds(null, pick)[1][0], ".1f") + " lon"'), label: 'geoBounds(null, pick)' },
  { expr: 'round(geoScale("projection"))', label: 'geoScale("projection")' },
  { expr: 'geoTranslate("projection")', label: 'geoTranslate("projection")' },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 260,
    padding: 5,
    signals: [
      { name: 'pick', value: null, on: [{ events: '@state:mouseover', update: 'datum' }, { events: '@state:mouseout', update: 'null' }] },
    ],
    projections: [{ name: 'projection', type: 'albersUsa', scale: 500, translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }] }],
    data: [{ name: 'states', url: 'data/us-10m.json', format: { type: 'topojson', feature: 'states' } }],
    marks: [
      {
        type: 'shape',
        name: 'state',
        from: { data: 'states' },
        encode: {
          update: { fill: { signal: 'pick && pick.id === datum.id ? "#2f5d8a" : "#242a36"' }, stroke: { value: '#566' }, strokeWidth: { value: 0.6 } },
        },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        // The projected bounding box, from geoBounds.
        type: 'rect',
        encode: {
          update: {
            x: { signal: 'pick ? geoBounds("projection", pick)[0][0] : 0' },
            x2: { signal: 'pick ? geoBounds("projection", pick)[1][0] : 0' },
            y: { signal: 'pick ? geoBounds("projection", pick)[0][1] : 0' },
            y2: { signal: 'pick ? geoBounds("projection", pick)[1][1] : 0' },
            fill: { value: 'transparent' },
            stroke: { value: 'orange' },
            strokeOpacity: { signal: 'pick ? 1 : 0' },
            strokeDash: { value: [4, 3] },
          },
        },
      },
      {
        // The projected centroid, from geoCentroid.
        type: 'symbol',
        encode: {
          update: {
            x: { signal: 'pick ? geoCentroid("projection", pick)[0] : 0' },
            y: { signal: 'pick ? geoCentroid("projection", pick)[1] : 0' },
            shape: { value: 'cross' },
            size: { value: 120 },
            stroke: { value: 'orange' },
            strokeWidth: { value: 2 },
            opacity: { signal: 'pick ? 1 : 0' },
          },
        },
      },
      // The table sits under the map.
      { type: 'group', encode: { enter: { x: { value: 0 }, y: { value: 276 } } }, marks: exprMarks(rows, { labelWidth: 200, resultWidth: 220 }) },
    ],
  };
  const view = await stage.render(spec);
  if (stage.preview) {
    const states = (view.data('states') as { id: number }[]).filter((d) => [6, 48, 36, 53, 12, 30].includes(Number(d.id)));
    stage.every(1200, (i) => {
      view.signal('pick', states[i % states.length] ?? null);
      return view.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
