// zephyr3d example: Caustics from a shadow-casting sun
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Caustics from a shadow-casting sun",
  summary:
    "causticsEnabled launches photons through the waves onto the bed: causticsDepth is where the pattern is sharpest, causticsRange how far it reaches, causticsIntensity its contrast. On WebGL2 causticsSceneDepth falls back to a plane at causticsDepth.",
  section: "Environment",
  tags: ['causticsEnabled', 'causticsDepth', 'causticsRange', 'causticsIntensity', 'causticsSceneDepth', 'causticsFadeDistance'],
  docs: ['repo/apps/doc/web/en/water.md', 'repo/apps/doc/web/en/backend-support.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
