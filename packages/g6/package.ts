// AntV G6: graph visualisation with elements, layouts, behaviors and plugins
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'AntV G6',
  npm: '@antv/g6',
  tagline: 'Graph visualisation on canvas: nodes, edges and combos, with built-in layouts, interactions and plugins.',
  about:
    'A G6 graph is one options object: data (nodes, edges, combos), how each element type is drawn, a layout that positions them, behaviors that turn input into actions, and plugins that add chrome such as minimaps, tooltips and legends. Every example here runs on G6 5.1.1, in its dark theme, and writes its whole new Graph({...}) spec in its own main.ts. Data comes from the sample datasets in the G6 repository, the same files the docs load from their asset CDN. The official site also hosts a gallery of demos; it is off limits here, so these examples are built from the documentation pages alone.',
  category: 'Data/Viz',
  homepage: 'https://g6.antv.antgroup.com/',
  docsUrl: 'https://g6.antv.antgroup.com/en/manual/introduction',
  repo: 'https://github.com/antvis/g6',
  added: '2026-11-14',
  // The manual's sidebar order (packages/site/.dumirc.ts), with Element split into its
  // Node, Edge, Combo and Shape groups, then the API reference pages.
  sections: [
    'Getting Started',
    'Graph',
    'Data',
    'Element',
    'Node',
    'Edge',
    'Combo',
    'Shape',
    'Layout',
    'Behavior',
    'Plugin',
    'Transform',
    'Theme',
    'Animation',
    'Further Reading',
    'API',
  ],
});
