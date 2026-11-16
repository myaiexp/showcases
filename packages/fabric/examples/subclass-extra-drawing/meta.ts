// fabric example: Subclassing: extra drawing and a custom control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassing: extra drawing and a custom control',
  summary:
    'Gauge extends Rect: _render draws a level bar over the rectangle, and static createControls() adds a green + control whose mouseUpHandler raises the level. The object keeps its normal handles.',
  section: 'Subclassing',
  tags: ['Rect', '_render', 'createControls', 'Control', 'mouseUpHandler', 'controlsUtils'],
  docs: [
    'repo/src/content/docs/docs/Old docs/control-api.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/Control.md',
    'repo/src/content/docs/api/classes/Rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
