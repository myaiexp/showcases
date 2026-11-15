// showFPSMonitor overlays a live frame-rate graph on the canvas
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scatter, randomLinks } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle the monitor; the layout keeps running either way.' });
  const count = stage.preview ? 600 : 3000;

  const graph = stage.own(
    new Graph(stage.div, { showFPSMonitor: true, pointDefaultSize: 3, linkDefaultColor: '#3a3f4b', fitViewDelay: 1200 }, stage.device()),
  );
  graph.setPointPositions(scatter(count, 400, 4));
  graph.setLinks(randomLinks(count, count, 4));
  graph.render();
  stage.refit(graph);

  const set = (on: boolean) => {
    graph.setConfigPartial({ showFPSMonitor: on });
    stage.say(`setConfigPartial({ showFPSMonitor: ${on} })`);
  };
  stage.toggle('showFPSMonitor', true, set);
  stage.say('showFPSMonitor: true');
  let on = true;
  stage.every(3000, () => set((on = !on)));
  return () => stage.dispose();
};

export default mount;
