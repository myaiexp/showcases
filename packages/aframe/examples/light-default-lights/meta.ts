// aframe example: light: the default lights and defaultLightsEnabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light: the default lights and defaultLightsEnabled",
  summary: "Without any light, A-Frame injects an ambient and a directional light marked data-aframe-default-light. Adding a light removes them; light=\"defaultLightsEnabled: false\" on the scene keeps them from being added, a setting read once at load. The button adds a dim point light (the card does it after a few seconds), and the read-out counts the default lights in the DOM.",
  section: 'Components',
  tags: ["light", "defaultLightsEnabled", "data-aframe-default-light", "ambient", "directional"],
  docs: ["repo/docs/components/light.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
