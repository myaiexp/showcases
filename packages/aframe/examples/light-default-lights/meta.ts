// aframe example: light: the default lights and defaultLightsEnabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light: the default lights and defaultLightsEnabled",
  summary: "Without any light, A-Frame injects an ambient and a directional light marked data-aframe-default-light. Adding a light removes them, and light=defaultLightsEnabled: false on the scene turns them off by hand. Buttons add a dim point light and toggle the setting, and a read-out counts the default lights in the DOM.",
  section: 'Components',
  tags: ["light", "defaultLightsEnabled", "data-aframe-default-light", "ambient", "directional"],
  docs: ["repo/docs/components/light.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
