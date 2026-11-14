// babylon-js example: Smart Filter runtime inputs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Smart Filter runtime inputs",
  summary:
    "A kaleidoscope, desaturate and exposure SmartFilter whose float inputs and disabled switches are InputBlock runtimeValues, changed every frame with no rebuild, plus smartFilter.resize on canvas resize.",
  section: "Smart Filters",
  tags: ['InputBlock', 'runtimeValue', 'KaleidoscopeBlock', 'DesaturateBlock', 'ExposureBlock', 'disabled', 'SmartFilterRuntime'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/smartFilters/howSmartFiltersWork.md',
    'repo/content/features/featuresDeepDive/smartFilters/howToUseSmartFilters.md',
    'repo/content/features/featuresDeepDive/smartFilters/creatingNewBlocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
