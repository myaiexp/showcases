// aframe example: light: a probe light from a cubemap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light: a probe light from a cubemap",
  summary: "A probe light lights everything without a direction, but colours each angle from a spherical harmonic computed from a cubemap. A cubemap of six coloured faces makes the sphere's sides pick up the colour of the face they point toward; the box turns to show it.",
  section: 'Components',
  tags: ["light", "probe", "envMap", "a-cubemap", "a-light", "intensity"],
  docs: ["repo/docs/components/light.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
