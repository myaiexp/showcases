// playcanvas example: A tracking camera in postUpdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A tracking camera in postUpdate',
  summary:
    "A camera script that aims at a moving player does it in postUpdate, which runs after every script's update, so it is never a frame behind. Switching the aim to update lags the camera by one frame because its script component runs first; the full view reads the angular error off the camera.",
  section: 'Scripting',
  tags: ['Script', 'postUpdate', 'update', 'lookAt', 'CameraComponent', 'ScriptComponent'],
  docs: ['repo/docs/user-manual/scripting/script-lifecycle.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
