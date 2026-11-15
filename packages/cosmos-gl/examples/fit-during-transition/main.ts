// fitView() during a position transition frames where the points are going
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { colors, hsl } from '../../shared/color.ts';
import { gridPositions } from '../../shared/shapes.ts';

const shift = (a: Float32Array, dx: number, dy: number): Float32Array => a.map((v, i) => v + (i % 2 ? dy : dx));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The block moves far to the other side. Try the camera at once, or only after the move.' });
  const count = 64;
  const home = shift(gridPositions(count, 130), -190, -110);
  const away = shift(gridPositions(count, 130), 190, 110);

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, transitionDuration: 1600, pointDefaultSize: 8, fitViewDelay: 300, fitViewPadding: 0.25 },
      stage.device(),
    ),
  );
  graph.setPointPositions(home);
  graph.setPointColors(colors(count, (i) => hsl((i / count) * 300, 0.8, 0.6)));
  graph.render();

  let atAway = false;
  let early = true;
  const move = async (fitEarly: boolean): Promise<void> => {
    await graph.ready;
    atAway = !atAway;
    graph.setPointPositions(atAway ? away : home);
    graph.render();
    if (fitEarly) {
      // Called while the points are still at the start: it frames the target.
      graph.fitView(1600, 0.25);
      stage.say('fitView() right after render(): the camera heads for where the points will be');
    } else {
      stage.say('No fitView yet: the points leave the view');
      stage.after(1900, () => {
        graph.fitView(600, 0.25);
        stage.say('fitView() after the move: the camera catches up');
      });
    }
  };

  stage.toggle('fitView() right after render()', true, (on) => {
    early = on;
  });
  stage.button('Move', () => void move(early));
  stage.say('Press Move');
  if (stage.preview) {
    let n = 0;
    stage.cycle([{ run: () => move(n++ % 2 === 0), hold: 3600 }]);
  }
  return () => stage.dispose();
};

export default mount;
