// highlightedPointIndices greys out every point that is not listed
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed, pointsOf } from '../../shared/load.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a set of points to highlight; the rest are greyed out.' });
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 10,
        linkDefaultColor: '#5a5f6a',
        pointGreyoutOpacity: 0.25,
        fitViewDelay: 1500,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph);

  const highlight = (indices: number[] | undefined): void => graph.setConfigPartial({ highlightedPointIndices: indices });
  const some = [3, 14, 40, 41, 77, 90, 101, 118];

  stage.button('Community 1', () => (highlight(pointsOf(data, 0)), stage.say('highlightedPointIndices: the 30 points of community 1')));
  stage.button('Eight scattered points', () => (highlight(some), stage.say('highlightedPointIndices: eight chosen points')));
  stage.button('[] (grey out all)', () => (highlight([]), stage.say('highlightedPointIndices: [] greys out every point')));
  stage.button('undefined (clear)', () => (highlight(undefined), stage.say('highlightedPointIndices: undefined clears highlighting')));
  stage.slider('Greyout opacity', 0, 1, 0.05, 0.25, (v) => graph.setConfigPartial({ pointGreyoutOpacity: v }));
  stage.select(
    'Greyout colour',
    [
      { value: 'own', label: 'own colour, darkened' },
      { value: '#4a5568', label: 'slate' },
      { value: '#a64040', label: 'red' },
    ],
    'own',
    (v) => graph.setConfigPartial({ pointGreyoutColor: v === 'own' ? undefined : v }),
  );

  stage.cycle([
    { say: 'highlightedPointIndices: community 1', run: () => highlight(pointsOf(data, 0)) },
    { say: 'highlightedPointIndices: community 3', run: () => highlight(pointsOf(data, 2)) },
    { say: 'highlightedPointIndices: eight chosen points', run: () => highlight(some) },
    { say: 'highlightedPointIndices: [] greys out all', run: () => highlight([]) },
    { say: 'highlightedPointIndices: undefined clears it', run: () => highlight(undefined) },
  ]);
  return () => stage.dispose();
};

export default mount;
