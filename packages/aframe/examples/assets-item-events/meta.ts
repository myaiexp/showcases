// aframe example: a-asset-item events: progress, loaded and error
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'a-asset-item events: progress, loaded and error',
  summary:
    'One a-asset-item fetches a model and reports progress and loaded; another points at a file that cannot be fetched and reports error. The events happen before the scene starts, so they are collected from setup and printed on the board.',
  section: 'Core API',
  tags: ['a-asset-item', 'progress', 'loaded', 'error', 'loadedBytes', 'totalBytes'],
  docs: ['repo/docs/core/asset-management-system.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
