// setPointPositionsByIndices moves a few points every frame, the rest follow
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mesh, CENTER } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The top row is written by the page every frame; the other rows are moved by the layout.' });
  const cols = stage.preview ? 12 : 18;
  const rows = stage.preview ? 7 : 11;
  const gap = stage.preview ? 18 : 28;
  const data = mesh(cols, rows, gap);
  const top = Array.from({ length: cols }, (_, i) => i); // row 0
  let amp = 60;
  let pinned = true;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#6a7080',
        linkDefaultWidth: 1.5,
        simulationDecay: 100000,
        simulationGravity: 0.02,
        simulationRepulsion: 0.3,
        simulationLinkSpring: 1.5,
        simulationFriction: 0.9,
        fitViewDelay: 800,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => hsl(200 + (Math.floor(i / cols) / rows) * 120, 0.7, 0.62)));
  graph.setLinks(data.links);
  graph.setPinnedPoints(top);
  graph.render();
  stage.refit(graph, 2500);

  const xs = top.map((i) => data.positions[i * 2] ?? 0);
  const y0 = data.positions[1] ?? CENTER;
  const batch = new Float32Array(top.length * 2);
  let calls = 0;
  const tick = (): void => {
    if (!graph.isReady) return;
    const t = performance.now() / 600;
    for (let k = 0; k < top.length; k++) {
      batch[k * 2] = xs[k] ?? 0;
      batch[k * 2 + 1] = y0 + Math.sin(t + k * 0.6) * amp;
    }
    graph.setPointPositionsByIndices(top, batch); // one call, a few texels: no setPointPositions + render()
    calls++;
  };
  stage.every(16, tick);
  stage.every(300, () =>
    stage.say(`setPointPositionsByIndices(${top.length} indices, positions) called ${calls} times; the top row is ${pinned ? 'pinned' : 'not pinned, so the forces tug at it'}`),
  );
  stage.slider('Wave height', 0, 120, 1, amp, (v) => (amp = v));
  stage.toggle('Pin the written points', true, (on) => {
    pinned = on;
    graph.setPinnedPoints(on ? top : []);
  });
  if (stage.preview) stage.cycle([{ run: () => (amp = 60) }, { run: () => (amp = 15) }, { run: () => (amp = 90) }], 2800);
  return () => stage.dispose();
};

export default mount;
