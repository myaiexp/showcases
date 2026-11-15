// Graph.ready and isReady: calls queued before init, reads after it
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { eventLog } from '../../shared/log.ts';
import { rebuilder } from '../../shared/rebuild.ts';
import { tree } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Build the graph again: the log shows what happens before and after it is ready.' });
  const log = eventLog(stage, 14);
  const rb = rebuilder(stage);
  const data = tree(90, 22);

  const build = (): void => {
    const t0 = performance.now();
    const at = (): string => `${Math.round(performance.now() - t0)} ms`;
    const graph = rb.adopt(new Graph(stage.div, { pointDefaultSize: 7, linkDefaultColor: '#5a5f6a', fitViewDelay: 800 }, rb.device));
    log(`${at()}  new Graph(): isReady ${graph.isReady}`);
    graph.setPointPositions(data.positions); // queued: the graph is not initialised yet
    graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
    graph.setLinks(data.links);
    graph.render();
    log(`${at()}  setPointPositions, setLinks, render() called: isReady ${graph.isReady}`, 'warn');
    graph.ready.then(
      () => {
        if (stage.disposed || rb.current !== graph) return;
        log(`${at()}  ready resolved: isReady ${graph.isReady}, getPointPositions() has ${graph.getPointPositions().length / 2} points`, 'ok');
      },
      () => undefined,
    );
    stage.refit(graph, 3000);
  };
  build();
  stage.button('Build again', build);
  if (stage.preview) stage.every(6000, build);
  return () => stage.dispose();
};

export default mount;
