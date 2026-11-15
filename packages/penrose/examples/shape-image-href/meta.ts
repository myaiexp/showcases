// penrose example: Image href
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image href',
  summary:
    'An Image does not take a URL: `href` is a path that toSVG hands to its path resolver, and this site answers `star.svg`, `gear.svg` and the others from pictures drawn in code. Each tab puts a different picture into the same two Image shapes.',
  section: 'Shape: Image',
  tags: ['Image', 'href', 'width', 'height', 'pathResolver'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/image.md',
    'repo/packages/core/src/shapes/Image.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
