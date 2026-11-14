// vchart example: FAQ: click events on pie labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: click events on pie labels",
  summary:
    "Labels do not respond to events by default. label.interactive: true switches it on and vchart.on('click', { level: 'model', type: 'label' }) listens to the label component; the readout shows the datum.",
  section: 'FAQ',
  tags: ['label.interactive','on','level model','pie'],
  docs: [
    'repo/docs/assets/faq/en/119- How to bind click events to pie chart labels.md',
    'repo/docs/assets/option/en/component/label.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
