// Map series names: nameMap renames GeoJSON regions, nameProperty picks another property as the key
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';
import { COUNTRY_SET, withCodes } from './names.ts';

// Every feature also gets a `code` property so nameProperty has something to point at.
echarts.registerMap('map-name-map-labels-world', { geoJSON: withCodes(COUNTRIES) as never, specialAreas: {} });

const MODES = ['GeoJSON name', 'nameMap (Finnish)', 'nameProperty (code)'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  /** The series for one naming mode; data names must use the same naming as the map does. */
  const series = (mode: Mode): object => {
    const display = (c: (typeof COUNTRY_SET)[number]): string =>
      mode === 'nameMap (Finnish)' ? c.fi : mode === 'nameProperty (code)' ? c.code : c.name;
    return {
      type: 'map',
      map: 'map-name-map-labels-world',
      // nameMap: GeoJSON name -> the name used by data, labels and tooltips.
      nameMap: Object.fromEntries(COUNTRY_SET.map((c) => [c.name, mode === 'nameMap (Finnish)' ? c.fi : c.name])),
      // nameProperty: which feature property is the region name (here 'code' or the default 'name').
      nameProperty: mode === 'nameProperty (code)' ? 'code' : 'name',
      // Each data item turns its own label on, so only the listed countries are labelled.
      data: COUNTRY_SET.map((c) => ({
        name: display(c),
        value: c.value,
        label: { show: true, formatter: '{b}', color: '#f0f0f0', fontSize: 11, textBorderColor: '#0d1117', textBorderWidth: 2 },
      })),
      itemStyle: { borderColor: '#0d1117', borderWidth: 0.5, areaColor: '#2a2f3a' },
      emphasis: { label: { show: true }, itemStyle: { areaColor: '#f2b94c' } },
      select: { disabled: true },
    };
  };

  chart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    visualMap: {
      min: 30,
      max: 95,
      show: false,
      inRange: { color: ['#27496d', '#3b82c4', '#9bd4a4', '#f2e394'] },
    },
    series: [series('GeoJSON name')],
  });

  const apply = (mode: Mode): void => {
    chart.setOption({ series: [series(mode)] });
  };
  if (bar) select(bar, 'Naming', MODES, (v) => apply(v as Mode));

  let i = 0;
  const stop = ctx.preview ? every(2200, () => apply(MODES[++i % MODES.length]!)) : (): void => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
