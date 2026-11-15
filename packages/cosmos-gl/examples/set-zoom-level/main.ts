// setZoomLevel, its alias zoom, and getZoomLevel
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Higher is closer. The reading comes from getZoomLevel().' });
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#5a5f6a',
        fitViewOnInit: false,
        onZoomEnd: () => stage.say(`getZoomLevel() = ${graph.getZoomLevel().toFixed(2)}`, 'ok'),
      },
      stage.device(),
    ),
  );
  load(graph, data);
  graph.start(0.4);

  let level = 2;
  let duration = 600;
  stage.slider('level', 0.2, 8, 0.1, level, (v) => (level = v));
  stage.slider('duration (ms)', 0, 2000, 50, duration, (v) => (duration = v));
  stage.button('setZoomLevel(level, duration)', () => graph.setZoomLevel(level, duration));
  stage.button('zoom(level, duration)', () => graph.zoom(level, duration));
  stage.button('getZoomLevel()', () => stage.say(`getZoomLevel() = ${graph.getZoomLevel().toFixed(2)}`, 'ok'));
  stage.say('getZoomLevel() = 1.00');

  stage.cycle(
    [
      { say: 'setZoomLevel(2.5, 700)', run: () => graph.setZoomLevel(2.5, 700) },
      { say: 'zoom(0.6, 700): the same call under a shorter name', run: () => graph.zoom(0.6, 700) },
      { say: 'setZoomLevel(1.4, 0): instant', run: () => graph.setZoomLevel(1.4, 0) },
      { say: 'setZoomLevel(1, 700)', run: () => graph.setZoomLevel(1, 700) },
    ],
    2200,
  );
  return () => stage.dispose();
};

export default mount;
