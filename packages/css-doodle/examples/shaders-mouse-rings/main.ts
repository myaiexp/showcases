// u_mouse: rings that follow the pointer
import { createStage } from '../../shared/stage.ts';
import { fakeMouse } from '../../shared/e-kit.ts';
import type { Mount } from '@/types.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the doodle' });
  const doodle = stage.doodle(`
    @grid: 1 / 100%;
    @content: @shaders(
      void main() {
        vec2 p = gl_FragCoord.xy - u_mouse;
        float d = length(p) / u_resolution.y;
        float v = step(0., sin(80.*d - 4.*u_time));
        FragColor = vec4(vec3(v), 1);
      }
    );
  `);
  fakeMouse(stage, doodle, (t) => [0.5 + 0.3 * Math.cos(t * 0.8), 0.5 + 0.3 * Math.sin(t * 1.1)]);
  stage.say('Until the pointer moves, u_mouse is the top-left corner');
  return () => stage.dispose();
};

export default mount;
