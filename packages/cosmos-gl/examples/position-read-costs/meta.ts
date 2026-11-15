// cosmos-gl example: Position reads at three costs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Position reads at three costs',
  summary:
    'A headless layout steps on every frame while the page reads its positions three ways: getPointPositionTexture() hands over the live GPU texture with no copy, getPointPositionsAsync() copies without stalling, and getPointPositionsArray() waits for the GPU. The caption shows how long each call blocks the page.',
  section: 'Headless & shared device',
  tags: ['getPointPositionTexture', 'getPointPositionsAsync', 'getPointPositionsArray', 'PointPositionTexture', 'step'],
  docs: [
    'repo/docs/host-embedding/README.md',
    'repo/src/stories/configuration.mdx',
    'repo/src/stories/api-reference.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
