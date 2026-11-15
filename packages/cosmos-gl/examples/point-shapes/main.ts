// setPointShapes picks one PointShape per point, from circle to None
import { Graph, PointShape } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER, perItem } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';

const NAMES = ['Circle', 'Square', 'Triangle', 'Diamond', 'Pentagon', 'Hexagon', 'Star', 'Cross', 'None'] as const;
const VALUES = [
  PointShape.Circle, PointShape.Square, PointShape.Triangle, PointShape.Diamond, PointShape.Pentagon,
  PointShape.Hexagon, PointShape.Star, PointShape.Cross, PointShape.None,
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Nine points, one per PointShape value. None draws nothing at all.' });

  const graph = stage.own(
    new Graph(stage.div, { enableSimulation: false, pointDefaultSize: 36, fitViewPadding: 0.25, transitionDuration: 0 }, stage.device()),
  );
  const positions = new Float32Array(18);
  for (let i = 0; i < 9; i++) {
    positions[i * 2] = CENTER + ((i % 3) - 1) * 60;
    positions[i * 2 + 1] = CENTER + (Math.floor(i / 3) - 1) * 60;
  }
  graph.setPointPositions(positions);
  graph.setPointColors(colors(9, (i) => hsl(i * 40, 0.75, 0.62)));

  // Point i gets shape (i + shift) mod 9, so a shift walks every shape through every spot.
  const apply = (shift: number) => {
    graph.setPointShapes(perItem(9, (i) => VALUES[(i + shift) % 9] ?? PointShape.Circle));
    graph.render();
    const row = Array.from({ length: 9 }, (_, i) => NAMES[(i + shift) % 9]).join(', ');
    stage.say(`setPointShapes → ${row}`);
  };
  apply(0);
  stage.slider('Shift', 0, 8, 1, 0, apply);
  stage.cycle([0, 1, 2, 3, 4, 5, 6, 7, 8].map((s) => ({ run: () => apply(s) })), 1500);
  return () => stage.dispose();
};

export default mount;
