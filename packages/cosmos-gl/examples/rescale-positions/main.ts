// rescalePositions spreads 0..1 data; getScaleX/getScaleY read the map
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rebuilder } from '../../shared/rebuild.ts';
import { rng } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The data is 0..1. Switch rescalePositions and the layout sees different coordinates.' });
  const rb = rebuilder(stage);
  const panel = stage.side();

  // 40 points with coordinates between 0 and 1, joined in a chain with a few cross links.
  const r = rng(3);
  const count = 40;
  const positions = new Float32Array(count * 2).map(() => r());
  const links: number[] = [];
  for (let i = 1; i < count; i++) links.push(i - 1, i);
  for (let i = 0; i < 8; i++) links.push(Math.floor(r() * count), Math.floor(r() * count));

  const show = async (rescale: boolean) => {
    const graph = rb.adopt(new Graph(stage.div, {
      rescalePositions: rescale,
      pointDefaultSize: 7,
      linkDefaultColor: '#667',
      fitViewDelay: 2000,
    }, rb.device));
    graph.setPointPositions(positions); // 0..1 in, whatever rescalePositions says out
    graph.setLinks(new Float32Array(links));
    graph.render();
    stage.say(`rescalePositions: ${rescale}`);
    await stage.wait(300);
    const sx = graph.getScaleX();
    const sy = graph.getScaleY();
    const read = graph.getPointPositions();
    const text = [
      `rescalePositions: ${rescale}`,
      sx ? `getScaleX()(0) = ${sx(0).toFixed(0)}, (1) = ${sx(1).toFixed(0)}` : 'getScaleX() is undefined',
      sy ? `getScaleY()(0) = ${sy(0).toFixed(0)}, (1) = ${sy(1).toFixed(0)}` : 'getScaleY() is undefined',
      `point 0 as read back: (${(read[0] ?? 0).toFixed(2)}, ${(read[1] ?? 0).toFixed(2)})`,
    ];
    if (panel) panel.textContent = text.join('\n');
    stage.say(text.slice(0, 2).join(' · '));
    graph.fitView(0, 0.2);
  };

  stage.button('rescalePositions: true', () => void show(true));
  stage.button('rescalePositions: false', () => void show(false));
  let on = true;
  stage.cycle([{ run: () => show((on = !on)) }], 3500);
  void show(true);
  return () => stage.dispose();
};

export default mount;
