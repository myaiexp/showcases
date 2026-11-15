// css-doodle example: Column ratio with easing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Column ratio with easing',
  summary:
    'The easing argument works on column ratios too: @Xx(ease-out, *100%) shrinks twelve circles quickly at first, and @xX fades them in. The circles are centered with @place.',
  section: 'Cell functions',
  tags: ['@xX', '@Xx', '@size', 'easing'],
  docs: [
    'pages/css-doodle-com/reference/function-xx.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
