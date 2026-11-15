// cosmos.gl: GPU force-directed graph layout and rendering for very large graphs
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'cosmos.gl',
  npm: '@cosmos.gl/graph',
  tagline: 'Force-directed graph layout and rendering, computed on the GPU.',
  about:
    'cosmos.gl lays out and draws network graphs with every step on the GPU: the forces (links, repulsion, gravity, centring, clusters, attractors, collision) run in fragment shaders over position textures, and points and links are drawn from the same textures, so a graph of hundreds of thousands of points still moves in real time. Data goes in as flat typed arrays: positions as [x1, y1, x2, y2, …], links as pairs of point indices, colours as RGBA in 0..1. Everything else is configuration: styling, highlighting, interaction callbacks and the simulation settings, all changeable while the layout runs. These examples follow the docs’ Configuration and API Reference pages, plus the design notes in the repo.',
  category: 'Data/Viz',
  homepage: 'https://cosmosgl.github.io/graph',
  docsUrl: 'https://cosmosgl.github.io/graph',
  repo: 'https://github.com/cosmosgl/graph',
  added: '2026-11-15',
  // The docs' order: Quick Start, then the Configuration page (its main table by topic,
  // simulation settings, event callbacks, transitions), then the API Reference by topic,
  // then the design notes (docs/ and history/) for headless use and scale.
  sections: [
    'Quick start',
    'Configuration',
    'Point styling',
    'Link styling',
    'Highlight & focus',
    'Simulation forces',
    'Event callbacks',
    'Transitions',
    'Adding & removing points',
    'Clusters, attractors & pins',
    'Simulation control',
    'View & zoom',
    'Queries & sampling',
    'Headless & shared device',
    'Performance',
  ],
});
