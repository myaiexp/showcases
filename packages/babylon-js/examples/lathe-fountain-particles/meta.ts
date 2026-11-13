// babylon-js example: lathe fountain with particle spray
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lathe fountain with particle spray',
  summary:
    'A fountain turned from a profile of Vector3 points with CreateLathe, topped by a ParticleSystem whose sprite is drawn on a canvas. Click the fountain to stop and start the spray through onPointerObservable.',
  section: 'Introduction',
  tags: ['MeshBuilder.CreateLathe', 'ParticleSystem', 'emitRate', 'gravity', 'onPointerObservable'],
  docs: [
    'repo/content/features/introductionToFeatures/chap6/fountain.md',
    'repo/content/features/introductionToFeatures/chap6/particlespray.md',
    'repo/content/features/introductionToFeatures/chap6/onoff.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
