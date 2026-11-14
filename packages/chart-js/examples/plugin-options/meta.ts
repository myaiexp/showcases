// Chart.js example: A plugin with options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A plugin with options',
  summary:
    "A value-label plugin whose settings come from its defaults and from options.plugins.<id>, changeable live. Setting the plugin's options to false turns it off for that chart.",
  section: 'Developers',
  tags: ['plugin', 'defaults', 'options.plugins', 'afterDatasetsDraw'],
  docs: ['repo/docs/developers/plugins.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
