// babylon-js example: Spatial sound on a moving mesh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Spatial sound on a moving mesh',
  summary:
    'A looping sound created with spatialEnabled and attached to an orbiting mesh with spatial.attach, while audioEngine.listener is attached to the camera. Sliders set the distance and panning models, rolloff, and the directional cone angles and outer volume.',
  section: 'Audio',
  tags: ['spatial.attach', 'listener', 'distanceModel', 'panningModel', 'coneOuterAngle'],
  docs: ['repo/content/features/featuresDeepDive/audio/v2/playingSoundsMusic.md'],
  provenance: 'pure',
  audio: true,
  added: '2026-11-13',
});
