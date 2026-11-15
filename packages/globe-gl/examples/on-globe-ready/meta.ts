// globe-gl example: Globe: onGlobeReady
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Globe: onGlobeReady",
  summary:
    "onGlobeReady runs once the globe image has loaded and the globe is visible, which is the moment to start data that should be seen from its beginning: here, ripple rings from twelve cities. The readout times the callback.",
  section: "Globe Layer",
  tags: ["onGlobeReady", "ringsData"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
