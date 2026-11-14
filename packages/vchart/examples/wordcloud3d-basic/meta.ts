// vchart example: 3D: a wordCloud3d sphere
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D: a wordCloud3d sphere",
  summary:
    "type wordCloud3d lays the words out on a sphere; depth_3d sets its depth and word.style.keepDirIn3d false lets the words turn with it instead of facing the viewer. Pick a depth, or watch the card step through three.",
  section: "3D Charts",
  tags: ['wordCloud3d','registerWordCloud3dChart','depth_3d','keepDirIn3d','options3d'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/3d_WordCloud.md',
    'repo/docs/assets/option/en/series/word-cloud3d.md',
    'repo/docs/assets/option/en/chart/word-cloud3d.md',
    'repo/docs/assets/changelog/en/v2-upgrade-guide.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
