// fabric example: Controls: A handle that edits opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: A handle that edits opacity',
  summary:
    "A custom Control whose positionHandler places a knob along the right edge according to object.opacity and whose actionHandler writes opacity back from the pointer, mapped into the object's own plane; render() draws a pie of the value.",
  section: 'Controls',
  tags: ['Control','positionHandler','actionHandler','render','opacity','sendPointToPlane'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/classes/Control.md', 'repo/src/content/docs/api/namespaces/util/functions/sendPointToPlane.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
