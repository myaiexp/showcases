// leafer-ui example: Config: contextSettings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: contextSettings",
  summary:
    "contextSettings is handed to canvas.getContext(\"2d\", settings): alpha, colorSpace, desynchronized, willReadFrequently. The readout prints what the browser reports through getContextAttributes(); each change rebuilds the engine.",
  section: "App & engine config",
  tags: ['Leafer', 'contextSettings', 'alpha', 'colorSpace', 'willReadFrequently'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/canvas.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
