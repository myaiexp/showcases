// aframe example: 360 gallery guide: an a-sky with a panorama from a-assets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '360 gallery guide: an a-sky with a panorama from a-assets',
  summary:
    'The guide\'s skeleton: several images preloaded in <a-assets> and an <a-sky> with radius 10 showing one as the 360-degree background. Pick a panorama with the select, or drag to look around.',
  section: 'Guides',
  tags: ['a-sky', 'a-assets', 'img', 'src', '360 image', 'a-camera'],
  docs: ['repo/docs/guides/building-a-360-image-gallery.md', 'repo/docs/primitives/a-sky.md', 'repo/docs/core/asset-management-system.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
