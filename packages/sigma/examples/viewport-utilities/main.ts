// Zooms to one cluster with fitViewportToNodes and counts visible nodes with getNodesInViewport
import { fitViewportToNodes, getNodesInViewport } from '@sigma/utils';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildClusterGraph } from './data.ts';
import './style.css';

const CLUSTERS = 5;

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildClusterGraph(CLUSTERS, 40);
  const renderer = new Sigma(graph, container);
  const camera = renderer.getCamera();

  const clusterNodes = (c: number): string[] => graph.filterNodes((_, attrs) => attrs['color'] === graph.getNodeAttribute(`${c}-0`, 'color'));
  const fit = (nodes: string[]): Promise<void> => fitViewportToNodes(renderer, nodes, { animate: true });

  let timer = 0;
  if (preview) {
    let c = 0;
    const step = (): void => {
      // Alternate between a cluster and the whole graph.
      const nodes = c % 2 === 0 ? clusterNodes((c / 2) % CLUSTERS) : graph.nodes();
      void fit(nodes);
      c++;
    };
    step();
    timer = window.setInterval(step, 1800);
    return () => {
      clearInterval(timer);
      camera.cancelAnimation();
      renderer.kill();
    };
  }

  const controls = document.createElement('div');
  controls.className = 'controls';
  const readout = document.createElement('code');
  readout.className = 'readout';
  // getNodesInViewport returns nodes at least partly on screen, so the count follows every camera move.
  const update = (): void => {
    readout.textContent = `${getNodesInViewport(renderer).length} of ${graph.order} nodes in the viewport`;
  };
  update();
  camera.on('updated', update);

  for (let c = 0; c < CLUSTERS; c++) {
    const b = document.createElement('button');
    b.textContent = `Fit cluster ${c + 1}`;
    b.addEventListener('click', () => void fit(clusterNodes(c)));
    controls.append(b);
  }
  const all = document.createElement('button');
  all.textContent = 'Fit all nodes';
  all.addEventListener('click', () => void fit(graph.nodes()));
  controls.append(all);
  el.append(controls, readout);

  return () => {
    camera.off('updated', update);
    camera.cancelAnimation();
    renderer.kill();
  };
};

export default mount;
