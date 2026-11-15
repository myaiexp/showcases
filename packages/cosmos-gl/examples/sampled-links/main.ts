// getSampledLinks returns link indices, midpoints and angles as arrays
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';
import { marks } from '../../shared/overlay.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each yellow tick lies on a sampled link, turned by the angle the call returns.' });
  const data = web(10, 4, 34);
  const ticks = marks(stage);
  const panel = stage.side();

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 5,
        linkDefaultColor: '#6a7080',
        linkSamplingDistance: stage.preview ? 45 : 70,
        fitViewDelay: 300,
        fitViewPadding: 0.1,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setLinks(data.links);
  graph.render();

  stage.every(150, () => {
    if (!graph.isReady) return;
    const { indices, positions, angles } = graph.getSampledLinks();
    const items = indices.map((_, k) => {
      const [x, y] = graph.spaceToScreenPosition([positions[k * 2] ?? 0, positions[k * 2 + 1] ?? 0]);
      return { x, y, angle: angles[k] ?? 0 };
    });
    ticks.show(items, 'tick', stage.preview ? 7 : 10);
    stage.say(`getSampledLinks(): ${indices.length} of ${data.links.length / 2} links sampled`);
    if (panel) {
      panel.textContent = `indices: [${indices.slice(0, 14).join(', ')}${indices.length > 14 ? ', …' : ''}]\n\nangles (rad): [${angles
        .slice(0, 6)
        .map((a) => a.toFixed(2))
        .join(', ')}, …]`;
    }
  });

  stage.slider('linkSamplingDistance (px)', 20, 200, 10, 70, (v) => graph.setConfigPartial({ linkSamplingDistance: v }));
  if (stage.preview) {
    let base = 1;
    stage.after(900, () => (base = graph.getZoomLevel()));
    let n = 0;
    stage.every(2800, () => graph.setZoomLevel(++n % 2 ? base * 2 : base, 1200));
  }
  return () => stage.dispose();
};

export default mount;
