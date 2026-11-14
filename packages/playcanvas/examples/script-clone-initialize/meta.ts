// playcanvas example: Initialize on clones and disabled scripts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Initialize on clones and disabled scripts',
  summary:
    "A cloned entity keeps its script but initialize does not run until the clone joins the hierarchy, and a script created with enabled: false initializes the first time it is enabled. Each initialize makes the box pop to double size; the full view clones, adds and enables on buttons while the card spawns clones on a timer.",
  section: 'Scripting',
  tags: ['Script', 'initialize', 'Entity.clone', 'script.create', 'enabled', 'addChild'],
  docs: ['repo/docs/user-manual/scripting/script-lifecycle.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
