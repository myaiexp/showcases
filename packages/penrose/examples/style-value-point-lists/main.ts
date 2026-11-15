// A point list is a matrix of vectors or a list of lists, with unknowns
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (points: string): string => `canvas {
  width = 500
  height = 340
}

forall Shape s {
  s.tri = Polygon {
    points : ${points}
    fillColor : rgba(0.45, 0.75, 0.55, 0.6)
    strokeColor : rgba(0.1, 0.4, 0.2, 1.0)
    strokeWidth : 4.0
    ensureOnCanvas : false
  }
}
`;
  const matrix = style('((-120, -90), (120, -90), (0, 110))');
  playground(stage, {
    domain: `type Shape
`,
    substance: `Shape T
NoLabel T
`,
    style: matrix,
    variants: [
      { label: 'matrix of vectors', style: matrix },
      { label: 'list of lists', style: style('[[-120, -90], [120, -90], [0, 110]]') },
      { label: 'unknown apex x', style: style('((-120, -90), (120, -90), (?, 110))') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
