// Highlights a hovered node's neighbourhood or a label search through custom sigma state
import Sigma, { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import './style.css';

const PREVIEW_QUERIES = ['ar', 'kal', 'mir', ''];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 80 : 160, 5);

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    // 1. Custom state: our own flags next to sigma's built-in ones.
    customNodeState: { isActive: false },
    customEdgeState: { isActive: false },
    customGraphState: { hasActiveSubgraph: false },
    // 2. Conditional styles read that state; no reducers needed.
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        { color: { attribute: 'color' }, size: { attribute: 'size' } },
        {
          when: (_attrs, state, graphState) => graphState.hasActiveSubgraph && !state.isActive && !state.isHighlighted,
          then: { color: '#eceef1', label: '' },
        },
        { whenState: 'isActive', then: { depth: 'topNodes', labelVisibility: 'visible' } },
      ],
      edges: [
        DEFAULT_STYLES.edges,
        { color: { attribute: 'color' }, size: { attribute: 'size' } },
        {
          when: (_attrs, state, graphState) => graphState.hasActiveSubgraph && !state.isActive,
          then: { visibility: 'hidden' },
        },
      ],
    },
  });

  // 3. Update state from interaction. One helper serves hover and search.
  const activate = (nodes: Set<string> | null, searchHit = false): void => {
    graph.forEachNode((n) => {
      const on = nodes?.has(n) ?? false;
      // isHighlighted is sigma's built-in "search result" flag.
      renderer.setNodeState(n, { isActive: on, isHighlighted: on && searchHit });
    });
    graph.forEachEdge((e, _a, source, target) =>
      renderer.setEdgeState(e, { isActive: !!nodes && nodes.has(source) && nodes.has(target) }),
    );
    renderer.setGraphState({ hasActiveSubgraph: nodes !== null });
  };
  const neighbourhood = (node: string): Set<string> => new Set([node, ...graph.neighbors(node)]);

  const search = (query: string): void => {
    const q = query.trim().toLowerCase();
    const matches = q ? graph.filterNodes((_n, attrs) => String(attrs['label']).toLowerCase().includes(q)) : [];
    activate(matches.length ? new Set(matches) : null, true);
  };

  let timer = 0;
  if (preview) {
    // No pointer: cycle search queries, which light the same state.
    let i = 0;
    const next = (): void => search(PREVIEW_QUERIES[i++ % PREVIEW_QUERIES.length] ?? '');
    next();
    timer = window.setInterval(next, 1600);
  } else {
    renderer.on('enterNode', ({ node }) => activate(neighbourhood(node)));
    // Leaving a node restores the search result rather than clearing everything.
    renderer.on('leaveNode', () => search(input.value));

    const controls = document.createElement('div');
    controls.className = 'controls';
    const input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Search labels, e.g. "ar"';
    input.addEventListener('input', () => search(input.value));
    controls.append(input, 'Hover a node to see its neighbourhood.');
    el.append(controls);
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
