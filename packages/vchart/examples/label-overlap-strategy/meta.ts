// vchart example: Label overlap strategies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label overlap strategies',
  summary:
    'Labels inside a stacked bar collide in thin segments. A selector compares the default avoidance, overlap false, a position strategy and the bound plus moveY chain from the guide, all set through label.overlap.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['label.overlap', 'strategy', 'position', 'bound', 'moveY', 'hideOnHit'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Series/Label.md', 'repo/docs/assets/option/en/component/label.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
