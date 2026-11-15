// getSampledLinkPositionsMap gives midpoints and angles for turned labels
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';
import { overlay, type Tag } from '../../shared/overlay.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each label sits on a link and turns with it. Zoom, or change linkSamplingDistance.' });
  const data = web(10, 4, 34);
  const labels = overlay(stage);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 5,
        linkDefaultColor: '#8a93a3',
        linkSamplingDistance: stage.preview ? 50 : 90,
        fitViewDelay: 300,
        fitViewPadding: 0.1,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setLinks(data.links);
  graph.render();
  stage.say('One label per sampled link');

  const refresh = (): void => {
    if (!graph.isReady) return;
    const tags: [number, Tag][] = [];
    for (const [index, [x, y, angle]] of graph.getSampledLinkPositionsMap()) {
      const [sx, sy] = graph.spaceToScreenPosition([x, y]);
      // The angle is in radians for CSS rotation: 0 = right, positive = clockwise. Keep text upright.
      const upright = Math.abs(angle) > Math.PI / 2 ? angle + Math.PI : angle;
      tags.push([index, { x: sx, y: sy, text: `L${index}`, angle: upright, offset: 7 }]);
    }
    labels.show(tags);
  };
  // This read has no non-blocking form, so refresh on a timer rather than every frame.
  stage.every(150, refresh);

  stage.slider('linkSamplingDistance (px)', 30, 200, 10, 90, (v) => {
    graph.setConfigPartial({ linkSamplingDistance: v });
    stage.say(`linkSamplingDistance: ${v}. Larger means fewer labels.`);
  });
  if (stage.preview) {
    let base = 1;
    stage.after(900, () => (base = graph.getZoomLevel()));
    let n = 0;
    stage.every(2800, () => graph.setZoomLevel(++n % 2 ? base * 2 : base, 1200));
  }
  return () => stage.dispose();
};

export default mount;
