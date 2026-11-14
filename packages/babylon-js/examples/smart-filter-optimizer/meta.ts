// babylon-js example: Smart Filter graph and optimizer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Smart Filter graph and optimizer",
  summary:
    "A SmartFilter graph of black and white, posterize, pixelate and contrast blocks over a generated picture, with animated float inputs. Toggling SmartFilterOptimizer and RenderTargetGenerator shows the command buffer shrink from four draw calls to one.",
  section: "Smart Filters",
  tags: ['SmartFilter', 'InputBlock', 'SmartFilterOptimizer', 'RenderTargetGenerator', 'createRuntimeAsync', 'smart-filters-blocks'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/smartFilters/introductionToSmartFilters.md',
    'repo/content/features/featuresDeepDive/smartFilters/howToUseSmartFilters.md',
    'repo/content/features/featuresDeepDive/smartFilters/howSmartFiltersWork.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
