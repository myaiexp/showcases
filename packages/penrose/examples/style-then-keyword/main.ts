// A then B = B * A, so the order on the page is the order of application
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (compose: string): string => `canvas {
  width = 520
  height = 420
}

axes {
  across = Line {
    start : (0 - 250, 0)
    end : (250, 0)
    strokeWidth : 1.5
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
  }
  up = Line {
    start : (0, 0 - 200)
    end : (0, 200)
    strokeWidth : 1.5
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
  }
}

forall Square q {
  corners = ((0 - 35, 0 - 35), (35, 0 - 35), (35, 35), (0 - 35, 35))
  mat3x3 M = ${compose}

  q.before = Polygon {
    points : corners
    fillColor : none()
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
    strokeWidth : 3.0
    strokeStyle : "dashed"
  }
  q.after = Polygon {
    points : fromHomogeneousList(matrixMultiplyList(M, toHomogeneousList(corners)))
    fillColor : rgba(0.95, 0.6, 0.3, 0.7)
    strokeColor : rgba(0.6, 0.3, 0.0, 1.0)
    strokeWidth : 4.0
  }
}
`;
  const first = style('translate(110, 0) then rotate(0.8)');
  playground(stage, {
    domain: `type Square
`,
    substance: `Square Q
NoLabel Q
`,
    style: first,
    variants: [
      { label: 'translate then rotate', style: first },
      { label: 'rotate then translate', style: style('rotate(0.8) then translate(110, 0)') },
      { label: 'rotate * translate', style: style('rotate(0.8) * translate(110, 0)') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
