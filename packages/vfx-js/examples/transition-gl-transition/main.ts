// createGLTransition fed a hand-written gl-transitions-shaped object
import { createGLTransition, type GLTransitionDef } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { describe, drive, trKit } from '../../shared/tr-kit.ts';

// The shape GLTransitionDef describes. `progress`, `ratio`, `getFromColor` and
// `getToColor` are provided around the shader; its uniforms come from the params.
const squares: GLTransitionDef = {
  name: 'Squares',
  glsl: `
uniform float cells;
uniform float smoothness;
uniform float reverse; // same name as a core uniform: renamed inside, passed as "reverse"

vec4 transition(vec2 uv) {
  vec2 grid = vec2(cells, cells / ratio);
  vec2 cell = floor(uv * grid);
  // Cells start one after the other along the diagonal.
  float order = (cell.x + cell.y) / (grid.x + grid.y);
  if (reverse > 0.5) order = 1.0 - order;
  float m = clamp((progress * (1.0 + smoothness) - order) / smoothness, 0.0, 1.0);
  // A square of the new content grows from the middle of each cell.
  vec2 d = abs(fract(uv * grid) - 0.5) * 2.0;
  return mix(getFromColor(uv), getToColor(uv), step(max(d.x, d.y), m));
}
`,
  defaultParams: { cells: 8, smoothness: 0.3, reverse: 0 },
  paramsTypes: { cells: 'float', smoothness: 'float', reverse: 'float' },
};

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  // A class, made once. Its `params` override defaultParams per run.
  const Squares = createGLTransition(squares);
  const t = vfx.addTransition(box, { transition: Squares, duration: 1.4 });
  const params = { cells: 8, smoothness: 0.3, reverse: 0 };
  drive(kit, t, { label: () => `Squares: ${describe(params)}`, showOpts: () => ({ params: { ...params } }) });

  if (stage.bar) {
    slider(stage.bar, 'cells', 2, 24, 1, params.cells, (v) => (params.cells = v));
    slider(stage.bar, 'smoothness', 0.05, 1, 0.05, params.smoothness, (v) => (params.smoothness = v));
    checkbox(stage.bar, 'reverse param', false, (v) => (params.reverse = v ? 1 : 0));
  }
  return () => stage.dispose();
};

export default mount;
