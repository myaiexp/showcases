// fabric example: SVG: parsing linear and radial gradients
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: parsing linear and radial gradients',
  summary:
    'The parser reads linearGradient and radialGradient elements from defs and gives each shape a fabric Gradient as its fill. The browser picture and the canvas are drawn from the same text.',
  section: 'SVG',
  tags: ['loadSVGFromString', 'Gradient', 'linearGradient', 'radialGradient'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/functions/loadSVGFromString.md',
    'repo/src/content/docs/api/namespaces/util/functions/groupSVGElements.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
