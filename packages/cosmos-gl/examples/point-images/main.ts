// setImageData, setPointImageIndices, setPointImageSizes: images on points
import { Graph, PointShape } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER, perItem } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { drawIcons, ICON_NAMES } from './icons.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Images are drawn above the shape. Index -1 means no image.' });
  const count = 12;

  const graph = stage.own(
    new Graph(stage.div, { enableSimulation: false, pointDefaultSize: 40, fitViewPadding: 0.2, transitionDuration: 0 }, stage.device()),
  );
  const positions = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    positions[i * 2] = CENTER + ((i % 4) - 1.5) * 70;
    positions[i * 2 + 1] = CENTER + (Math.floor(i / 4) - 1) * 70;
  }
  graph.setPointPositions(positions);
  graph.setPointColors(colors(count, (i) => paletteColor(i)));
  graph.setImageData(drawIcons()); // four ImageData objects, drawn on a canvas in code

  const apply = (shapes: boolean, imageSize: number, withGaps: boolean) => {
    // image i % 4 for each point; every 5th point gets -1 (no image) when withGaps is on
    graph.setPointImageIndices(perItem(count, (i) => (withGaps && i % 5 === 4 ? -1 : i % 4)));
    graph.setPointImageSizes(perItem(count, () => imageSize));
    graph.setPointShapes(perItem(count, (i) => (shapes ? [PointShape.Circle, PointShape.Square, PointShape.Hexagon][i % 3] ?? 0 : PointShape.None)));
    graph.render();
    stage.say(
      `${ICON_NAMES.join(', ')} · image size ${imageSize} · ${shapes ? 'shapes under the images' : 'PointShape.None: images only'}${withGaps ? ' · some points without an image' : ''}`,
    );
  };
  let shapes = true;
  let size = 30;
  let gaps = false;
  const redo = () => apply(shapes, size, gaps);
  redo();
  stage.toggle('Shapes under images', true, (v) => ((shapes = v), redo()));
  stage.toggle('Some points without image', false, (v) => ((gaps = v), redo()));
  stage.slider('Image size', 10, 50, 2, 30, (v) => ((size = v), redo()));
  stage.cycle(
    [
      { run: () => apply(true, 30, false) },
      { run: () => apply(true, 44, false) },
      { run: () => apply(false, 36, false) },
      { run: () => apply(true, 24, true) },
    ],
    2200,
  );
  return () => stage.dispose();
};

export default mount;
