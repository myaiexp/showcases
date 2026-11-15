// fitViewByPointPositions frames graph coordinates, not point indices
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER, mesh } from '../../shared/data.ts';
import { load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The box is two corner positions; the points inside it are highlighted.' });
  const data = mesh(30, 20, 10);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 5,
        linkDefaultColor: '#4a505c',
        enableSimulation: false, // a fixed grid: its positions stay where they are placed
        rescalePositions: false,
        pointGreyoutOpacity: 0.4,
        fitViewOnInit: false,
      },
      stage.device(),
    ),
  );
  load(graph, data);
  graph.fitView(0);

  const frame = (cx: number, cy: number, half: number, duration = 800): void => {
    // Two corners, as [x1, y1, x2, y2]: the view is fitted to the box they span.
    const corners = [CENTER + cx - half, CENTER + cy - half, CENTER + cx + half, CENTER + cy + half];
    const inside: number[] = [];
    for (let i = 0; i < data.count; i++) {
      const x = data.positions[i * 2] ?? 0;
      const y = data.positions[i * 2 + 1] ?? 0;
      if (x >= corners[0]! && x <= corners[2]! && y >= corners[1]! && y <= corners[3]!) inside.push(i);
    }
    graph.setConfigPartial({ highlightedPointIndices: inside });
    graph.fitViewByPointPositions(corners, duration, 0.1);
    stage.say(`fitViewByPointPositions([${corners.join(', ')}], ${duration}, 0.1)`);
  };

  let cx = -80;
  let cy = -40;
  let half = 40;
  stage.slider('centre x', -140, 140, 5, cx, (v) => (cx = v));
  stage.slider('centre y', -90, 90, 5, cy, (v) => (cy = v));
  stage.slider('half size', 10, 150, 5, half, (v) => (half = v));
  stage.button('Frame the box', () => frame(cx, cy, half));
  stage.button('Show everything', () => (graph.setConfigPartial({ highlightedPointIndices: undefined }), graph.fitView(800), stage.say('fitView(800)')));

  stage.cycle(
    [
      { run: () => frame(-80, -40, 40) },
      { run: () => frame(90, 50, 25) },
      { run: () => frame(0, 0, 90) },
      { say: 'fitView(): everything again', run: () => (graph.setConfigPartial({ highlightedPointIndices: undefined }), graph.fitView(800)) },
    ],
    2300,
  );
  return () => stage.dispose();
};

export default mount;
