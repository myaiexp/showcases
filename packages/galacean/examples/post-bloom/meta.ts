// galacean example: Post-processing bloom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Post-processing bloom",
  summary: "A PostProcess component with a BloomEffect on an HDR camera whose enablePostProcess is on: the emissive shapes bleed a halo into the dark scene. The card switches the effect on and off; the full view has a checkbox.",
  section: "Post Process",
  tags: ['PostProcess','BloomEffect','addEffect','Camera.enablePostProcess','Camera.enableHDR'],
  docs: [
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
    'repo/docs/en/graphics/postProcess/effects.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
