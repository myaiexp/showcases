// simulationCenter versus simulationGravity on a graph that starts off-centre
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { load } from '../../shared/load.ts';

type Force = 'none' | 'center' | 'gravity';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The cross marks the middle of the space. Pick a force and restart from the left.' });
  const data = communities(3, 25, 5);
  const shifted = (): Float32Array => {
    const p = new Float32Array(data.positions);
    for (let i = 0; i < data.count; i++) p[i * 2] = (p[i * 2] ?? 0) + 160;
    return p;
  };

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        linkDefaultColor: '#5a5f6a',
        simulationGravity: 0,
        simulationCenter: 0,
        fitViewOnInit: false,
        initialZoomLevel: stage.preview ? 0.5 : 1,
      },
      stage.device(),
    ),
  );
  const cross = document.createElement('div');
  cross.style.cssText =
    'position:absolute;inset:0;pointer-events:none;background:' +
    'linear-gradient(#fff6,#fff6) center/1px 20px no-repeat,linear-gradient(#fff6,#fff6) center/20px 1px no-repeat';
  stage.div.append(cross);
  load(graph, { ...data, positions: shifted() });

  let force: Force = 'none';
  let strength = 1;
  const apply = (f: Force, v: number): void => {
    force = f;
    strength = v;
    graph.setConfigPartial({ simulationGravity: f === 'gravity' ? v : 0, simulationCenter: f === 'center' ? v : 0 });
    graph.setPointPositions(shifted());
    graph.render(1, 0);
    const what = {
      none: 'No centering force: the graph spreads out where it started.',
      center: `simulationCenter ${v}: the graph's middle is pulled to the cross, its size is left alone.`,
      gravity: `simulationGravity ${v}: every point is pulled to the cross, so the graph also shrinks.`,
    };
    stage.say(what[f]);
  };
  stage.select<Force>(
    'force',
    [
      { value: 'none', label: 'none' },
      { value: 'center', label: 'simulationCenter' },
      { value: 'gravity', label: 'simulationGravity' },
    ],
    'none',
    (f) => apply(f, strength),
  );
  stage.slider('strength', 0, 1, 0.05, 1, (v) => apply(force, v));
  stage.button('Restart from the left', () => apply(force, strength));
  apply('none', 1);

  if (stage.preview) {
    stage.cycle(
      (['none', 'center', 'gravity'] as const).map((f) => ({ run: () => apply(f, f === 'gravity' ? 0.4 : 1) })),
      3200,
    );
  }
  return () => stage.dispose();
};

export default mount;
