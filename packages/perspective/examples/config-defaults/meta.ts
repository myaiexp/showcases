// Perspective example: Page-wide config defaults
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Page-wide config defaults",
  summary:
    "setColumnConfigDefaults() narrowed by plugin and column type, and setPluginConfigDefaults(), toggled one by one. save() leaves out values equal to a default, a column's own config still wins, and the defaults are removed on unmount.",
  section: "Plugin Settings",
  tags: ["setColumnConfigDefaults", "setPluginConfigDefaults", "getColumnConfigDefaults", "number_format", "date_format", "zebra_rows"],
  docs: ["repo/docs/md/how_to/javascript/config_defaults.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
