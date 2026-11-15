// leaflet example: Plugin pattern: a lazy getter instead of an init hook
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Plugin pattern: a lazy getter instead of an init hook",
  summary:
    `The plugin guide's alternative to addInitHook: a getter defined on the prototype that builds a per-instance helper the first time it is read, kept in a WeakMap. It costs nothing for lines that never use it, and it also works on lines created before the plugin loaded, which an init hook misses. Two routes exist before the plugin is installed and one after; the table shows which have the helper and which saw the hook.`,
  section: "Extending Leaflet",
  tags: ["Object.defineProperty", "WeakMap", "Class.addInitHook", "Polyline", "distanceTo", "getLatLngs"],
  docs: ["repo/PLUGIN-GUIDE.md", "repo/src/core/Class.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
