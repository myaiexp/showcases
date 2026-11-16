// aframe example: background: a colour or a transparent canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "background: a colour or a transparent canvas",
  summary: "The background component sets the scene's clear colour without building a sky sphere. A colour picker changes it, and transparent: true ignores colour altogether so the page behind the canvas, here a CSS gradient, shows through.",
  section: 'Components',
  tags: ["background", "color", "transparent", "a-scene"],
  docs: ["repo/docs/components/background.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
