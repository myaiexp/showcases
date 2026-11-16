// aframe example: <a-cubemap>: six images as an environment map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-cubemap>: six images as an environment map',
  summary:
    '<a-cubemap> inside <a-assets> builds a cube texture from its six <img> children (+x, -x, +y, -y, +z, -z). A sphere with envMap pointing at it, metalness 1 and roughness 0 mirrors the labelled faces; a rougher spinning box blurs the same reflection.',
  section: 'Primitives',
  tags: ['a-cubemap', 'envMap', 'metalness', 'roughness', 'a-assets'],
  docs: ['repo/docs/primitives/a-cubemap.md', 'repo/docs/components/material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
