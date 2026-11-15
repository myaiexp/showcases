// focusedLinkIndex widens one link by focusedLinkWidthIncrease pixels
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose the focused link and how much wider it is drawn.' });
  const data = communities(4, 30, 3);
  const linkCount = data.links.length / 2;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#9aa3b2',
        linkDefaultWidth: 1.5,
        focusedLinkIndex: 12,
        focusedLinkWidthIncrease: 6,
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
  stage.say('focusedLinkIndex: 12');

  const focus = (i: number | undefined): void => {
    graph.setConfigPartial({ focusedLinkIndex: i });
    stage.say(i === undefined ? 'focusedLinkIndex: undefined (no focus)' : `focusedLinkIndex: ${i}`);
  };
  stage.slider('focusedLinkIndex', 0, linkCount - 1, 1, 12, focus);
  stage.slider('focusedLinkWidthIncrease', 0, 20, 1, 6, (v) => {
    graph.setConfigPartial({ focusedLinkWidthIncrease: v });
    stage.say(`focusedLinkWidthIncrease: ${v}`);
  });
  stage.button('undefined (clear)', () => focus(undefined));

  stage.cycle(
    [
      { say: 'focusedLinkIndex: 12, focusedLinkWidthIncrease: 6', run: () => graph.setConfigPartial({ focusedLinkIndex: 12, focusedLinkWidthIncrease: 6 }) },
      { say: 'focusedLinkIndex: 90', run: () => graph.setConfigPartial({ focusedLinkIndex: 90 }) },
      { say: 'focusedLinkWidthIncrease: 14', run: () => graph.setConfigPartial({ focusedLinkWidthIncrease: 14 }) },
      { say: 'focusedLinkIndex: 160, focusedLinkWidthIncrease: 3', run: () => graph.setConfigPartial({ focusedLinkIndex: 160, focusedLinkWidthIncrease: 3 }) },
      { say: 'focusedLinkIndex: undefined', run: () => graph.setConfigPartial({ focusedLinkIndex: undefined }), hold: 1500 },
    ],
    2000,
  );
  return () => stage.dispose();
};

export default mount;
