// format on dates; formatType makes band and point scales read their values as times
import type { Spec } from 'vega';
import { cycle } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const day = 86400000;
const start = Date.UTC(2024, 2, 1);

const spec: Spec = {
  width: 400,
  height: 80,
  padding: 8,
  signals: [{ name: 'fmt', value: '%b %d' }],
  scales: [
    { name: 'when', type: 'time', domain: [start, start + 120 * day], range: 'width' },
    // A band scale over raw millisecond timestamps: without formatType the labels are big numbers
    { name: 'days', type: 'band', domain: Array.from({ length: 6 }, (_, i) => start + i * 7 * day), range: 'width', padding: 0.1 },
  ],
  axes: [
    { orient: 'bottom', scale: 'when', format: { signal: 'fmt' }, tickCount: 6, labelOverlap: true, title: 'time scale, format from a signal' },
    { orient: 'top', scale: 'days', formatType: 'utc', format: '%a %e %b', labelOverlap: true, title: 'band scale, formatType utc' },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycle(
    stage,
    view,
    'fmt',
    ['%b %d', '%B %Y', '%A', { year: '%Y', month: '%B', date: '%e' }, '%d/%m/%y'],
    1400,
  );
});
