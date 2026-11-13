// Perspective example: switching bundled themes with restore({ theme })
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bundled themes',
  summary:
    'themes.css bundles every default theme. getThemes() lists what the viewer detected, restore({ theme }) switches, and resetThemes() narrows or re-detects the list the settings panel offers.',
  section: 'Theming',
  tags: ['theme', 'themes.css', 'getThemes', 'resetThemes', 'restore'],
  docs: ['repo/docs/md/how_to/javascript/theming.md', 'repo/docs/md/how_to/javascript/viewer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
