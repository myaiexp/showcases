// fit and size: the projection finds its own scale and translate for the selected state
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 240,
    autosize: 'none',
    padding: 5,
    signals: [
      {
        name: 'picked',
        value: 6,
        bind: { input: 'select', options: [6, 48, 12, 36, 53, 26, 15], labels: ['California', 'Texas', 'Florida', 'New York', 'Washington', 'Michigan', 'Hawaii'] },
      },
      { name: 'names', value: { 6: 'California', 48: 'Texas', 12: 'Florida', 36: 'New York', 53: 'Washington', 26: 'Michigan', 15: 'Hawaii' } },
    ],
    projections: [
      {
        name: 'projection',
        type: 'mercator',
        // fit takes GeoJSON (here the one selected state); size is the [width, height] it must fill.
        fit: { signal: "data('selected')" },
        size: [{ signal: 'width' }, { signal: 'height' }],
      },
    ],
    data: [
      { name: 'world', url: 'data/us-10m.json', format: { type: 'topojson', feature: 'states' } },
      { name: 'selected', source: 'world', transform: [{ type: 'filter', expr: 'datum.id === picked' }] },
    ],
    marks: [
      {
        type: 'shape',
        from: { data: 'world' },
        encode: { update: { stroke: { value: '#9ad6bf' }, strokeWidth: { value: 0.4 }, fill: { value: '#2f5d50' } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'shape',
        from: { data: 'selected' },
        encode: { update: { fill: { value: '#c9742c' }, stroke: { value: '#ffd9a8' }, strokeWidth: { value: 1 } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: 'names[picked]' } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'picked', [6, 48, 12, 36, 53, 26, 15], 1500);
  return () => stage.dispose();
};

export default mount;
