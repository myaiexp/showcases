// Tippy.js example: a live readout of instance.state and instance.id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What a tip knows about itself',
  summary:
    'Every tip carries a small record of its own state: enabled, visible, shown, mounted, destroyed, plus an id. Hover the button, or use the buttons below, and watch the lamps change as the tip opens, closes, is switched off and is thrown away.',
  section: 'Tippy instance',
  tags: ['instance.state', 'instance.id', 'enable()', 'disable()', 'destroy()'],
  docs: ['repo/website/src/pages/v6/tippy-instance.mdx', 'repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
