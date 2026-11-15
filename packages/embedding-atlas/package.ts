// embedding-atlas: Apple's WebGPU views for millions of embedding points, on DuckDB
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Embedding Atlas',
  npm: 'embedding-atlas',
  tagline: 'WebGPU scatter and density views for millions of embedding points, with automatic cluster labels.',
  about:
    'Embedding Atlas is Apple\'s toolkit for exploring embeddings. The npm package has three views: EmbeddingView draws x and y typed arrays straight from JavaScript; EmbeddingViewMosaic reads the same from a DuckDB table through a Mosaic coordinator, so filters and brushes are SQL predicates; and EmbeddingAtlas is the whole app, with linked charts, a table, search and a JSON chart grammar. It also ships WebAssembly UMAP, NNDescent nearest-neighbour search and density clustering. The views draw with WebGPU and need the shader-f16 feature: without it they show a notice and draw no points, while the charts, tables and algorithms still work. DuckDB runs in the page from the package\'s own wasm, so nothing here touches the network.',
  category: 'Data/Viz',
  homepage: 'https://apple.github.io/embedding-atlas',
  docsUrl: 'https://apple.github.io/embedding-atlas',
  repo: 'https://github.com/apple/embedding-atlas',
  added: '2026-11-15',
  sections: [
    'EmbeddingView',
    'Config',
    'Theme',
    'Custom Tooltip',
    'Custom Overlay',
    'EmbeddingViewMosaic',
    'EmbeddingAtlas',
    'Charts',
    'State & Layouts',
    'Data Formats',
    'UMAP',
    'NNDescent',
    'Density Clustering',
  ],
});
