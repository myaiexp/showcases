// vega example: Extensibility: Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensibility: Custom Scale Type',
  summary:
    'A cube-root scale type registered with vega.scale and used in a spec by name, shown beside the built-in linear and sqrt scales: eleven values and a moving probe land at three different positions.',
  section: 'Extensibility',
  tags: ['extensibility.scale', 'scale.type', 'signal.bind'],
  docs: ['repo/docs/docs/api/extensibility.md', 'repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
