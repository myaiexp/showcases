// vchart example: Region stackInverse and stackSort
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Region stackInverse and stackSort",
  summary:
    "A stacked bar draws its series in data order. region.stackInverse reverses that order and region.stackSort orders each stack by value, so the largest segment sits first. Selects toggle both.",
  section: "Option: Common",
  tags: ["region","stackInverse","stackSort","stack"],
  docs: [
    'repo/docs/assets/option/en/common/region.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
