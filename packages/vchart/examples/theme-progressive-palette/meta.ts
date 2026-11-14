// vchart example: Theme: progressive palette by group count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: progressive palette by group count",
  summary:
    "A progressive data palette holds several colour sets and applies one by maxDomainLength or an isAvailable callback. Adding pie slices moves the chart from the 3-colour set to the 5-colour set and on to the full one.",
  section: "Theme",
  tags: ['ProgressiveDataScheme','maxDomainLength','isAvailable','colorScheme'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Color_Theme.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
