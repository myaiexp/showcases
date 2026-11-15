// zoomToPointByIndex centres the view on a point and zooms in
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Set the point, duration and scale, then zoom.' });
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#5a5f6a',
        simulationDecay: 1500,
        fitViewDelay: 1500,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  // The init fit sees only the start scatter: in the full view, fit again once the layout has spread.
  if (!stage.preview) stage.after(2500, () => graph.fitView(600, 0.12));

  let index = 25;
  let duration = 900;
  let scale = 4;
  let canZoomOut = true;
  const zoom = (): void => {
    graph.setConfigPartial({ focusedPointIndex: index });
    graph.zoomToPointByIndex(index, duration, scale, canZoomOut);
    stage.say(`zoomToPointByIndex(${index}, ${duration}, ${scale}, ${canZoomOut})`);
  };
  stage.slider('index', 0, data.count - 1, 1, index, (v) => (index = v));
  stage.slider('duration (ms)', 0, 3000, 100, duration, (v) => (duration = v));
  stage.slider('scale', 1, 12, 0.5, scale, (v) => (scale = v));
  stage.toggle('canZoomOut', true, (on) => (canZoomOut = on));
  stage.button('Zoom to the point', zoom);
  stage.button('fitView()', () => (graph.fitView(700), stage.say('fitView(700)')));

  stage.cycle(
    [
      { say: 'zoomToPointByIndex(20, 1000, 4)', run: () => (graph.setConfigPartial({ focusedPointIndex: 20 }), graph.zoomToPointByIndex(20, 1000, 4)) },
      { say: 'zoomToPointByIndex(95, 1000, 6)', run: () => (graph.setConfigPartial({ focusedPointIndex: 95 }), graph.zoomToPointByIndex(95, 1000, 6)) },
      { say: 'zoomToPointByIndex(50, 1000, 2, false): no zoom out', run: () => (graph.setConfigPartial({ focusedPointIndex: 50 }), graph.zoomToPointByIndex(50, 1000, 2, false)) },
      { say: 'fitView() to start again', run: () => (graph.setConfigPartial({ focusedPointIndex: undefined }), graph.fitView(1000)) },
    ],
    2600,
  );
  return () => stage.dispose();
};

export default mount;
