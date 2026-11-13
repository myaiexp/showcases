// babylon-js example: Background material ground
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Background material ground',
  summary:
    'An unlit BackgroundMaterial on the ground with a canvas-painted, alpha-faded diffuse texture. It still receives the sphere’s shadow, lightened by shadowLevel or alone with shadowOnly; a MirrorTexture reflects the sphere through reflection fresnel; and useRGBColor off tints the texture with primaryColor.',
  section: 'Environment',
  tags: ['BackgroundMaterial', 'shadowLevel', 'opacityFresnel', 'reflectionFresnel', 'primaryColor'],
  docs: ['repo/content/features/featuresDeepDive/environment/backgroundMaterial.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
