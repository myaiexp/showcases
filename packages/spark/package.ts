// Spark: a dynamic 3D Gaussian Splatting renderer that plugs into three.js
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Spark',
  npm: '@sparkjsdev/spark',
  tagline:
    'A 3D Gaussian Splatting renderer for three.js: splat objects that sort, blend and edit alongside ordinary meshes.',
  about:
    'Every example renders through a three.js WebGLRenderer with a SparkRenderer added to the scene, as Spark 2 requires. Most splats here are built in the browser (pushSplat, the splat constructors, dyno generators), so the gallery cards need no downloads. The examples that show a captured splat load butterfly.spz, the file the docs’ quick start links, from sparkjs.dev in the full view only; their cards show a procedural stand-in.',
  category: 'Graphics',
  homepage: 'https://sparkjs.dev/',
  docsUrl: 'https://sparkjs.dev/docs/',
  repo: 'https://github.com/sparkjsdev/spark',
  added: '2026-11-13',
  // mkdocs.yml nav order. Community Resources links other people's demos, so it isn't
  // vendored and has no section.
  sections: [
    'Getting Started',
    'New Features in 2.0',
    'Migration Guide',
    'Level-of-Detail',
    'Overview',
    'System Design',
    'SparkRenderer',
    'On-demand Rendering',
    'SplatMesh',
    'PackedSplats',
    'ExtSplats',
    'Loading Splats',
    'Procedural Splats',
    'Splat Editing',
    'Dyno Overview',
    'Dyno Standard Library',
    'LoD Deep Dive',
    'Controls',
    'Performance Tuning',
  ],
});
