// aframe example: createElement, appendChild and removeChild
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'createElement, appendChild and removeChild',
  summary:
    'Builds boxes with document.createElement and appends them to the scene, which loads them asynchronously: hasLoaded is false at once and the loaded event and an init-time component run later. removeChild takes them away.',
  section: 'Introduction',
  tags: ['createElement', 'appendChild', 'removeChild', 'loaded', 'hasLoaded', 'setAttribute'],
  docs: ['repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
