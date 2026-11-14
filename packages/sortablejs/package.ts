// Sortable.js: reorderable drag-and-drop lists for any DOM element
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Sortable.js',
  npm: 'sortablejs',
  tagline: 'Reorderable drag-and-drop lists with animations and transfer between lists.',
  about:
    'Drag-and-drop reordering is deceptively hard to build well: pointer math, touch events, auto-scroll and animations all fight you. Sortable.js wraps drag-and-drop into one tiny, dependency-free library. Point it at a list element and items become reorderable instantly, with FLIP animations, drag handles and transfer between lists. It is the quiet workhorse behind countless Kanban boards and playlist editors.',
  category: 'Interaction',
  homepage: 'https://sortablejs.github.io/Sortable/',
  docsUrl: 'https://github.com/SortableJS/Sortable#readme',
  repo: 'https://github.com/SortableJS/Sortable',
  added: '2026-06-14',
  // The README's chapter order, with its long Options chapter split by theme, then the plugins.
  sections: [
    'Getting started',
    'Groups',
    'Dragging rules',
    'Swap zones and direction',
    'Looks and animation',
    'Fallback mode',
    'Nesting and empty lists',
    'Events',
    'Methods',
    'Store',
    'Static API',
    'MultiDrag',
    'Swap',
    'AutoScroll',
    'OnSpill',
    'Writing plugins',
  ],
});
