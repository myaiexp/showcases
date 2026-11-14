// Tippy.js example: how much slack the pointer gets on its way into an interactive tip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Room to reach the menu',
  summary:
    'A menu that hangs a little way below its button leaves a gap the pointer must cross. A narrow safety margin closes the menu on a clumsy move; a wide one forgives it. The dashed outline shows each menu\'s invisible margin.',
  section: 'Props: behaviour',
  tags: ['interactive', 'interactiveBorder', 'interactiveDebounce', 'offset', 'setProps'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/index.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
