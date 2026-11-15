// Scalar-vector, vector-vector and elementwise operators on 2D arrows
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (result: string, name: string, operand: string): string => `canvas {
  width = 640
  height = 420
}

forall Arrow a {
  vec2 o = (0 - 230, 0 - 40)
  vec2 u = (180, 50)
  vec2 res = ${result}

  a.u = Line {
    start : o
    end : o + u
    strokeWidth : 4.0
    strokeColor : rgba(0.2, 0.4, 0.85, 1.0)
    endArrowhead : "straight"
  }
  a.uName = Text {
    string : "u"
    center : o + u + (0, 22)
    fontSize : "24px"
    fillColor : rgba(0.2, 0.4, 0.85, 1.0)
  }
  ${operand}
  a.result = Line {
    start : o
    end : o + res
    strokeWidth : 6.0
    strokeColor : rgba(0.9, 0.25, 0.2, 1.0)
    endArrowhead : "straight"
  }
  a.name = Text {
    string : "${name}"
    center : o + res + (0, 0 - 24)
    fontSize : "24px"
    fillColor : rgba(0.9, 0.25, 0.2, 1.0)
  }
}
`;
  const second = `vec2 v = (50, 120)
  a.v = Line {
    start : o
    end : o + v
    strokeWidth : 4.0
    strokeColor : rgba(0.2, 0.65, 0.35, 1.0)
    endArrowhead : "straight"
  }
  a.vName = Text {
    string : "v"
    center : o + v + (0, 22)
    fontSize : "24px"
    fillColor : rgba(0.2, 0.65, 0.35, 1.0)
  }`;
  const sum = style('u + v', 'u + v', second);
  playground(stage, {
    domain: `type Arrow
`,
    substance: `Arrow A
NoLabel A
`,
    style: sum,
    variants: [
      { label: 'u + v', style: sum },
      { label: 'u - v', style: style('u - v', 'u - v', second) },
      { label: '0.6 * u', style: style('0.6 * u', '0.6 * u', '') },
      { label: 'u / 2', style: style('u / 2', 'u / 2', '') },
      { label: 'u .* (0.5, 2.0)', style: style('u .* (0.5, 2.0)', 'u .* w', '') },
      { label: 'u ./ (1.5, 0.5)', style: style('u ./ (1.5, 0.5)', 'u ./ w', '') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
