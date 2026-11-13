// A density heatmap layer from createHeatmapProgram, with colour stops, weights and shading
import { bindWebGLLayer, createHeatmapProgram } from '@sigma/layer-webgl';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { clusteredGraph } from './data.ts';
import { checkbox, controlsRow, slider } from './ui.ts';
import './style.css';

const COLOR_STOPS = [
  { value: 0, color: '#4cc9f000' },
  { value: 0.25, color: '#4cc9f0' },
  { value: 0.5, color: '#90be6d' },
  { value: 0.75, color: '#f9c74f' },
  { value: 1, color: '#f94144' },
];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const { graph } = clusteredGraph(4, preview ? 50 : 90, 5);
  // Some nodes count more than others when weights are on.
  let seed = 1;
  graph.forEachNode((node) => {
    seed = (seed * 16807) % 2147483647;
    graph.setNodeAttribute(node, 'weight', 0.2 + (seed % 100) / 100);
    graph.setNodeAttribute(node, 'color', '#1f2937');
  });

  // The "heatmap" depth sits under the nodes, so the points stay readable on top.
  const renderer = new Sigma(graph, container, {
    primitives: { depthLayers: ['edges', 'heatmap', 'topEdges', 'nodes', 'topNodes'] },
  });

  const state = { radius: 30, weighted: false, intensity: 0.5 };
  const draw = (): void => {
    // The explicit id makes each call replace the previous layer instead of stacking.
    bindWebGLLayer(
      'heatmap',
      renderer,
      createHeatmapProgram(graph.nodes(), {
        radius: state.radius,
        colorStops: COLOR_STOPS,
        getWeight: state.weighted ? (n) => Number(graph.getNodeAttribute(n, 'weight')) : undefined,
        shading: { intensity: state.intensity },
      }),
      'heatmap',
    );
  };
  draw();

  let timer = 0;
  if (preview) {
    // Cycle the kernel radius so the hot spots merge and separate.
    const radii = [18, 30, 45, 30];
    let i = 0;
    timer = window.setInterval(() => {
      i = (i + 1) % radii.length;
      state.radius = radii[i] ?? 30;
      draw();
    }, 1100);
  } else {
    const row = controlsRow(el);
    row.append(
      slider('Radius', [10, 80, 5, state.radius], (v) => {
        state.radius = v;
        draw();
      }),
      slider('Shading', [0, 1, 0.1, state.intensity], (v) => {
        state.intensity = v;
        draw();
      }),
      checkbox('Weight by node attribute', false, (on) => {
        state.weighted = on;
        draw();
      }),
    );
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
