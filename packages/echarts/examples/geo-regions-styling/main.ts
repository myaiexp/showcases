// geo.regions: styles, labels, select and emphasis states and tooltips for single named countries
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';

// geo.map names a registered map; this name is private to the example.
echarts.registerMap('geo-regions-styling-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

interface Group {
  center: [number, number];
  zoom: number;
  countries: string[];
}
const GROUPS: Record<string, Group> = {
  Nordic: { center: [15, 63], zoom: 3.2, countries: ['Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland'] },
  'Western Europe': { center: [5, 50], zoom: 5.5, countries: ['Belgium', 'Netherlands', 'Luxembourg', 'Germany', 'France'] },
  Baltic: { center: [24, 55], zoom: 6, countries: ['Estonia', 'Latvia', 'Lithuania', 'Poland', 'Belarus'] },
  'East Africa': { center: [34, -3], zoom: 5, countries: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Burundi'] },
  Andes: { center: [-72, -14], zoom: 2.6, countries: ['Peru', 'Bolivia', 'Chile', 'Ecuador', 'Colombia'] },
};
// One [fill, hover fill] pair per country in a group.
const PALETTE: [string, string][] = [
  ['#2f6f9f', '#5aa3d6'],
  ['#3f8a5f', '#6cc28b'],
  ['#9a6b2f', '#e0a04f'],
  ['#8a4a7a', '#c97fb6'],
  ['#8f4343', '#d47474'],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  let mode: 'single' | 'multiple' = 'multiple';
  let focusSelf = true;

  // One entry per country: regions match features by name and override the geo-level style.
  const regions = (g: Group): object[] =>
    g.countries.map((name, i) => {
      const [fill, hover] = PALETTE[i % PALETTE.length]!;
      return {
        name,
        itemStyle: {
          areaColor: fill,
          borderColor: '#f0f0f0',
          borderWidth: 1,
          // The first country of each group gets a dashed border.
          borderType: i === 0 ? 'dashed' : 'solid',
        },
        label: { show: true, color: '#fff', fontSize: 12, formatter: '{b}' },
        emphasis: { itemStyle: { areaColor: hover }, label: { color: '#fff' } },
        select: { itemStyle: { areaColor: '#f2b94c', borderColor: '#fff', borderWidth: 2 }, label: { color: '#111' } },
        tooltip: { formatter: `${name}: region ${i + 1} of ${g.countries.length}` },
      };
    });

  const view = (group: string): object => {
    const g = GROUPS[group]!;
    return { center: g.center, zoom: g.zoom, regions: regions(g) };
  };

  chart.setOption({
    tooltip: {},
    geo: {
      map: 'geo-regions-styling-world',
      roam: !ctx.preview,
      selectedMode: mode,
      // Style for every region without its own entry in `regions`.
      itemStyle: { areaColor: '#232833', borderColor: '#3a4150', borderWidth: 0.5 },
      emphasis: { focus: 'self', itemStyle: { areaColor: '#3a4150' }, label: { show: false } },
      // blur applies to the other regions while one is focused (focus: 'self').
      blur: { itemStyle: { opacity: 0.35 } },
      tooltip: { show: true },
      ...view('Nordic'),
    },
  });

  const show = (group: string): void => {
    chart.setOption({ geo: view(group) });
  };

  if (bar) {
    select(bar, 'Group', Object.keys(GROUPS), show);
    select(bar, 'selectedMode', ['multiple', 'single'], (v) => {
      mode = v as typeof mode;
      // geoUnSelect takes one region name at a time.
      for (const g of Object.values(GROUPS)) for (const name of g.countries) chart.dispatchAction({ type: 'geoUnSelect', geoIndex: 0, name });
      chart.setOption({ geo: { selectedMode: mode } });
    });
    select(bar, 'emphasis.focus', ['self', 'none'], (v) => {
      focusSelf = v === 'self';
      chart.setOption({ geo: { emphasis: { focus: focusSelf ? 'self' : 'none' } } });
    });
  }

  const keys = Object.keys(GROUPS);
  let i = 0;
  const stop = ctx.preview ? every(2400, () => show(keys[++i % keys.length]!)) : (): void => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
