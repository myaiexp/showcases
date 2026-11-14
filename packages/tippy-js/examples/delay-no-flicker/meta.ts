// Tippy.js example: a short show delay stops tips flashing as the pointer sweeps past
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'No flicker when sweeping',
  summary:
    'Two identical editor toolbars. Sweep the pointer across the top one and every button flashes its tip as you pass. The bottom one waits a moment first, so only the button you actually stop on shows its tip.',
  section: 'Props: behaviour',
  tags: ['delay'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/index.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
