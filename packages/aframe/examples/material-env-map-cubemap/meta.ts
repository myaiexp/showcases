// aframe example: material: envMap from an <a-cubemap>
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: envMap from an <a-cubemap>",
  summary: "Six labelled faces in an <a-cubemap> become the environment a glossy sphere and a box reflect. roughness: 0 gives a mirror; a slider raises roughness to blur the reflection, and metalness decides how much of the colour is the reflection.",
  section: 'Components',
  tags: ["material", "envMap", "a-cubemap", "roughness", "metalness", "reflection"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
