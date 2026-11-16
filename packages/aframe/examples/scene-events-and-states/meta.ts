// aframe example: Scene events and the vr-mode state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scene events and the vr-mode state',
  summary:
    'Logs when the scene emits loaded and renderstart, listens for enter-vr and exit-vr, and shows is(\'vr-mode\'). In the full view a button calls enterVR(), which here is refused because there is no headset.',
  section: 'Core API',
  tags: ['loaded', 'renderstart', 'enter-vr', 'exit-vr', 'vr-mode', 'enterVR', 'is'],
  docs: ['repo/docs/core/scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
