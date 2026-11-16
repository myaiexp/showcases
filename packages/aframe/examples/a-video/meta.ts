// aframe example: <a-video>: a video texture sized to its aspect ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-video>: a video texture sized to its aspect ratio',
  summary:
    '<a-video> is a plane whose material src is a <video>. One 16:9 video drives three of them: 16 by 9 metres far away, a small 3 by 1.6875 that keeps the ratio, and a 1 by 1 default that squeezes it, the distortion the docs\' fine-tuning section warns about. The video is a canvas stream, muted.',
  section: 'Primitives',
  tags: ['a-video', 'src', 'width', 'height', 'video texture', 'aspect ratio'],
  docs: ['repo/docs/primitives/a-video.md', 'repo/docs/components/material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
