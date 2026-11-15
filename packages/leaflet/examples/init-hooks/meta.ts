// leaflet example: addInitHook and callInitHooks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "addInitHook and callInitHooks",
  summary:
    `Constructor hooks added with addInitHook run when an instance is created. For a class of your own that extends a Leaflet class they run before its constructor body, so the tag set in the body is not there yet; marking the class with static initHooks and ending its constructor with callInitHooks makes the hooks run last. Hooks on a parent run first, and a hook can name a method to call with arguments. Each marker's tooltip shows what its hook saw.`,
  section: "Extending Leaflet",
  tags: ["Class.addInitHook", "Class.callInitHooks", "static initHooks", "Marker", "bindTooltip"],
  docs: ["repo/src/core/Class.js", "repo/docs/examples/extending-1-classes/index.md", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
