// Edit the links array in place, pass it to setLinks again, render
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ring } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each click edits the one links array and hands it back.' });
  const data = ring(14, 90);
  const panel = stage.side();

  const graph = stage.own(
    new Graph(stage.div, { pointDefaultSize: 9, pointDefaultColor: '#8fc1ff', linkDefaultColor: '#889', linkDefaultWidth: 1.5, fitViewDelay: 800 }, stage.device()),
  );
  const links = data.links; // the same Float32Array stays in play for the whole example
  graph.setPointPositions(data.positions);
  graph.setLinks(links);
  graph.render();
  stage.refit(graph, 2400);

  const list = () => Array.from({ length: links.length / 2 }, (_, i) => `${links[i * 2]}→${links[i * 2 + 1]}`).join('  ');
  let n = 0;
  const rewire = () => {
    const k = (n * 3) % 14;
    links[k * 2 + 1] = (k + 5 + (n % 3)) % 14; // edit the target of link k in place
    graph.setLinks(links); // pass the edited array again
    graph.render();
    stage.say(`links[${k * 2 + 1}] = ${links[k * 2 + 1]}; setLinks(links); render()`);
    if (panel) panel.textContent = `links (one array, edited in place)\n\n${list()}`;
    n++;
  };
  const restore = () => {
    links.set(ring(14, 90).links);
    graph.setLinks(links);
    graph.render();
    stage.say('links.set(original); setLinks(links); render()');
    if (panel) panel.textContent = `links (one array, edited in place)\n\n${list()}`;
    n = 0;
  };
  stage.button('Rewire one link', rewire);
  stage.button('Restore the ring', restore);
  if (panel) panel.textContent = `links (one array, edited in place)\n\n${list()}`;
  stage.cycle([{ run: rewire }, { run: rewire }, { run: rewire }, { run: restore }], 2200);
  return () => stage.dispose();
};

export default mount;
