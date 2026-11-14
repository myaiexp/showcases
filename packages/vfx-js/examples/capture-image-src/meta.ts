// swapping an image's src and capturing it again with vfx.update
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Swap an image with update(img)',
  summary:
    'An <img> becomes a texture once, after it loads. To show a different picture the example sets img.src, waits for it to decode, then calls vfx.update(img), which reloads the image\'s current URL into the texture.',
  section: 'How it Works',
  tags: ['vfx.update', 'img', 'src', 'capture'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md', 'repo/packages/vfx-js/src/vfx.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
