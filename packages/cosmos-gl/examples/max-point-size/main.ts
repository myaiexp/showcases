// graph.maxPointSize is the largest point the GPU can draw
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the requested size up past graph.maxPointSize and see whether the point keeps growing.' });

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, transitionDuration: 0, pointDefaultSize: 20, pointDefaultColor: '#6ea8ff', fitViewOnInit: false },
      stage.device(),
    ),
  );
  graph.setPointPositions(new Float32Array([CENTER, CENTER]));
  graph.render();
  void graph.ready.then(() => graph.fitViewByPointPositions([CENTER - 40, CENTER - 40, CENTER + 40, CENTER + 40], 0, 0.1));

  const ask = async (size: number): Promise<void> => {
    await graph.ready;
    const max = graph.maxPointSize;
    graph.setPointSizes(new Float32Array([size]));
    graph.render();
    stage.say(
      size > max ? `Asked for ${size}: more than maxPointSize (${max})` : `Asked for ${size}: within maxPointSize (${max})`,
      size > max ? 'warn' : 'ok',
    );
  };
  stage.after(400, () => {
    if (graph.isReady) stage.say(`graph.maxPointSize = ${graph.maxPointSize}`);
  });
  stage.slider('requested point size', 4, 2000, 4, 20, (v) => void ask(v));
  if (stage.preview) {
    stage.cycle([{ run: () => ask(20) }, { run: () => ask(120) }, { run: async () => ask((await graph.ready.then(() => graph.maxPointSize)) * 2) }], 1800);
  }
  return () => stage.dispose();
};

export default mount;
