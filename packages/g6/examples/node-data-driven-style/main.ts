// Style fields as functions of the datum: fill, lineWidth, labelText and badges
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Info = { name: string; isActive: boolean; importance: number; tags: string[] };
const info = (d: NodeData): Info => d.data as unknown as Info;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const people: Info[] = [
      { name: 'alice', isActive: true, importance: 8, tags: ['admin'] },
      { name: 'bob', isActive: false, importance: 3, tags: ['dev', 'ops'] },
      { name: 'carol', isActive: true, importance: 5, tags: [] },
      { name: 'dave', isActive: false, importance: 9, tags: ['dev'] },
    ];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        data: { nodes: people.map((p, i) => ({ id: p.name, data: { ...p }, style: { x: 40 + i * 90, y: 60 } })) },
        node: {
          style: {
            size: 40,
            // Each field below is a function: G6 calls it with the node's datum.
            stroke: (d: NodeData) => (info(d).isActive ? '#FF4D4F' : '#8c8c8c'),
            lineWidth: (d: NodeData) => (info(d).importance > 5 ? 4 : 1),
            fill: (d: NodeData) => (info(d).isActive ? '#5B8FF9' : '#2a3550'),
            labelText: (d: NodeData) => `Node: ${d.id}`,
            badges: (d: NodeData) => info(d).tags.map((text) => ({ text })),
            badgeFontSize: 8,
          },
        },
      }),
    );
    await graph.render();

    const flip = async (name: string): Promise<void> => {
      const cur = info(graph.getNodeData(name));
      graph.updateNodeData([{ id: name, data: { ...cur, isActive: !cur.isActive, importance: 10 - cur.importance } }]);
      await graph.draw();
    };

    if (stage.bar) for (const p of people) button(stage.bar, `flip ${p.name}`, () => void flip(p.name));
    else stage.every(1000, (i) => flip(people[i % people.length]!.name));
  });

export default mount;
