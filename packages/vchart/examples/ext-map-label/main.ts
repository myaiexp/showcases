// The mapLabel component: name and value labels with icon, background and leader line on a scatter map
import type { Mount } from '@/types.ts';
import { registerMapLabel } from '@visactor/vchart-extension';
import { mountLive } from '../../shared/live-spec.ts';
import { select, slider, type ISpec } from '../../shared/chart.ts';
import { WORLD_GEO, registerWorldMaps } from '../../shared/world.ts';

registerMapLabel();
registerWorldMaps();

const CITIES = [
  { name: 'Tokyo', lon: 139.7, lat: 35.7, value: 37 },
  { name: 'Cairo', lon: 31.2, lat: 30.0, value: 21 },
  { name: 'Sao Paulo', lon: -46.6, lat: -23.5, value: 22 },
  { name: 'New York', lon: -74.0, lat: 40.7, value: 19 },
  { name: 'London', lon: -0.1, lat: 51.5, value: 9 },
  { name: 'Sydney', lon: 151.2, lat: -33.9, value: 5 },
];

interface State {
  position: 'top' | 'right' | 'bottom' | 'left' | 'outer';
  offset: number;
  leader: boolean;
}

function build(s: State, preview: boolean): ISpec {
  return {
    type: 'common',
    padding: preview ? 20 : 50,
    animation: false,
    region: [{ coordinate: 'geo', longitudeField: 'lon', latitudeField: 'lat', projection: { type: 'equirectangular' } }],
    mapLabel: {
      visible: true,
      seriesId: 'cities',
      nameField: 'name',
      valueField: 'value',
      position: s.position,
      offset: s.offset,
      space: 6,
      nameLabel: { style: { fill: '#1677ff', fontSize: preview ? 9 : 12 } },
      valueLabel: { style: { fill: '#1677ff', fontSize: preview ? 9 : 12 } },
      icon: { visible: true, style: { symbolType: 'circle', size: 8, fill: '#e8684a' } },
      leader: { visible: s.leader, style: { stroke: '#1677ff' } },
      background: { style: { fill: '#e6f4ff', stroke: '#1677ff', cornerRadius: 3 } },
    },
    series: [
      { type: 'map', id: 'base', map: WORLD_GEO, nameField: 'name', valueField: 'value', data: { id: 'empty', values: [] }, defaultFillColor: 'rgba(255,255,255,0.14)', area: { style: { stroke: 'rgba(255,255,255,0.25)', lineWidth: 0.5 } } },
      {
        type: 'scatter',
        id: 'cities',
        regionIndex: 0,
        data: { id: 'cities', values: CITIES },
        xField: 'name',
        yField: 'value',
        point: { style: { fill: '#1677ff', size: 8, outerBorder: { distance: 2, lineWidth: 3, strokeOpacity: 0.3 } } },
      },
    ],
  } as unknown as ISpec;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { position: 'top', offset: 12, leader: true },
    build,
    controls(bar, live) {
      select(bar, 'position', ['top', 'right', 'bottom', 'left', 'outer'], (v) => live.set({ position: v as State['position'] }));
      slider(bar, 'offset', [0, 40, 2], 12, (v) => live.set({ offset: v }));
      select(bar, 'leader', ['visible', 'hidden'], (v) => live.set({ leader: v === 'visible' }));
    },
    step: (_, i) => ({ position: (['top', 'right', 'bottom', 'left', 'outer'] as const)[i % 5] as State['position'] }),
    previewMs: 1800,
    mode: 'rebuild',
    chart: { height: 460 },
  });

export default mount;
