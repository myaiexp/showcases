// itemSizesReference: the same size values read as graph units ("positions") or as pixels ("screen")
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import { button, controlsRow, readout } from './ui.ts';
import './style.css';

type Reference = 'positions' | 'screen';

const mount: Mount = (el, { preview }) => {
  const stageWrap = document.createElement('div');
  stageWrap.className = 'stage-wrap';
  const container = document.createElement('div');
  container.className = 'stage';
  stageWrap.append(container);
  el.append(stageWrap);

  const graph = buildGraph(preview ? 10 : 16);
  const caption = document.createElement('div');
  caption.className = 'caption';
  stageWrap.append(caption);

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes', itemSizesReference: 'positions' },
    // The size 4 means 4 units of the x/y space with "positions", but 4 pixels with "screen".
    styles: {
      nodes: { x: { attribute: 'x' }, y: { attribute: 'y' }, size: 4, color: '#e76f51' },
      edges: { color: '#ccc', size: 0.5 },
    },
  });

  let reference: Reference = 'positions';
  const apply = (next: Reference): void => {
    reference = next;
    renderer.setSetting('itemSizesReference', next);
    caption.textContent = `itemSizesReference: "${next}"`;
  };
  apply('positions');
  const flip = (): void => apply(reference === 'positions' ? 'screen' : 'positions');

  let timer = 0;
  if (preview) {
    timer = window.setInterval(flip, 1800);
  } else {
    const row = controlsRow(el);
    button(row, 'Switch reference', flip);
    // Narrowing the stage shows the other difference: "screen" sizes do not shrink with it.
    let narrow = false;
    button(row, 'Resize the stage', () => {
      narrow = !narrow;
      container.style.width = narrow ? '40%' : '';
      renderer.resize();
      renderer.refresh();
    });
    readout(row, 'Same node size (4) in both modes.');
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
