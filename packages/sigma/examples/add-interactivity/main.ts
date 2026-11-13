// Highlights a node's neighbourhood with custom state, conditional styles and depth layers
import Graph from 'graphology';
import Sigma, { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { makeDataset } from './data.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const dataset = makeDataset(preview ? 300 : 2000);
  const graph = new Graph();
  for (const node of dataset.nodes) {
    graph.addNode(node.key, { label: node.label, x: node.x, y: node.y, cluster: node.cluster, score: node.score });
  }
  for (const [source, target] of dataset.edges) graph.addEdge(source, target);

  const clusterColors = Object.fromEntries(dataset.clusters.map((c) => [c.key, c.color]));
  const scores = dataset.nodes.map((n) => n.score);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  const renderer = new Sigma(graph, container, {
    // Initial values double as the type declaration for the custom state.
    customNodeState: { isActive: false },
    customEdgeState: { isActive: false },
    customGraphState: { hasActiveSubgraph: false },
    primitives: {
      // Deepest first: base graph, then the active subgraph, then the hovered node.
      // DEFAULT_STYLES.edges still refers to "topEdges", so it must stay declared.
      depthLayers: ['edges', 'nodes', 'activeEdges', 'activeNodes', 'topEdges', 'topNodes'],
    },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        {
          color: { attribute: 'cluster', dict: clusterColors, defaultValue: '#999' },
          size: { attribute: 'score', min: 10, max: 50, minValue: minScore, maxValue: maxScore },
        },
        {
          // With an active subgraph, everything outside it (and not hovered) goes grey, unlabelled.
          when: (_attrs, state, graphState) => graphState.hasActiveSubgraph && !state.isActive && !state.isHovered,
          then: { color: '#eee', label: '' },
        },
        { whenState: 'isActive', then: { depth: 'activeNodes' } },
        { whenState: 'isHovered', then: { depth: 'topNodes' } },
      ],
      edges: [
        DEFAULT_STYLES.edges,
        { color: '#ccc', size: 5 },
        {
          when: (_attrs, state, graphState) => graphState.hasActiveSubgraph && !state.isActive,
          then: { color: '#eee' },
        },
        { whenState: 'isActive', then: { depth: 'activeEdges' } },
      ],
    },
  });

  function setActiveSubgraph(activeNodes: Set<string> | null): void {
    graph.forEachNode((node) => {
      renderer.setNodeState(node, { isActive: activeNodes?.has(node) ?? false });
    });
    graph.forEachEdge((edge) => {
      const [source, target] = graph.extremities(edge);
      renderer.setEdgeState(edge, { isActive: (activeNodes?.has(source) && activeNodes.has(target)) ?? false });
    });
    renderer.setGraphState({ hasActiveSubgraph: activeNodes !== null });
    // Styles must be re-evaluated, but no position changed: skip the spatial index.
    renderer.refresh({ skipIndexation: true });
  }

  const neighbourhood = (node: string): Set<string> => new Set([node, ...graph.neighbors(node)]);

  let timer = 0;
  if (preview) {
    // No pointer in a card: walk through the best-connected nodes instead.
    const hubs = graph
      .nodes()
      .sort((a, b) => graph.degree(b) - graph.degree(a))
      .slice(0, 5);
    let i = 0;
    const next = (): void => {
      const hub = hubs[i++ % hubs.length];
      if (hub) setActiveSubgraph(neighbourhood(hub));
    };
    next();
    timer = window.setInterval(next, 1600);
  } else {
    renderer.on('enterNode', ({ node }) => setActiveSubgraph(neighbourhood(node)));
    renderer.on('leaveNode', () => setActiveSubgraph(null));
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
