// Shows one point in viewport, graph, framedGraph and clip coordinates using sigma's conversion methods
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildClusterGraph } from './data.ts';
import './style.css';

const fmt = (n: number, digits = 2): string => n.toFixed(digits).padStart(7);

const mount: Mount = (el, { preview }) => {
  const frame = document.createElement('div');
  frame.className = 'frame';
  const container = document.createElement('div');
  container.className = 'stage';
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  frame.append(container, overlay);
  el.append(frame);

  const graph = buildClusterGraph(5, 30);
  // The marker is a graph node, so setting its x/y in graph space is the test of the conversions.
  graph.addNode('marker', { x: 0, y: 0, size: 2.5, color: '#111', label: 'marker' });
  // Freeze the extent: otherwise moving the marker would change the framing it is measured in.
  const renderer = new Sigma(graph, container, { settings: { autoRescale: 'once' } });

  // The docs describe clipspace as [-1, 1] on both axes across the viewport, with y up.
  const describe = (graphPos: { x: number; y: number }): void => {
    const viewport = renderer.graphToViewport(graphPos);
    const framed = renderer.graphToFramedGraph(graphPos);
    const { width, height } = renderer.getDimensions();
    overlay.textContent = [
      `graph        ${fmt(graphPos.x)} ${fmt(graphPos.y)}`,
      `framedGraph  ${fmt(framed.x, 3)} ${fmt(framed.y, 3)}`,
      `viewport px  ${fmt(viewport.x, 0)} ${fmt(viewport.y, 0)}`,
      `clipspace    ${fmt((2 * viewport.x) / width - 1, 3)} ${fmt(1 - (2 * viewport.y) / height, 3)}`,
    ].join('\n');
  };

  if (preview) {
    // Walk the marker round the graph; the readout follows in all four spaces.
    let frameId = 0;
    const tick = (now: number): void => {
      const t = now / 2500;
      const pos = { x: Math.cos(t) * 40, y: Math.sin(t * 1.3) * 30 };
      graph.mergeNodeAttributes('marker', pos);
      describe(pos);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      renderer.kill();
    };
  }

  // Full view: the pointer comes in as viewport pixels; viewportToGraph puts the marker under it.
  const note = document.createElement('p');
  note.className = 'readout';
  note.textContent =
    'Move the pointer over the graph. The marker is placed with viewportToGraph(), so it stays under the cursor; zoom or pan and it still does.';
  note.style.whiteSpace = 'normal';
  el.append(note);
  describe({ x: 0, y: 0 });

  renderer.on('moveBody', ({ event }) => {
    const graphPos = renderer.viewportToGraph({ x: event.x, y: event.y });
    graph.mergeNodeAttributes('marker', graphPos);
    const framed = renderer.viewportToFramedGraph({ x: event.x, y: event.y });
    // Round trip through framedGraph must land on the same graph position.
    const back = renderer.framedGraphToGraph(framed);
    describe(back);
  });

  return () => renderer.kill();
};

export default mount;
