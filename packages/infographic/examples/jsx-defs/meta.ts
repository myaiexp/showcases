// AntV Infographic example: JSX primitive: Defs for gradients and filters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX primitive: Defs for gradients and filters',
  summary:
    'Defs collects reusable definitions, and shapes reference them with url(#id). The steps use a linearGradient, a radialGradient and a drop-shadow filter; renderSVG moves the definitions into one <defs> at the top of the output, which the panel shows.',
  section: 'JSX primitives',
  tags: ['Defs', 'linearGradient', 'radialGradient', 'filter', 'url(#id)', 'renderSVG'],
  docs: [
    'repo/site/src/content/reference/primitive-nodes.en.md',
    'repo/site/src/content/reference/jsx.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
