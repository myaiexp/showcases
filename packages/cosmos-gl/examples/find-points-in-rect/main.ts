// findPointsInRect returns the points inside a rectangle given in screen pixels
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scatter } from '../../shared/data.ts';
import { selection, type Path } from '../../shared/selection.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a rectangle over the points.' });
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
  graph.setPointPositions(scatter(count, 210, 9));
  graph.render();

  const select = async (path: Path | null): Promise<void> => {
    await graph.ready;
    if (!path) {
      graph.setConfigPartial({ highlightedPointIndices: undefined });
      stage.say('Drag a rectangle');
      return;
    }
    const [a, b] = path as [[number, number], [number, number]];
    // Corners as [[left, top], [right, bottom]] in px inside the canvas.
    const found = graph.findPointsInRect([
      [Math.min(a[0], b[0]), Math.min(a[1], b[1])],
      [Math.max(a[0], b[0]), Math.max(a[1], b[1])],
    ]);
    graph.setConfigPartial({ highlightedPointIndices: found.length ? found : undefined });
    stage.say(`findPointsInRect: ${found.length} points inside`, found.length ? 'ok' : 'info');
  };
  const sel = selection(stage, 'rect', (p) => void select(p));
  stage.say('Drag a rectangle');

  if (stage.preview) {
    // A rectangle drifts across the cloud on its own.
    let t = 0;
    stage.every(150, () => {
      t += 0.12;
      const w = stage.div.clientWidth;
      const h = stage.div.clientHeight;
      const cx = w / 2 + Math.cos(t) * w * 0.22;
      const cy = h / 2 + Math.sin(t * 1.3) * h * 0.18;
      sel.set([
        [cx - 40, cy - 28],
        [cx + 40, cy + 28],
      ]);
    });
  }
  return () => stage.dispose();
};

export default mount;
