// vchart example: Player controller, slider and direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Player controller, slider and direction',
  summary:
    'The parts of a Player: controller.start / pause / backward / forward with order, position, space and style, and the slider\'s railStyle, trackStyle and handlerStyle; orient moves it around the chart and alternate reverses the direction at the ends.',
  section: 'Concepts: Components',
  tags: ['player', 'controller', 'slider', 'orient', 'alternate', 'order', 'position'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Player.md',
    'repo/docs/assets/option/en/component/player.md',
    'repo/docs/assets/option/en/component/player-common/player-controller-common.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
