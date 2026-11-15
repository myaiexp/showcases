// outlinedPointIndices rings chosen points, whether or not highlighting is on
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed, load, pointsOf } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Outlines and highlighting are two separate settings.' });
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 10,
        linkDefaultColor: '#5a5f6a',
        outlinedPointRingColor: '#ffd84d',
        fitViewDelay: 1500,
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph);

  const outline = (g: number | undefined): void => graph.setConfigPartial({ outlinedPointIndices: g === undefined ? undefined : pointsOf(data, g) });
  const highlight = (g: number | undefined): void => graph.setConfigPartial({ highlightedPointIndices: g === undefined ? undefined : pointsOf(data, g) });

  stage.button('Outline community 2', () => (outline(1), stage.say('outlinedPointIndices: community 2')));
  stage.button('Outline community 4', () => (outline(3), stage.say('outlinedPointIndices: community 4')));
  stage.button('Clear outline', () => (outline(undefined), stage.say('outlinedPointIndices: undefined')));
  stage.toggle('Highlight community 1 as well', false, (on) => {
    highlight(on ? 0 : undefined);
    stage.say(on ? 'highlightedPointIndices: community 1; outlines are unchanged' : 'highlightedPointIndices: undefined');
  });
  stage.select(
    'outlinedPointRingColor',
    [
      { value: '#ffd84d', label: 'yellow' },
      { value: '#ff5d73', label: 'red' },
      { value: '#5de2ff', label: 'cyan' },
    ],
    '#ffd84d',
    (v) => graph.setConfigPartial({ outlinedPointRingColor: v }),
  );

  stage.cycle([
    { say: 'outlinedPointIndices: community 2', run: () => outline(1) },
    { say: 'highlightedPointIndices: community 1, outlines stay', run: () => highlight(0) },
    { say: 'outlinedPointRingColor: red', run: () => graph.setConfigPartial({ outlinedPointRingColor: '#ff5d73' }) },
    { say: 'outlinedPointIndices: community 4', run: () => outline(3) },
    {
      say: 'Both cleared (undefined)',
      run: () => graph.setConfigPartial({ outlinedPointIndices: undefined, highlightedPointIndices: undefined, outlinedPointRingColor: '#ffd84d' }),
      hold: 1600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
