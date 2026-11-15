// crossProductMatrix(u) * v = u x v, drawn as three arrows in 3D
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const arrow = (name: string, vector: string, color: string): string => `
  vec3 ${name}Tip = project(${vector}, view, lens, viewport)
  c.${name} = Line {
    start : origin
    end : (${name}Tip[0], ${name}Tip[1])
    strokeWidth : 5.0
    strokeColor : ${color}
    endArrowhead : "straight"
  }
  c.${name}Name = Text {
    string : "${name === 'w' ? 'u × v' : name}"
    center : (${name}Tip[0], ${name}Tip[1]) + (16, 16)
    fontSize : "24px"
    fillColor : ${color}
  }`;
  const style = (u: string, v: string): string => `canvas {
  width = 520
  height = 420
}

forall Cross c {
  vec3 u = ${u}
  vec3 v = ${v}
  mat3x3 U = crossProductMatrix(u)
  vec3 w = U * v
  mat4x4 view = lookAt((3.0, 2.5, 5.0), (0.0, 0.0, 0.0), (0.0, 1.0, 0.0))
  mat4x4 lens = perspective(40.0, 1.0, 0.1, 50.0)
  -- perspective() flips y; a negative viewport height flips it back
  vec4 viewport = (0 - 210, 210, 420, 0 - 420)
  vec3 o = project((0.0, 0.0, 0.0), view, lens, viewport)
  vec2 origin = (o[0], o[1])
${arrow('u', 'u', 'rgba(0.2, 0.4, 0.85, 1.0)')}
${arrow('v', 'v', 'rgba(0.2, 0.65, 0.35, 1.0)')}
${arrow('w', 'w', 'rgba(0.9, 0.25, 0.2, 1.0)')}
}
`;
  const axes = style('(1.3, 0.0, 0.0)', '(0.0, 1.3, 0.0)');
  playground(stage, {
    domain: `type Cross
`,
    substance: `Cross C
NoLabel C
`,
    style: axes,
    variants: [
      { label: 'u along x, v along y', style: axes },
      { label: 'u (0, 1.2, 0), v (0, 0, 1.2)', style: style('(0.0, 1.2, 0.0)', '(0.0, 0.0, 1.2)') },
      { label: 'u (1.2, 0, 0.8), v (0, 1.2, 0.4)', style: style('(1.2, 0.0, 0.8)', '(0.0, 1.2, 0.4)') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
