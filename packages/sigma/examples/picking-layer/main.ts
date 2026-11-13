// Flip DEBUG_displayPickingLayer to see the offscreen colour-ID framebuffer that sigma hit-tests against
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { pickingGraph } from './data.ts';
import { checkbox, controlsRow, slider } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = pickingGraph(preview ? 40 : 90);

  const renderer = new Sigma(graph, container, {
    // Edge picking is off by default; enabling it adds edges to the picking framebuffer.
    settings: { enableEdgeEvents: true, DEBUG_displayPickingLayer: false },
  });

  let timer = 0;
  if (preview) {
    // Alternate between the normal image and the picking framebuffer.
    let debug = false;
    timer = window.setInterval(() => {
      debug = !debug;
      renderer.setSetting('DEBUG_displayPickingLayer', debug);
    }, 1500);
  } else {
    const hovered = document.createElement('span');
    hovered.textContent = 'Hover a node or an edge';
    // These are the events driven by the picking pass: what is under the pointer comes from it.
    renderer.on('enterNode', ({ node }) => (hovered.textContent = `Node under pointer: ${node}`));
    renderer.on('enterEdge', ({ edge }) => (hovered.textContent = `Edge under pointer: ${edge}`));
    renderer.on('leaveNode', () => (hovered.textContent = 'Hover a node or an edge'));
    renderer.on('leaveEdge', () => (hovered.textContent = 'Hover a node or an edge'));

    const row = controlsRow(el);
    row.append(
      checkbox('DEBUG_displayPickingLayer', false, (v) => renderer.setSetting('DEBUG_displayPickingLayer', v)),
      // The picking buffer is drawn at 1/ratio of the resolution: raise it for blockier picking.
      slider('pickingDownSizingRatio', [1, 8, 1, 2], (v) => renderer.setSetting('pickingDownSizingRatio', v)),
      hovered,
    );
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
