// galacean example: Video element as a texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Video element as a texture",
  summary:
    "A hidden <video> plays a stream captured from a drawing canvas (no file, no network), and each frame setImageSource(video) copies the current video frame into a Dynamic, mipmap-free texture on a screen.",
  section: "Texture",
  tags: ['Texture2D.setImageSource', 'HTMLVideoElement', 'TextureUsage.Dynamic'],
  docs: [
    'repo/docs/en/graphics/texture/2d.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
