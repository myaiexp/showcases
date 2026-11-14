// vchart example: FAQ: an action menu on a clicked bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: an action menu on a clicked bar",
  summary:
    "A click event on a bar carries the datum and the pointer position. A small DOM menu is placed there with actions: select the bar, drop it from the data, or show its datum in the readout. The card opens the menu bar by bar.",
  section: 'FAQ',
  tags: ['on click','datum','convertDatumToPosition','setSelected','updateData'],
  docs: [
    'repo/docs/assets/faq/en/172- Can the bar series listen to event callbacks.md',
    'repo/docs/assets/faq/en/199-Can users click on data points within the VChart to show a list of actions.md',
    'repo/docs/assets/api/en/API/event.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
