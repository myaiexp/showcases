// Image filters: a custom BaseFilter subclass (Redify) in classRegistry
import type { Mount } from '@/types.ts';
import { classRegistry, filters, type T2DPipelineState } from 'fabric';
import { checkbox } from '../../shared/controls.ts';
import { filterStage, shot } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

// The guide's Redify, written the v7 way: a class, not createClass. `type` names it in JSON,
// `getFragmentSource` is the GPU path, `applyTo2d` the Canvas2D fallback.
class Redify extends filters.BaseFilter<'showcase-redify'> {
  static override type = 'showcase-redify';

  override getFragmentSource(): string {
    return `
      precision highp float;
      uniform sampler2D uTexture;
      varying vec2 vTexCoord;
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        color.g = 0.0;
        color.b = 0.0;
        gl_FragColor = color;
      }`;
  }

  override applyTo2d({ imageData: { data } }: T2DPipelineState): void {
    for (let i = 0; i < data.length; i += 4) {
      data[i + 1] = 0;
      data[i + 2] = 0;
    }
  }
}
// A unique type name keeps the page-wide registry clean; registering twice just replaces the entry.
classRegistry.setClass(Redify);

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'fruit');
  const say = status(stage);

  const redify = new Redify();
  const update = (on: boolean): void => {
    show(on ? [redify] : []);
    say(on ? `new Redify()  type: ${redify.type}, toObject ${JSON.stringify(redify.toObject())}` : 'no filters');
  };
  update(true);

  if (stage.bar) checkbox(stage.bar, 'Redify on', true, update);
  else {
    let on = true;
    stage.every(1300, () => update((on = !on)));
  }
  return stage.dispose;
};

export default mount;
