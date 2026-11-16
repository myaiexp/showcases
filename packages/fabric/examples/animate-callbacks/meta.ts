// fabric example: Animation: onStart, onChange, onComplete and delay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation: onStart, onChange, onComplete and delay',
  summary:
    'The three callbacks report the value, the value progress and the time progress; delay waits before the start and startValue overrides where it begins.',
  section: 'Animation',
  tags: ['onStart', 'onChange', 'onComplete', 'delay', 'startValue', 'easeOutBack'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/namespaces/util/functions/animate.md', 'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeOutBack.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
