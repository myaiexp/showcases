// Tippy.js: tooltips, popovers and dropdowns positioned by Popper
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Tippy.js',
  npm: 'tippy.js',
  tagline: 'Tooltips, popovers and dropdowns positioned by Popper to stay on-screen.',
  about:
    'Tippy.js makes the little boxes that pop out next to things: tooltips that explain a button, menus that drop down from it, cards that preview a link. One function call gives an element its tip, and Popper underneath keeps that tip on screen, flipping it to the other side when there is no room. Props choose when it opens (hover, focus, click, code), what it holds (text, HTML, live elements), how it looks and moves (themes, arrows, animations) and how it behaves (interactive, delayed, following the cursor). Addons group many tips into one, plugins add behaviours, and headless mode keeps the logic while you draw the box. The repo is archived; Floating UI is its successor.',
  category: 'Layout/UI',
  homepage: 'https://atomiks.github.io/tippyjs/',
  docsUrl: 'https://atomiks.github.io/tippyjs/v6/getting-started/',
  repo: 'https://github.com/atomiks/tippyjs',
  added: '2026-06-14',
  sections: [
    'Overview',
    'Getting started',
    'Constructor',
    'Customization',
    'Props: look',
    'Props: position',
    'Props: behaviour',
    'Props: lifecycle hooks',
    'HTML content',
    'Themes',
    'Animations',
    'Tippy instance',
    'Methods',
    'AJAX',
    'Accessibility',
    'Addons',
    'Plugins',
    'Headless Tippy',
    'Misc',
    'FAQ',
  ],
});
