// getSampledPoints returns indices and positions, thinned by distance
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { frames, marks } from '../../shared/overlay.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The rings mark the sampled points. Pan and zoom: the sample follows the view.' });
  const data = communities(5, 150, 2, 3);
  const rings = marks(stage);
  const panel = stage.side();
  let nonBlocking = true;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 4,
        pointSamplingDistance: stage.preview ? 45 : 70,
        fitViewDelay: 300,
        fitViewPadding: 0.1,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.render();

  let last = '';
  frames(stage, () => {
    if (!graph.isReady) return;
    const { indices, positions } = graph.getSampledPoints(nonBlocking ? { nonBlocking: true } : undefined);
    const items: { x: number; y: number }[] = [];
    for (let k = 0; k < indices.length; k++) {
      const [x, y] = graph.spaceToScreenPosition([positions[k * 2] ?? 0, positions[k * 2 + 1] ?? 0]);
      items.push({ x, y });
    }
    rings.show(items, 'ring', 8);
    const text = `${indices.length} of ${data.count} points sampled`;
    if (text !== last) {
      last = text;
      stage.say(`getSampledPoints(): ${text}`);
      if (panel) panel.textContent = `indices: [${indices.slice(0, 18).join(', ')}${indices.length > 18 ? ', …' : ''}]\n\npositions: [${positions.slice(0, 6).map((v) => v.toFixed(0)).join(', ')}, …]`;
    }
  });

  stage.slider('pointSamplingDistance (px)', 20, 200, 10, 70, (v) => graph.setConfigPartial({ pointSamplingDistance: v }));
  stage.toggle('nonBlocking', true, (on) => {
    nonBlocking = on;
  });
  if (stage.preview) {
    let base = 1;
    stage.after(900, () => (base = graph.getZoomLevel()));
    let n = 0;
    stage.every(2600, () => graph.setZoomLevel(++n % 2 ? base * 2.4 : base, 1200));
  }
  return () => stage.dispose();
};

export default mount;
