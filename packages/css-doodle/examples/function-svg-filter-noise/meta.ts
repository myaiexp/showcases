// @svg-filter(frequency, scale) wobbles the edge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG filter: noise displacement",
  summary: "Two numbers make a noise displacement: how fine the noise is and how far it moves the pixels. The black disc gets a ragged edge. Variants change them, name them (scale=30) and add the octave and seed.",
  section: "SVG",
  tags: ["@svg-filter","filter","feTurbulence","feDisplacementMap"],
  docs: ["pages/css-doodle-com/reference/function-svg-filter.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
