// motion example: Photo that reveals with a soft-edged wipe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Photo that reveals with a soft-edged wipe',
  summary: 'Switch between two photo looks and the new one is revealed by a feathered edge sweeping across, like a photo-editor compare. Masks cannot normally animate, so two registered CSS properties drive the gradient stops.',
  section: 'animateView',
  tags: ['animateView', 'add', 'class', 'enter', 'CSS.registerProperty', 'mask-image'],
  docs: ['pages/motion-dev/docs/animate-view.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
