// globe-gl example: Init: rendererConfig
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Init: rendererConfig",
  summary:
    "The rendererConfig option goes straight to Three's WebGLRenderer. The left globe is built with antialias: false and shows stair-stepped column edges; the right one keeps the default antialias: true. Both cameras move together.",
  section: "Initialisation",
  tags: ["rendererConfig", "antialias", "new Globe", "controls"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
