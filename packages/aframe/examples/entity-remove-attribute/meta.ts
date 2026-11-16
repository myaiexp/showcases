// aframe example: removeAttribute: detach a component or reset one property
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'removeAttribute: detach a component or reset one property',
  summary:
    'removeAttribute(\'geometry\') detaches the component and calls its remove handler; removeAttribute(\'material\', \'color\') resets just that property to its default. Both results are logged.',
  section: 'Core API',
  tags: ['removeAttribute', 'geometry', 'material', 'components'],
  docs: ['repo/docs/core/entity.md', 'repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
