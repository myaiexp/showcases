// A layout grows past spaceSize and getPointPositions reads back outside it
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';
import { keepFramed } from '../../shared/load.ts';

const SPACE = 300;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dashed orange square is the space, 0 to 300. The layout does not stop at its edge.' });
  const data = tree(160, 12, 40);
  // tree() centres on 2048; shift it onto this space's centre (150, 150).
  for (let i = 0; i < data.count * 2; i++) data.positions[i] = (data.positions[i] ?? 0) - 2048 + SPACE / 2;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        spaceSize: SPACE,
        rescalePositions: false,
        pointDefaultSize: 6,
        linkDefaultColor: '#5a5f6a',
        simulationGravity: 0,
        simulationRepulsion: 1.5,
        simulationDecay: 4000,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => hsl((i / data.count) * 300, 0.7, 0.62)));
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph, 2500);

  const box = document.createElement('div');
  box.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none;border:2px dashed #ffb347;box-sizing:border-box;display:none';
  stage.div.append(box);
  let frame = 0;
  const place = (): void => {
    frame = requestAnimationFrame(place);
    if (!graph.isReady) return;
    const [x0, y0] = graph.spaceToScreenPosition([0, 0]);
    const [x1, y1] = graph.spaceToScreenPosition([SPACE, SPACE]);
    box.style.display = '';
    box.style.transform = `translate(${x0}px, ${y0}px)`;
    box.style.width = `${x1 - x0}px`;
    box.style.height = `${y1 - y0}px`;
  };
  frame = requestAnimationFrame(place);
  stage.onDispose(() => cancelAnimationFrame(frame));

  stage.every(700, () => {
    if (!graph.isReady) return;
    const p = graph.getPointPositions();
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i < p.length; i++) {
      lo = Math.min(lo, p[i] ?? 0);
      hi = Math.max(hi, p[i] ?? 0);
    }
    stage.say(`spaceSize ${SPACE}: positions read back from ${Math.round(lo)} to ${Math.round(hi)}`, lo < 0 || hi > SPACE ? 'warn' : 'info');
  });
  stage.button('Restart', () => {
    graph.setPointPositions(data.positions);
    graph.render(1, 0);
  });
  if (stage.preview) {
    stage.every(7000, () => {
      graph.setPointPositions(data.positions);
      graph.render(1, 0);
    });
  }
  return () => stage.dispose();
};

export default mount;
