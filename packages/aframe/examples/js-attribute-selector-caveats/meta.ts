// aframe example: Caveats: attribute value selectors and mutation observers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Caveats: attribute value selectors and mutation observers',
  summary:
    'Changing a component with setAttribute does not rewrite the attribute text, so [material="color: red"] never matches and a MutationObserver sees no records, while [material] and getAttribute work. The board counts each.',
  section: 'Introduction',
  tags: ['attribute selector', 'MutationObserver', 'getAttribute', 'setAttribute'],
  docs: ['repo/docs/introduction/javascript-events-dom-apis.md', 'repo/docs/introduction/faq.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
