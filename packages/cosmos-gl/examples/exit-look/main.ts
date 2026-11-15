// Sizes and colours passed for removed points set how they leave
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mesh } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';

type Look = 'default' | 'grow' | 'recolor';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Remove the right half three ways. NaN in a size or colour array means the default fade.' });
  const data = mesh(10, 6, 38);
  const positions = data.positions.slice();
  const base = colors(data.count, (i) => hsl((i / data.count) * 300, 0.8, 0.6));
  const isRight = (i: number): boolean => i % 10 >= 5;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        transitionDuration: 1100,
        pointDefaultSize: 11,
        linkDefaultColor: '#5a6070',
        fitViewDelay: 300,
        fitViewPadding: 0.15,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(positions);
  graph.setPointColors(base);
  graph.setLinks(data.links);
  graph.render();

  const remove = async (look: Look): Promise<void> => {
    await graph.ready;
    const sizes = new Float32Array(data.count).fill(NaN); // NaN: the config default
    const cols = base.slice();
    for (let i = 0; i < data.count; i++) {
      if (!isRight(i)) continue;
      positions[i * 2] = NaN;
      positions[i * 2 + 1] = NaN;
      if (look === 'grow') sizes[i] = 30;
      if (look === 'recolor') cols.set([1, 0.25, 0.25, 1], i * 4);
      if (look !== 'recolor') cols.set([NaN, NaN, NaN, NaN], i * 4);
    }
    graph.setPointPositions(positions);
    // Real values here replace the default exit (size 0, transparent) for the removed points.
    graph.setPointSizes(sizes);
    graph.setPointColors(look === 'default' ? new Float32Array(data.count * 4).fill(NaN) : cols);
    graph.render();
    stage.say(
      look === 'default'
        ? 'NaN sizes and colours: the default exit, shrink to nothing and fade'
        : look === 'grow'
          ? 'Size 30 for the removed points: they swell as they leave'
          : 'Red for the removed points: they turn red as they leave',
    );
  };
  const restore = async (): Promise<void> => {
    await graph.ready;
    positions.set(data.positions);
    graph.setPointPositions(positions);
    graph.setPointSizes(new Float32Array(data.count).fill(NaN));
    graph.setPointColors(base);
    graph.render();
    stage.say('Points restored');
  };

  stage.button('Default exit', () => void remove('default'));
  stage.button('Swell as they leave', () => void remove('grow'));
  stage.button('Turn red as they leave', () => void remove('recolor'));
  stage.button('Restore', () => void restore());
  stage.say('Press a button to remove the right half');
  if (stage.preview) {
    stage.cycle([{ run: () => remove('default') }, { run: restore }, { run: () => remove('grow') }, { run: restore }, { run: () => remove('recolor') }, { run: restore }], 1700);
  }
  return () => stage.dispose();
};

export default mount;
