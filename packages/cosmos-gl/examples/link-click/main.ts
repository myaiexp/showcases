// onLinkClick reports the clicked link; here it also takes the focus
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { eventLog } from '../../shared/log.ts';
import { web } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a link. Click empty space to clear.' });
  const log = eventLog(stage);
  const data = web(8, 3, 34); // long links, so a click can tell a link from its two points

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#8a93a3',
        linkDefaultWidth: 3,
        enableSimulation: false, // a fixed web: the layout stays still
        rescalePositions: false,
        hoveredLinkColor: '#ffd84d',
        hoveredLinkCursor: 'pointer',
        focusedLinkWidthIncrease: 5,
        fitViewDelay: 300,
        fitViewPadding: 0.2,
        onLinkClick: (linkIndex) => {
          graph.setConfigPartial({ focusedLinkIndex: linkIndex });
          log(`onLinkClick: link ${linkIndex}, point ${data.links[linkIndex * 2]} to point ${data.links[linkIndex * 2 + 1]}`, 'ok');
        },
        onBackgroundClick: () => {
          graph.setConfigPartial({ focusedLinkIndex: undefined });
          log('onBackgroundClick: link focus cleared');
        },
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  log('Waiting for a click on a link');

  if (stage.preview) {
    const pointer = ghost(stage.div, graph);
    const link = [18, 45, 40];
    let n = 0;
    stage.after(1000, () =>
      stage.every(1800, () => {
        const step = n++ % 4;
        if (step === 3) pointer.moveTo(10, 14);
        else {
          const l = link[step] ?? 0;
          pointer.toLink(data.links[l * 2] ?? 0, data.links[l * 2 + 1] ?? 0);
        }
        stage.after(600, () => pointer.click());
      }),
    );
  }
  return () => stage.dispose();
};

export default mount;
