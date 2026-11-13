// babylon-js example: scene fog modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scene fog modes',
  summary:
    'A long row of columns fades into scene fog. Switch fogMode between none, exponential, exponential-squared and linear, and adjust fogDensity or the linear fogStart and fogEnd; the clear colour matches fogColor so distant geometry melts into the background.',
  section: 'Environment',
  tags: ['scene.fogMode', 'fogDensity', 'fogStart', 'fogEnd', 'fogColor', 'Scene.FOGMODE_EXP2'],
  docs: ['repo/content/features/featuresDeepDive/environment/environment_introduction.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
