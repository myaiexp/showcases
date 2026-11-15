// galacean example: Custom pass before or after Uber
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom pass before or after Uber",
  summary: "PostProcessPassEvent decides where a custom pass sits: AfterUber (the default) greys out the finished image, BeforeUber greys the scene first so only the bloom, added afterwards, keeps its tint.",
  section: "Post Process",
  tags: ['PostProcessPass.event','PostProcessPassEvent','BloomEffect'],
  docs: [
    'repo/docs/en/graphics/postProcess/customPostProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
