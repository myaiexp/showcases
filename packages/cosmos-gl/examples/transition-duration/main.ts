// transitionDuration sets move time; render(undefined, ms) overrides one call
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { colors, hsl } from '../../shared/color.ts';
import { circlePositions, gridPositions } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the duration, then move. 0 snaps. The buttons below override it for one render() call.' });
  const count = 100;
  const grid = gridPositions(count);
  const circle = circlePositions(count);

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, transitionDuration: 800, pointDefaultSize: 8, fitViewDelay: 300, fitViewPadding: 0.2 },
      stage.device(),
    ),
  );
  graph.setPointPositions(grid);
  graph.setPointColors(colors(count, (i) => hsl((i / count) * 300, 0.8, 0.6)));
  graph.render();

  let round = false;
  let duration = 800;
  /** Moves to the other layout; `override` is render()'s own duration argument. */
  const move = async (override?: number): Promise<void> => {
    await graph.ready;
    round = !round;
    graph.setPointPositions(round ? circle : grid);
    graph.render(undefined, override);
    stage.say(
      override === undefined
        ? duration <= 0
          ? 'transitionDuration: 0, so the points snap'
          : `transitionDuration: ${duration}, so the move takes ${duration} ms`
        : override <= 0
          ? 'render(undefined, 0): this one render snaps, whatever transitionDuration is'
          : `render(undefined, ${override}): this one render takes ${override} ms`,
    );
  };
  const setDuration = (ms: number): void => {
    duration = ms;
    graph.setConfigPartial({ transitionDuration: ms });
  };

  stage.say('Move the points to see the duration');
  stage.slider('transitionDuration (ms)', 0, 3000, 100, 800, (v) => {
    setDuration(v);
    stage.say(`transitionDuration: ${v}. Press Move.`);
  });
  stage.button('Move', () => void move());
  stage.button('render(undefined, 0)', () => void move(0));
  stage.button('render(undefined, 2500)', () => void move(2500));
  if (stage.preview) {
    stage.cycle(
      [
        { run: () => (setDuration(0), move()) },
        { run: () => (setDuration(300), move()) },
        { run: () => (setDuration(1600), move()) },
        { run: () => (setDuration(800), move(0)) },
      ],
      2000,
    );
  }
  return () => stage.dispose();
};

export default mount;
