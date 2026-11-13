// echarts example: Rippling hubs on a geo map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rippling hubs on a geo map',
  summary:
    'The largest cities ripple on a geo map while smaller ones are plain scatter points. Switch showEffectOn between render and emphasis, and change the ripple number and period.',
  section: 'Option: series.effectScatter',
  tags: ['effectScatter', 'showEffectOn', 'rippleEffect', 'geo', 'scatter'],
  docs: [
    'repo/en/option/series/effectScatter.md',
    'repo/en/option/series/scatter.md',
    'repo/en/option/component/geo.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/option/partial/coord-sys.md',
    'repo/en/api/echarts.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
