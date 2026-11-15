// globe-gl example: Paths: resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Paths: resolution",
  summary:
    "Two globes with the same widely spaced points. At pathResolution 60 the segments stay straight chords under the surface; at the default 2 they are split to follow the sphere. A slider changes the left pane.",
  section: "Paths Layer",
  tags: ['pathResolution', 'pathsData'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
