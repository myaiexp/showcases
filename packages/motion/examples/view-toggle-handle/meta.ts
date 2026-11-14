// motion example: Dark-mode switch that recolours the page
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dark-mode switch that recolours the page',
  summary: 'Flip the switch and the whole page crossfades into its dark theme while the handle glides across. The handle is picked out with a single .add(), so the browser animates its move without any layout code of your own.',
  section: 'animateView',
  tags: ['animateView', 'add', 'new', 'spring', 'theme'],
  docs: ['pages/motion-dev/docs/animate-view.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
