// highlightedLinkIndices greys out links, with no effect on the points
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { linksWithin, keepFramed, load, pointsOf } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Links and points are highlighted independently of each other.' });
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#9aa3b2',
        linkDefaultWidth: 2,
        linkGreyoutOpacity: 0.1,
        fitViewDelay: 1500,
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph);

  let withPoints = false;
  let group = 0;
  const showLinks = (g: number | undefined): void => {
    const link = g === undefined ? undefined : linksWithin(data, g);
    const point = g !== undefined && withPoints ? pointsOf(data, g) : undefined;
    graph.setConfigPartial({ highlightedLinkIndices: link, highlightedPointIndices: point });
    if (g !== undefined) group = g;
  };

  for (const g of [0, 1, 2, 3]) {
    stage.button(`Links in community ${g + 1}`, () => {
      showLinks(g);
      stage.say(`highlightedLinkIndices: the ${linksWithin(data, g).length} links inside community ${g + 1}`);
    });
  }
  stage.button('[] (grey out all links)', () => (graph.setConfigPartial({ highlightedLinkIndices: [] }), stage.say('highlightedLinkIndices: [] greys out every link')));
  stage.button('undefined (clear)', () => (showLinks(undefined), stage.say('highlightedLinkIndices: undefined clears it')));
  stage.toggle('Highlight the points too', false, (on) => {
    withPoints = on;
    showLinks(group);
  });
  stage.slider('linkGreyoutOpacity', 0, 1, 0.05, 0.1, (v) => graph.setConfigPartial({ linkGreyoutOpacity: v }));

  stage.cycle([
    { say: 'highlightedLinkIndices: links inside community 1 (points untouched)', run: () => showLinks(0) },
    { say: 'highlightedLinkIndices: links inside community 3', run: () => showLinks(2) },
    {
      say: 'Points highlighted as well: community 3 points and links',
      run: () => graph.setConfigPartial({ highlightedPointIndices: pointsOf(data, 2) }),
    },
    { say: 'highlightedLinkIndices: undefined', run: () => graph.setConfigPartial({ highlightedLinkIndices: undefined, highlightedPointIndices: undefined }) },
  ]);
  return () => stage.dispose();
};

export default mount;
