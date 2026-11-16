// Image filters: a custom filter with options and shader uniforms (a duotone)
import type { Mount } from '@/types.ts';
import { Color, classRegistry, filters, type T2DPipelineState, type TWebGLUniformLocationMap } from 'fabric';
import { color, slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

interface DuotoneProps {
  dark: string;
  light: string;
  amount: number;
}

// Statics: `defaults` seeds the options and decides what toObject() saves; `uniformLocations`
// lists the shader uniforms the base class looks up after compiling.
class Duotone extends filters.BaseFilter<'showcase-duotone', DuotoneProps> {
  declare dark: string;
  declare light: string;
  declare amount: number;
  static override type = 'showcase-duotone';
  static override defaults = { dark: '#1b1f5e', light: '#ffd36b', amount: 1 };
  static override uniformLocations = ['uDark', 'uLight', 'uAmount'];

  override getFragmentSource(): string {
    return `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec3 uDark;
      uniform vec3 uLight;
      uniform float uAmount;
      varying vec2 vTexCoord;
      void main() {
        vec4 c = texture2D(uTexture, vTexCoord);
        float l = dot(c.rgb, vec3(0.299, 0.587, 0.114));
        gl_FragColor = vec4(mix(c.rgb, mix(uDark, uLight, l), uAmount), c.a);
      }`;
  }

  override sendUniformData(gl: WebGLRenderingContext, locations: TWebGLUniformLocationMap): void {
    const [dr, dg, db] = new Color(this.dark).getSource();
    const [lr, lg, lb] = new Color(this.light).getSource();
    gl.uniform3fv(locations.uDark ?? null, [dr! / 255, dg! / 255, db! / 255]);
    gl.uniform3fv(locations.uLight ?? null, [lr! / 255, lg! / 255, lb! / 255]);
    gl.uniform1f(locations.uAmount ?? null, this.amount);
  }

  override applyTo2d({ imageData: { data } }: T2DPipelineState): void {
    const d = new Color(this.dark).getSource();
    const l = new Color(this.light).getSource();
    for (let i = 0; i < data.length; i += 4) {
      const lum = (0.299 * data[i]! + 0.587 * data[i + 1]! + 0.114 * data[i + 2]!) / 255;
      for (let c = 0; c < 3; c++) {
        const tone = d[c]! + (l[c]! - d[c]!) * lum;
        data[i + c] = data[i + c]! + (tone - data[i + c]!) * this.amount;
      }
    }
  }
}
classRegistry.setClass(Duotone);

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'landscape');
  const say = status(stage);

  const duotone = new Duotone();
  const update = (): void => {
    show([duotone]);
    say(`Duotone ${duotone.dark} to ${duotone.light}, amount ${duotone.amount.toFixed(2)}`);
  };
  update();

  if (stage.bar) {
    color(stage.bar, 'dark', duotone.dark, (v) => {
      duotone.dark = v;
      update();
    });
    color(stage.bar, 'light', duotone.light, (v) => {
      duotone.light = v;
      update();
    });
    slider(stage.bar, 'amount', 0, 1, 0.01, 1, (v) => {
      duotone.amount = v;
      update();
    }, (v) => v.toFixed(2));
  } else {
    sweep(stage, 0, 1, (v) => {
      duotone.amount = v;
      update();
    }, 2.5);
  }
  return stage.dispose;
};

export default mount;
