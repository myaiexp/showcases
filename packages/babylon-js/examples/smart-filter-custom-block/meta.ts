// babylon-js example: Smart Filter custom block from GLSL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Smart Filter custom block from GLSL",
  summary:
    "A ripple-and-tint block is written as annotated GLSL, imported with ImportCustomBlockDefinition and wrapped by CustomShaderBlock.Create, with sliders made from its uniforms. Edit the GLSL and recompile; the optimizer checks it.",
  section: "Smart Filters",
  tags: ['ImportCustomBlockDefinition', 'CustomShaderBlock', 'annotated GLSL', 'SmartFilterOptimizer', 'block properties'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/smartFilters/creatingNewBlocks.md',
    'repo/content/features/featuresDeepDive/smartFilters/howToUseSmartFilters.md',
    'repo/content/features/featuresDeepDive/smartFilters/howSmartFiltersWork.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
