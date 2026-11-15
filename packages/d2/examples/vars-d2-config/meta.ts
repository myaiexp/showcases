// d2 example: d2-config: render options in the source
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'd2-config: render options in the source',
  summary:
    '`vars.d2-config` carries render options inside the file: here `theme-id`, `dark-theme-id`, `pad`, `center`, `sketch` and `layout-engine`. This example passes no compile option except what the playground adds for pad, so the file alone decides how it renders.',
  section: 'Variables',
  tags: ['vars', 'd2-config', 'theme', 'sketch', 'layout'],
  docs: ['repo/docs/tour/vars.md', 'repo/static/d2/vars-config.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
