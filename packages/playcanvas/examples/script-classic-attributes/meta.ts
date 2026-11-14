// playcanvas example: Classic scripts and attributes.add
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Classic scripts and attributes.add',
  summary:
    "A classic script declared with pc.createScript(name, app) and attributes.add: a number, an enum, an rgba colour, an entity, a json group and a curve. Two instances get different values, and the log prints the attr:speed, attr:mode and attr events that fire when the full view changes them.",
  section: 'Scripting',
  tags: ['createScript', 'ScriptType', 'attributes.add', 'attr event', 'Curve', 'Color', 'Entity'],
  docs: [
    'repo/docs/user-manual/scripting/script-attributes/classic.md',
    'repo/docs/user-manual/scripting/getting-started.md',
    'repo/docs/user-manual/scripting/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
