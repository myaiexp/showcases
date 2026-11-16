// leafer-ui example: forceUpdate: bounds, surface and stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "forceUpdate: bounds, surface and stroke",
  summary: "Editing a Path's numeric path array in place changes nothing by itself. forceUpdate() re-measures and redraws, 'surface' only redraws (the measured width stays stale), 'stroke' refreshes stroke bounds.",
  section: "Element advanced",
  tags: ["forceUpdate", "Path", "path", "IForceUpdateType"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/forceUpdate.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
