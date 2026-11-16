// leafer-ui: a canvas UI scene graph with interaction, animation, an editor and auto layout
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Leafer UI',
  npm: 'leafer-ui',
  tagline: 'A canvas scene graph for UI: elements, styles, events, animation, a graphic editor and auto layout.',
  about:
    'Leafer UI draws a tree of elements (rects, paths, text, images, groups, boxes, frames) on an HTML5 canvas and keeps it interactive: hit testing, pointer, drag, zoom and key events bubble through the tree like the DOM, and only changed areas are re-rendered. Styles cover gradients, image fills, shadows, masks, erasers and blend modes. Official plugins add animation and transitions, interactive states, motion paths, a graphic editor with inner editing, flex-style auto layout, scrolling viewports, arrows, connectors and export. These examples run the npm build (2.3.4) with its @leafer-in plugins.',
  category: 'Graphics',
  homepage: 'https://www.leaferjs.com/ui/en/',
  docsUrl: 'https://www.leaferjs.com/ui/en/guide/',
  repo: 'https://github.com/leaferjs/leafer-ui',
  added: '2026-11-16',
  sections: [
    'Basics',
    'Fun',
    'Advanced',
    'App & engine config',
    'App & Engine',
    'Group elements',
    'Elements',
    'Custom elements',
    'Data',
    'Layout',
    'Appearance',
    'Interaction',
    'Element animation',
    'Element advanced',
    'Events',
    'Utilities',
    'Graphic editor',
    'Auto layout',
    'Animate plugin',
    'Official plugins',
  ],
});
