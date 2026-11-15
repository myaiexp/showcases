// setPointStrokeColors and setPointStrokeWidths animate on the next render()
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { perItem } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';
import { gridPositions } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The stroke is the ring round each point. Its colour and width animate like fill and size.' });
  const cols = 9;
  const count = cols * cols;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        transitionDuration: 1000,
        pointDefaultSize: 16,
        pointDefaultColor: '#2c3a52',
        pointDefaultStrokeWidth: 1,
        fitViewDelay: 300,
        fitViewPadding: 0.2,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(gridPositions(count, 300));
  graph.setPointStrokeColors(colors(count, () => [0.7, 0.75, 0.85, 1]));
  graph.setPointStrokeWidths(perItem(count, () => 1));
  graph.render();

  let tinted = false;
  const recolor = async (): Promise<void> => {
    await graph.ready;
    tinted = !tinted;
    graph.setPointStrokeColors(colors(count, (i) => (tinted ? hsl((i / count) * 360, 0.9, 0.62) : [0.7, 0.75, 0.85, 1])));
    graph.render();
    stage.say('setPointStrokeColors(…); render(): the rings change colour');
  };
  let thick = false;
  const widen = async (): Promise<void> => {
    await graph.ready;
    thick = !thick;
    graph.setPointStrokeWidths(perItem(count, (i) => (thick ? 1 + (i % cols) * 0.8 : 1)));
    graph.render();
    stage.say('setPointStrokeWidths(…); render(): the rings widen left to right');
  };

  stage.button('Stroke colours', () => void recolor());
  stage.button('Stroke widths', () => void widen());
  stage.say('Press a button to animate the strokes');
  if (stage.preview) stage.cycle([{ run: recolor }, { run: widen }, { run: recolor }, { run: widen }], 2200);
  return () => stage.dispose();
};

export default mount;
