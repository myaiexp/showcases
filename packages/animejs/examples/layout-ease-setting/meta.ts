// Layout example: the ease setting and overriding it per update
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout ease setting and per-update override',
  summary: 'A layout created with ease outExpo toggles between row and column. Buttons run the update with the layout default, with a spring(), or with the library default inOut(3.5) passed in update().',
  section: 'Layout',
  tags: ['createLayout', 'ease', 'spring', 'update'],
  docs: [
    'pages/animejs-com/documentation/layout/layout-settings/ease.md',
    'pages/animejs-com/documentation/layout/layout-settings.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
