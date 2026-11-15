// onTransitionStart, onTransition and onTransitionEnd(interrupted)
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { colors, hsl } from '../../shared/color.ts';
import { circlePositions, gridPositions } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Start a move, or start a second one while the first is still running to see interrupted: true.' });
  const count = 80;
  const grid = gridPositions(count);
  const circle = circlePositions(count);
  const panel = stage.side();
  const lines: string[] = [];
  let frames = 0;
  const log = (line: string, tone: 'ok' | 'warn' | 'info' = 'info'): void => {
    stage.say(line, tone);
    if (!panel) return;
    lines.push(line);
    if (lines.length > 14) lines.shift();
    panel.textContent = lines.join('\n');
  };

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        transitionDuration: 1600,
        pointDefaultSize: 8,
        fitViewDelay: 300,
        fitViewPadding: 0.2,
        onTransitionStart: () => {
          frames = 0;
          log('onTransitionStart()');
        },
        onTransition: (progress) => {
          frames++;
          // Every frame calls this: show it in the caption, log only now and then.
          if (frames % 12 === 1) log(`onTransition(${progress.toFixed(2)})`);
          else stage.say(`onTransition(${progress.toFixed(2)})`);
        },
        onTransitionEnd: (interrupted) => log(`onTransitionEnd(${interrupted})`, interrupted ? 'warn' : 'ok'),
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(grid);
  graph.setPointColors(colors(count, (i) => hsl((i / count) * 300, 0.8, 0.6)));
  graph.render();

  let round = false;
  const move = async (): Promise<void> => {
    await graph.ready;
    round = !round;
    graph.setPointPositions(round ? circle : grid);
    graph.render();
  };
  const interrupt = async (): Promise<void> => {
    await move();
    await stage.wait(600);
    await move(); // a new render while the first move runs ends it with interrupted: true
  };

  stage.button('Move', () => void move());
  stage.button('Move, then interrupt it', () => void interrupt());
  stage.say('Press Move to watch the callbacks');
  if (stage.preview) {
    stage.cycle([{ run: move, hold: 2800 }, { run: interrupt, hold: 3200 }]);
  }
  return () => stage.dispose();
};

export default mount;
