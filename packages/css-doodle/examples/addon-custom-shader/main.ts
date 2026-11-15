// CSSDoodle.use(name, { shader }) adds an image function drawn with WebGL, like @pattern
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

interface ShaderApi {
  color(value: string, space?: string): [number, number, number, number] | null;
  expr(text: string): string | null;
  split(text: string): string[];
}
type DoodleClass = { use(name: string, def: { shader(text: string, api: ShaderApi): string }): void };

// @showcase-rings(color, speed): rings of one colour; speed is math, so it may read t.
customElements.whenDefined('css-doodle').then(() => {
  const CSSDoodle = customElements.get('css-doodle') as unknown as DoodleClass;
  CSSDoodle.use('showcase-rings', {
    shader: (text, { color, expr, split }) => {
      const [c = 'white', s = '1'] = split(text);
      const [r, g, b] = color(c) ?? [1, 1, 1, 1];
      const speed = expr(s) ?? '1.0';
      // css-doodle supplies u_resolution, u_time and FragColor.
      return `
        void main() {
          vec2 p = (gl_FragCoord.xy - .5 * u_resolution) / u_resolution.y;
          float k = .5 + .5 * sin(40. * length(p) - u_time * ${speed});
          FragColor = vec4(vec3(${r}, ${g}, ${b}) * k, 1.);
        }
      `;
    },
  });
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  stage.doodle(`
    @grid: 2 / 100% / #000 _4px;
    @content: @showcase-rings(@pn(#e63946, #f1c453, #2a9d8f, #a8dadc), @pn(2, 4, 6, 8));
  `);
  stage.say('The shader reads u_time, so css-doodle animates it');
  return () => stage.dispose();
};

export default mount;
