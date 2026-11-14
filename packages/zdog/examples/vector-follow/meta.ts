// Zdog example: a bee that eases towards a drifting flower with Vector lerp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector follow',
  summary:
    'A bee chases a flower that drifts around, easing in fast when far and slowly when close, with a live distance readout. Each frame vector.lerp moves the bee a fraction of the way, and copy(), subtract() and magnitude() measure the gap. The ease slider changes how eager the bee is.',
  section: 'API: Vector',
  tags: ['Vector', 'lerp', 'subtract', 'magnitude', 'copy'],
  docs: ['repo/modules/docs/api-vector.hbs', 'repo/modules/docs/vector-objects.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
