// A vertex section replaces the default vertex shader
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100% / #14213d;
    @content: @shaders(
      vertex {
        #version 300 es
        in vec4 position;
        out vec2 v_pos;
        void main() {
          v_pos = position.xy;
          gl_Position = vec4(position.xy * .8, 0., 1.);
        }
      }
      fragment {
        in vec2 v_pos;
        void main() {
          FragColor = vec4(.5 + .5 * v_pos, .5 + .5 * sin(u_time), 1);
        }
      }
    );
  `,
  say: "The quad now covers 80% of the canvas",
});
