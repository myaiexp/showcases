// leafer-ui example: App: addLeafer, addAt, addBefore, addAfter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "App: addLeafer, addAt, addBefore, addAfter",
  summary:
    "An App keeps its layers in order, bottom to top. addLeafer() makes and adds a layer; add(), addAt(layer, index), addBefore(layer, before) and addAfter(layer, after) place or move one. Three overlapping layers change their stacking with each call.",
  section: "App & Engine",
  tags: ['App', 'addLeafer', 'add', 'addAt', 'addBefore', 'addAfter', 'Leafer'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/display/App.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
