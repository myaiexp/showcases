// Perspective example: Plugin render limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Plugin render limits",
  summary:
    "A treemap of up to 576 leaves under different max_cells values set through getPlugin(). Below the limit the plugin asks before rendering; raise it and the same restore() draws at once.",
  section: "Plugin Settings",
  tags: ["getPlugin", "max_cells", "max_columns", "Treemap", "render limits"],
  docs: ["repo/docs/md/how_to/javascript/plugin_settings.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
