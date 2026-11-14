// Small graph edits (add, recolour, remove) that the history examples record
import type { Graph, GraphData } from '@antv/g6';

const COLOURS = ['#7e3feb', '#1783ff', '#00c9c9', '#f08f56', '#f04864'];

/** Four placed nodes in a row, linked in a chain. */
export function editorData(): GraphData {
  return {
    nodes: [0, 1, 2, 3].map((i) => ({ id: `n${i}`, style: { x: 60 + i * 70, y: 80 + (i % 2) * 50 }, data: { c: 0 } })),
    edges: [0, 1, 2].map((i) => ({ source: `n${i}`, target: `n${i + 1}` })),
  };
}

/** Counts the nodes ever added so ids never repeat. */
export class Editor {
  private next = 4;
  private paint = 0;

  private readonly graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  /** Adds a node linked to the newest one. Each op ends in draw(): that is what the history plugin records. */
  async add(): Promise<void> {
    const ids = this.graph.getNodeData().map((n) => n.id);
    const id = `n${this.next++}`;
    this.graph.addNodeData([{ id, style: { x: 40 + ((this.next * 53) % 220), y: 40 + ((this.next * 37) % 120) }, data: { c: 0 } }]);
    const last = ids[ids.length - 1];
    if (last) this.graph.addEdgeData([{ source: last, target: id }]);
    await this.graph.draw();
  }

  async recolor(): Promise<void> {
    this.paint = (this.paint + 1) % COLOURS.length;
    const fill = COLOURS[this.paint]!;
    this.graph.updateNodeData(this.graph.getNodeData().map((n) => ({ id: n.id, style: { fill } })));
    await this.graph.draw();
  }

  async remove(): Promise<void> {
    const nodes = this.graph.getNodeData();
    const last = nodes[nodes.length - 1];
    if (nodes.length <= 1 || !last) return;
    this.graph.removeNodeData([last.id]);
    await this.graph.draw();
  }
}
