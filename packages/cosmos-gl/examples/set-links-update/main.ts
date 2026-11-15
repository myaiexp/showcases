// setLinks with a new array at runtime: the layout adapts
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scatter } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';

type Wiring = 'chain' | 'hubs' | 'rings';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button hands setLinks a different array for the same 48 points.' });
  const count = 48;
  const wire = (w: Wiring): Float32Array => {
    const out: number[] = [];
    for (let i = 0; i < count; i++) {
      if (w === 'chain' && i + 1 < count) out.push(i, i + 1);
      if (w === 'hubs' && i >= 4) out.push(i, i % 4);
      if (w === 'rings') out.push(i, i < 24 ? (i + 1) % 24 : 24 + ((i - 24 + 1) % 24));
    }
    if (w === 'hubs') out.push(0, 1, 1, 2, 2, 3);
    return new Float32Array(out);
  };

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#6a7080',
        simulationDecay: 5000,
        simulationLinkDistance: 8,
        simulationRepulsion: 0.6,
        fitViewDelay: 900,
        fitViewPadding: 0.15,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(count, 160, 2));
  graph.setPointColors(colors(count, (i) => hsl((i / count) * 300, 0.8, 0.6)));
  graph.setLinks(wire('chain'));
  graph.render();
  stage.refit(graph, 2200);

  const rewire = async (w: Wiring): Promise<void> => {
    await graph.ready;
    graph.setLinks(wire(w));
    graph.render();
    graph.start(1); // wake the layout so it settles into the new shape
    if (!stage.preview) stage.after(2600, () => graph.fitView(600, 0.15));
    stage.say(
      w === 'chain'
        ? 'setLinks: one long chain'
        : w === 'hubs'
          ? 'setLinks: four hubs, every other point hangs from one'
          : 'setLinks: two separate rings',
    );
  };

  stage.button('Chain', () => void rewire('chain'));
  stage.button('Four hubs', () => void rewire('hubs'));
  stage.button('Two rings', () => void rewire('rings'));
  stage.say('setLinks: one long chain');
  if (stage.preview) stage.cycle((['hubs', 'rings', 'chain'] as const).map((w) => ({ run: () => rewire(w) })), 3400);
  return () => stage.dispose();
};

export default mount;
