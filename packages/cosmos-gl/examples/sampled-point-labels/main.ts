// getSampledPointPositionsMap picks evenly spread visible points to label
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scatter } from '../../shared/data.ts';
import { frames, overlay, type Tag } from '../../shared/overlay.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom with the wheel: new labels appear as points spread out. The slider sets the spacing.' });
  const labels = overlay(stage);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 5,
        pointDefaultColor: '#6ea8ff',
        pointSamplingDistance: stage.preview ? 55 : 90, // one sampled point per this many px
        fitViewDelay: 300,
        fitViewPadding: 0.1,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(900, 240, 3));
  graph.render();
  stage.say('One label per sampled point');

  frames(stage, () => {
    if (!graph.isReady) return;
    // The latest completed sample: empty until the first copy lands, then one frame behind.
    const sample = graph.getSampledPointPositionsMap({ nonBlocking: true });
    const tags: [number, Tag][] = [];
    for (const [index, position] of sample) {
      const [x, y] = graph.spaceToScreenPosition(position);
      tags.push([index, { x, y, text: String(index), offset: 8 }]);
    }
    labels.show(tags);
  });

  stage.slider('pointSamplingDistance (px)', 30, 200, 10, 90, (v) => {
    graph.setConfigPartial({ pointSamplingDistance: v });
    stage.say(`pointSamplingDistance: ${v}. Larger means fewer labels.`);
  });
  if (stage.preview) {
    // No wheel in a card: zoom in and out by code so the sample changes.
    let base = 1;
    stage.after(900, () => (base = graph.getZoomLevel()));
    let n = 0;
    stage.every(2600, () => {
      n++;
      graph.setZoomLevel(n % 2 ? base * 2.2 : base, 1200);
      stage.say(n % 2 ? 'Zoomed in: other points get labels' : 'Zoomed out');
    });
  }
  return () => stage.dispose();
};

export default mount;
