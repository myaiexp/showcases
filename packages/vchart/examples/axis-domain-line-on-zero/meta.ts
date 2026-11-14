// vchart example: Domain line on the zero tick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Domain line on the zero tick',
  summary:
    'With negative values, the x axis line normally sits at the bottom. domainLine.onZero moves it to the zero tick of the y axis. A switch, a width slider and a colour selector change the line live.',
  section: 'Concepts: Axes',
  tags: ['domainLine.onZero', 'domainLine.style', 'negative values'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/cartesian-axis.md', 'repo/docs/assets/option/en/component/axis-common/axis-domain-line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
