// globe-gl example: Init: waitForGlobeReady
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Init: waitForGlobeReady",
  summary:
    "Two globes rebuilt side by side. With waitForGlobeReady (the default) the scene stays hidden until the globe image has loaded and onGlobeReady fires then; with false, the layers render at once and onGlobeReady fires immediately. The readout shows when each callback ran.",
  section: "Initialisation",
  tags: ["waitForGlobeReady", "onGlobeReady", "globeImageUrl"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
