// zephyr3d example: Render to a texture with a frame buffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render to a texture with a frame buffer',
  summary:
    'createFrameBuffer wraps a colour and a depth texture; setFramebuffer redirects drawing into it, pushDeviceStates and popDeviceStates restore the rest, and the colour texture is then sampled by a quad on screen.',
  section: 'Device API',
  tags: ['createFrameBuffer', 'setFramebuffer', 'pushDeviceStates', 'popDeviceStates', 'createTexture2D', 'd24s8', 'setTexture'],
  docs: ['repo/apps/doc/web/en/devicesamples.md', 'repo/apps/doc/web/en/drawcall.md', 'repo/apps/doc/web/en/texture.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
