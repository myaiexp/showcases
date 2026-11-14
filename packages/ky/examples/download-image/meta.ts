// ky example: download an image with progress, show it from a Blob
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Download a picture with progress',
  summary:
    'Pictures can be big, and an empty gap where one will appear feels broken. onDownloadProgress fills a bar while the bytes arrive, and .blob() then hands over the finished file, which URL.createObjectURL turns into something an <img> can show.',
  section: 'Progress',
  tags: ['onDownloadProgress', '.blob()', 'createObjectURL', 'image', 'canvas'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
