// babylon-js example: Lens flares from a moving sun
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lens flares from a moving sun',
  summary:
    'A LensFlareSystem with a glowing sphere as its emitter and six LensFlare elements, each with a size, a position along the line from the sun through the screen centre, a colour and a canvas-drawn image. A pillar with isBlocker hides the flares when it passes in front of the sun.',
  section: 'Environment',
  tags: ['LensFlareSystem', 'LensFlare', 'isBlocker'],
  docs: ['repo/content/features/featuresDeepDive/environment/lenseFlare.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
