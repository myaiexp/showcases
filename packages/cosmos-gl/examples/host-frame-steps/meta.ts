// cosmos-gl example: Host frame rate and steps per frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Host frame rate and steps per frame',
  summary:
    'With enableRenderLoop false the page decides how often cosmos.gl draws and how far the layout moves between draws. Sliders set the frame rate and the number of step() calls before each renderOneFrame(), so the layout can run slower or faster than the display.',
  section: 'Headless & shared device',
  tags: ['enableRenderLoop', 'step', 'renderOneFrame'],
  docs: ['repo/docs/host-embedding/README.md', 'repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
