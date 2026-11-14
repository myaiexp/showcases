// playcanvas example: Reacting to attribute changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reacting to attribute changes',
  summary:
    "A getter and setter pair turns brightness into an attribute that updates a light and its emissive colour whenever it is assigned. ESM scripts fire no attr events, so a small watch helper wraps the spinner's speed member and fires its own changed:speed event, which the log prints.",
  section: 'Scripting',
  tags: ['Script', '@attribute', 'getter', 'setter', 'fire', 'on', 'LightComponent'],
  docs: [
    'repo/docs/user-manual/scripting/script-attributes/esm.md',
    'repo/docs/user-manual/scripting/migration-guide.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
