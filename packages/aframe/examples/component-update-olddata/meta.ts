// aframe example: update(oldData): diff against this.data for granular changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'update(oldData): diff against this.data for granular changes',
  summary:
    'A gem component compares oldData with this.data using AFRAME.utils.diff and only rebuilds the geometry or recolours the material for the properties that changed. The board lists which ones.',
  section: 'Core API',
  tags: ['update', 'oldData', 'AFRAME.utils.diff', 'this.data'],
  docs: ['repo/docs/core/component.md', 'repo/docs/core/utils.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
