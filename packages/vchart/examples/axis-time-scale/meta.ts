// vchart example: Time axis with layers and a tick step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Time axis with layers and a tick step',
  summary:
    'A line over thirty days puts timestamps on a time axis. Each entry of layers sets a timeFormat and a tickStep in milliseconds: a selector moves the day ticks between automatic, daily, weekly and fortnightly, and a second layer adds month labels.',
  section: 'Concepts: Axes',
  tags: ['axes.type: time', 'timeFormat', 'timeFormatMode', 'tickStep', 'layers'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/time-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
