// 3d-force-graph: three.js force-directed graphs in 3D, laid out by d3-force-3d or ngraph
import { definePackage } from '@/types.ts';

export default definePackage({
  name: '3d-force-graph',
  npm: '3d-force-graph',
  tagline: 'Force-directed graphs in 3D on three.js: spheres and cylinders, custom objects, camera controls.',
  about:
    '3d-force-graph is the three.js sibling of force-graph. The layout runs in one, two or three dimensions on d3-force-3d or ngraph, nodes are spheres and links lines or cylinders, and any of them can be swapped for a custom Object3D or material. Trackball, orbit or fly controls move the camera, arrows and particles show link direction, DAG modes lay out hierarchies along any axis, and the scene, camera, renderer, lights and post-processing composer are all reachable for anything the props do not cover.',
  category: 'Data/Viz',
  homepage: 'https://github.com/vasturiano/3d-force-graph',
  docsUrl: 'https://github.com/vasturiano/3d-force-graph#api-reference',
  repo: 'https://github.com/vasturiano/3d-force-graph',
  added: '2026-11-15',
  sections: [
    'Quick start',
    'Initialisation',
    'Data input',
    'Container layout',
    'Node styling',
    'Link styling',
    'Render control',
    'Force engine configuration',
    'Interaction',
    'Utility',
    'Input JSON syntax',
  ],
});
