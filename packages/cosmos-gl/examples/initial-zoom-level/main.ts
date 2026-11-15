// initialZoomLevel sets the zoom the graph opens at, once, when it is created
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rebuilder } from '../../shared/rebuild.ts';
import { resetZoom } from '../../shared/reset-zoom.ts';
import { mesh } from '../../shared/data.ts';
import { load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The level is read once at creation, so each choice builds the graph again.' });
  const data = mesh(24, 16, 10);
  const build = rebuilder(stage);

  const run = (level: number): void => {
    resetZoom(stage.div);
    const graph = build.adopt(
      new Graph(
        stage.div,
        {
          pointDefaultSize: 6,
          linkDefaultColor: '#4a505c',
          enableSimulation: false, // a fixed grid
          rescalePositions: false,
          fitViewOnInit: false, // otherwise the fit would replace the initial level
          initialZoomLevel: level,
        },
        build.device,
      ),
    );
    load(graph, data);
    stage.say(`initialZoomLevel: ${level}`);
  };

  let level = 1;
  stage.select(
    'initialZoomLevel',
    [0.5, 1, 2, 4].map((v) => ({ value: String(v), label: String(v) })),
    '1',
    (v) => run((level = Number(v))),
  );
  stage.button('Build the graph again', () => run(level));
  run(1);

  if (stage.preview) {
    const levels = [1, 2, 0.5, 4];
    let n = 0;
    stage.every(3000, () => run(levels[++n % levels.length] ?? 1));
  }
  return () => stage.dispose();
};

export default mount;
