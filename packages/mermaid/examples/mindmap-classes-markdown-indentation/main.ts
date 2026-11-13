// Mindmap: ::: classes styled by this example's CSS, Markdown string labels, and uneven indentation
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import './style.css';

// ::: after a node adds CSS classes separated by spaces. The classes come from the page, here
// style.css: urgent paints the node red with white text and large raises the font size.
const CLASSES = `mindmap
    Root
        A[A]
        :::urgent large
        B(B)
        :::calm
        C`;

// A class on a deeper branch: the node carries the class but its children keep the section colours.
const BRANCH = `mindmap
  root((Release))
    Blockers
      Failing build
      :::urgent large
      Missing sign-off
      :::urgent
    Nice to have
      Dark mode
      :::calm
      Changelog
    Done
      Tagged`;

// Markdown strings: "\`...\`" gives **bold**, *italic*, automatic wrapping and real newlines.
const MARKDOWN = `mindmap
    id1["\`**Root** with
a second line
Unicode works too: 🤓\`"]
      id2["\`The dog in **the** hog... a *very long text* that wraps to a new line\`"]
      id3[Regular labels still works]`;

// C is indented less than B but more than A. Mermaid picks A (the first smaller indent) as its
// parent, so B and C end up as siblings.
const INDENT = `mindmap
Root
    A
        B
      C`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Classes', code: CLASSES },
      { label: 'Classes on a branch', code: BRANCH },
      { label: 'Markdown strings', code: MARKDOWN },
      { label: 'Unclear indentation', code: INDENT },
    ],
  });

export default mount;
