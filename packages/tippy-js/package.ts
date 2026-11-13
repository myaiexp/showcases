// Tippy.js: tooltips, popovers and dropdowns positioned by Popper
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Tippy.js',
  npm: 'tippy.js',
  tagline: 'Tooltips, popovers and dropdowns positioned by Popper to stay on-screen.',
  about:
    "Positioning a floating element that never clips off-screen is a genuinely hard problem. Tippy.js sits on top of Popper and solves it: tooltips automatically flip to the opposite side when there is no room and shift to stay in the viewport. Beyond plain tooltips it does interactive popovers, click-triggered dropdowns, custom HTML, themes and animations, all from a single function call. It is the fastest path from \"I need a tooltip\" to something that feels polished.",
  category: 'Layout/UI',
  homepage: 'https://atomiks.github.io/tippyjs/',
  docsUrl: 'https://atomiks.github.io/tippyjs/v6/getting-started/',
  repo: 'https://github.com/atomiks/tippyjs',
  added: '2026-06-14',
  sections: ['Basics'],
});
