// gsap example: SplitText.create, split, revert, kill, isSplit, arrays and vars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SplitText instance API',
  summary:
    'One paragraph under a SplitText instance: split it into chars, words and lines (optionally masked), watch the arrays and isSplit change, then revert() or kill(). Narrowing the box re-splits the lines through autoSplit and onSplit.',
  section: 'SplitText',
  tags: ['SplitText', 'split', 'revert', 'kill', 'isSplit', 'chars', 'words', 'lines', 'masks', 'autoSplit', 'onSplit'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/SplitText/static-create-.md',
    'pages/gsap-com/docs/v3/Plugins/SplitText/split-.md',
    'pages/gsap-com/docs/v3/Plugins/SplitText/revert-.md',
    'pages/gsap-com/docs/v3/Plugins/SplitText/kill-.md',
    'pages/gsap-com/docs/v3/Plugins/SplitText/isSplit.md',
    'pages/gsap-com/docs/v3/Plugins/SplitText/lines.md',
    'pages/gsap-com/docs/v3/Plugins/SplitText/masks.md',
    'pages/gsap-com/docs/v3/Plugins/SplitText/vars.md',
    'pages/gsap-com/docs/v3/Plugins/SplitText/chars.md',
    'pages/gsap-com/docs/v3/Plugins/SplitText/words.md',
    'pages/gsap-com/docs/v3/Plugins/SplitText.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
