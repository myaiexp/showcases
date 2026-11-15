// wfc's overlapping model: a character sample, a legend, symmetry and ground
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Wave function collapse from a sample',
  summary:
    "The wfc addon's overlapping model: a small sample of flowers drawn one character per pixel, a legend giving each character a colour, and a 24 × 24 grid filled so that it looks like the sample. ground keeps the sample's bottom row along the bottom, used with symmetry: 2 so only left-right flips count. Each seed grows a new bed of flowers.",
  section: 'Addons',
  tags: ["wfc", "@wfc", "sample", "legend", "symmetry", "ground"],
  docs: ["pages/css-doodle-com/addons.md", "repo/src/wfc/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
