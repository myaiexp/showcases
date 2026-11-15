// A hovered link is recoloured and widened; onLinkMouseOver/Out report it
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { web } from '../../shared/static-layouts.ts';
import { load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over a link.' });
  const data = web(8, 3, 34); // long links, so a link can be told from its two points

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#6b7280',
        linkDefaultWidth: 3,
        enableSimulation: false, // a fixed web: the layout stays still
        rescalePositions: false,
        hoveredLinkColor: '#ffd84d',
        hoveredLinkWidthIncrease: 5,
        hoveredLinkCursor: 'pointer',
        fitViewDelay: 300,
        fitViewPadding: 0.2,
        onLinkMouseOver: (linkIndex) => {
          const [a, b] = [data.links[linkIndex * 2], data.links[linkIndex * 2 + 1]];
          stage.say(`onLinkMouseOver: link ${linkIndex} (${a} to ${b})`, 'ok');
        },
        onLinkMouseOut: () => stage.say('onLinkMouseOut'),
      },
      stage.device(),
    ),
  );
  load(graph, data);

  stage.slider('hoveredLinkWidthIncrease', 0, 15, 1, 5, (v) => graph.setConfigPartial({ hoveredLinkWidthIncrease: v }));
  stage.select(
    'hoveredLinkColor',
    [
      { value: '#ffd84d', label: 'yellow' },
      { value: '#ff5d73', label: 'red' },
      { value: '#5de2ff', label: 'cyan' },
    ],
    '#ffd84d',
    (v) => graph.setConfigPartial({ hoveredLinkColor: v }),
  );

  if (stage.preview) {
    // No pointer in a card: a pretend one visits links, then the empty corner.
    const pointer = ghost(stage.div, graph);
    const link = [18, 45, 40, 27];
    let n = 0;
    stage.after(1000, () =>
      stage.every(1700, () => {
        if (n % 5 === 4) pointer.moveTo(10, 10);
        else {
          const l = link[n % 5] ?? 0;
          pointer.toLink(data.links[l * 2] ?? 0, data.links[l * 2 + 1] ?? 0);
        }
        n++;
      }),
    );
  }
  return () => stage.dispose();
};

export default mount;
