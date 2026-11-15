// findPointsInPolygon returns the points inside any outline, such as a lasso
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scatter } from '../../shared/data.ts';
import { selection, type Path } from '../../shared/selection.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Draw a loop round some points.' });
  const count = 400;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 7,
        pointDefaultColor: '#6ea8ff',
        pointGreyoutOpacity: 0.35,
        fitViewDelay: 300,
        fitViewPadding: 0.1,
        enableZoom: false,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(count, 210, 12));
  graph.render();

  const select = async (path: Path | null): Promise<void> => {
    await graph.ready;
    if (!path) {
      graph.setConfigPartial({ highlightedPointIndices: undefined });
      stage.say('Draw a lasso');
      return;
    }
    const found = path.length > 2 ? graph.findPointsInPolygon(path) : [];
    graph.setConfigPartial({ highlightedPointIndices: found.length ? found : undefined });
    stage.say(`findPointsInPolygon: ${found.length} points inside the ${path.length}-corner outline`, found.length ? 'ok' : 'info');
  };
  const sel = selection(stage, 'lasso', (p) => void select(p));
  stage.say('Draw a lasso');

  if (stage.preview) {
    // A wobbling star outline turns slowly over the cloud.
    let t = 0;
    stage.every(150, () => {
      t += 0.1;
      const w = stage.div.clientWidth;
      const h = stage.div.clientHeight;
      const path: Path = [];
      for (let k = 0; k < 10; k++) {
        const a = (k / 10) * Math.PI * 2 + t;
        const r = (k % 2 ? 0.16 : 0.3) * Math.min(w, h);
        path.push([w / 2 + Math.cos(a) * r * 1.2, h / 2 + Math.sin(a) * r]);
      }
      sel.set(path);
    });
  }
  return () => stage.dispose();
};

export default mount;
