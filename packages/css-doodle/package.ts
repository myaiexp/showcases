// css-doodle: a web component that draws generative patterns from CSS rules for a grid
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'css-doodle',
  npm: 'css-doodle',
  tagline: 'A web component for generative art: write the CSS of one cell, and every cell of a grid gets its own value.',
  about:
    'A <css-doodle> element holds a grid of cells and CSS for one of them. css-doodle evaluates that CSS once per cell and emits plain CSS, so functions such as @r (a random number), @p (a random pick) and @i (the cell index) give each cell a different value. Selectors pick cells by index, row, column or an expression; @svg, @shape and @tile draw shapes inside the CSS; @doodle nests a doodle as an image; and @pattern, @shaders and @scene compile small languages to GPU shaders. The same seed always draws the same picture.',
  category: 'Graphics',
  homepage: 'https://css-doodle.com',
  docsUrl: 'https://css-doodle.com/reference',
  repo: 'https://github.com/css-doodle/css-doodle',
  added: '2026-11-14',
  // The css-doodle.com guides in menu order (Getting started, Start from a grid, Syntax
  // overview, Avatars), then the reference in its own order: attributes, properties,
  // selectors, the function groups (Cell, Sequence, Random, Values, SVG, Shapes, Nested, with
  // Nested's three GPU languages given a section each, as docs/languages.md does), the JS APIs
  // and events. The Addons guide comes last.
  sections: [
    'Getting started',
    'Start from a grid',
    'Syntax overview',
    'Avatars',
    'Attributes',
    'Properties',
    'Selectors',
    'Cell functions',
    'Sequence',
    'Random',
    'Values',
    'SVG',
    'Shapes',
    'Nested doodles',
    'Patterns',
    'Shaders',
    'Scenes',
    'Element API',
    'Package exports',
    'Events',
    'Addons',
  ],
});
