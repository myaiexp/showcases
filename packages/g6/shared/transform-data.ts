// Small fixed graphs for the Transform examples (data only, no options)
import type { EdgeData, GraphData, NodeData } from '@antv/g6';

const pairs = (list: [string, string][]): EdgeData[] => list.map(([source, target]) => ({ source, target }));
const ids = (prefix: string, n: number): NodeData[] => Array.from({ length: n }, (_, i) => ({ id: `${prefix}${i}` }));

/** 12 nodes: a hub (n0), two sub-hubs (n1, n5) and leaves, so centralities differ a lot. */
export function hubGraph(): GraphData {
  return {
    nodes: ids('n', 12),
    edges: pairs([
      ['n0', 'n1'], ['n0', 'n2'], ['n0', 'n3'], ['n0', 'n4'], ['n0', 'n5'],
      ['n1', 'n6'], ['n1', 'n7'], ['n1', 'n8'],
      ['n5', 'n9'], ['n5', 'n10'], ['n10', 'n11'], ['n2', 'n3'],
    ]),
  };
}

/** The docs' MapNodeSize tree: one root, three children, three grandchildren. */
export function smallTree(): GraphData {
  return {
    nodes: Array.from({ length: 7 }, (_, i) => ({ id: `node${i + 1}` })),
    edges: pairs([
      ['node1', 'node2'], ['node1', 'node3'], ['node1', 'node4'],
      ['node2', 'node5'], ['node3', 'node6'], ['node4', 'node7'],
    ]),
  };
}

/** A tree whose nodes carry a children list, which place-radial-labels reads to find leaves. */
export function radialTree(): GraphData {
  const nodes: NodeData[] = [{ id: 'root', children: ['a', 'b', 'c', 'd', 'e', 'f'] }];
  const edges: EdgeData[] = [];
  'abcdef'.split('').forEach((p) => {
    edges.push({ source: 'root', target: p });
    nodes.push({ id: p, children: [`${p}1`, `${p}2`] });
    for (const k of ['1', '2']) {
      nodes.push({ id: `${p}${k}` });
      edges.push({ source: p, target: `${p}${k}` });
    }
  });
  return { nodes, edges };
}

/** Three nodes with several edges between the same pairs. Parallel edges need explicit ids. */
export function parallelGraph(): GraphData {
  return {
    nodes: [
      { id: 'a', style: { x: 40, y: 100 } },
      { id: 'b', style: { x: 150, y: 40 } },
      { id: 'c', style: { x: 260, y: 100 } },
    ],
    edges: [
      { id: 'ab-1', source: 'a', target: 'b' },
      { id: 'ab-2', source: 'a', target: 'b' },
      { id: 'ab-3', source: 'a', target: 'b' },
      { id: 'bc-1', source: 'b', target: 'c' },
      { id: 'bc-2', source: 'b', target: 'c' },
      { id: 'ca-1', source: 'c', target: 'a' },
      { id: 'ac-1', source: 'a', target: 'c' },
    ],
  };
}
