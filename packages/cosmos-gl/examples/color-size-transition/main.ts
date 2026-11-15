// setPointColors and setPointSizes fade and grow on the next render()
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { perItem } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';
import { gridPositions } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button changes one array and calls render(): the change animates instead of jumping.' });
  const cols = 12;
  const count = cols * cols;
  const radius = (i: number): number => Math.hypot((i % cols) - (cols - 1) / 2, Math.floor(i / cols) - (cols - 1) / 2) / (cols / 1.4);

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, transitionDuration: 1000, pointDefaultSize: 8, fitViewDelay: 300, fitViewPadding: 0.2 },
      stage.device(),
    ),
  );
  graph.setPointPositions(gridPositions(count, 330));
  graph.setPointColors(colors(count, () => [0.45, 0.7, 1, 1]));
  graph.setPointSizes(perItem(count, () => 8));
  graph.render();

  let flip = false;
  const recolor = async (): Promise<void> => {
    await graph.ready;
    flip = !flip;
    graph.setPointColors(colors(count, (i) => (flip ? hsl(radius(i) * 320, 0.85, 0.6) : [0.45, 0.7, 1, 1])));
    graph.render();
    stage.say('setPointColors(…); render(): every point fades to its new colour');
  };
  let big = false;
  const resize = async (): Promise<void> => {
    await graph.ready;
    big = !big;
    graph.setPointSizes(perItem(count, (i) => (big ? 5 + (1 - Math.min(1, radius(i))) * 22 : 8)));
    graph.render();
    stage.say('setPointSizes(…); render(): every point grows or shrinks');
  };
  const both = async (): Promise<void> => {
    await graph.ready;
    flip = !flip;
    big = !big;
    graph.setPointColors(colors(count, (i) => (flip ? hsl(radius(i) * 320, 0.85, 0.6) : [0.45, 0.7, 1, 1])));
    graph.setPointSizes(perItem(count, (i) => (big ? 5 + (1 - Math.min(1, radius(i))) * 22 : 8)));
    graph.render();
    stage.say('Both setters, one render(): they share one transition');
  };

  stage.button('Recolour', () => void recolor());
  stage.button('Resize', () => void resize());
  stage.button('Both', () => void both());
  stage.say('Press a button to animate colours or sizes');
  if (stage.preview) stage.cycle([{ run: recolor }, { run: resize }, { run: both }, { run: both }], 2200);
  return () => stage.dispose();
};

export default mount;
