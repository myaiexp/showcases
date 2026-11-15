// embedding-atlas example: a scale.type widget lets the reader change the scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale type widget",
  summary:
    "The widgets list adds controls to a chart. { type: \"scale.type\", channel: \"x\" } gives the words histogram a linear/log switch for its x scale; the cards cycle a saved brush, the full view lets you operate the switch.",
  section: "Charts",
  tags: ['widgets', 'scale.type', 'channel', 'chartStates'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
