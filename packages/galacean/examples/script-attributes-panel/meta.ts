// galacean example: Script: exposed script parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: exposed script parameters",
  summary:
    "The docs expose a script's fields as Number, Slider, Boolean, Vector3, Color, Select and Textarea parameters. Here a tiny schema builds the same kinds of controls for one rotating script, with the field limits (min, max, options) from the docs.",
  section: "Script",
  tags: ['Script', 'Vector3', 'Color', 'rotate'],
  docs: [
    'repo/docs/en/script/attributes.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
