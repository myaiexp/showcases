// overflow as one number, four numbers, or true (the whole canvas)
import { VFX, type VFXProps } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

// Tints the extra area (uv outside 0..1) and draws the element inside it, so the
// overflow box is visible.
const shader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    bool inside = uv.x >= 0. && uv.x <= 1. && uv.y >= 0. && uv.y <= 1.;
    if (inside) {
        outColor = texture(src, uv);
        return;
    }
    float stripe = step(0.5, fract((gl_FragCoord.x + gl_FragCoord.y) / 24. - time * 0.5));
    outColor = vec4(0.25, 0.45, 1.0, 1.0) * mix(0.25, 0.45, stripe);
}
`;

const FORMS: [string, VFXProps['overflow']][] = [
  ['overflow: 30', 30],
  ['overflow: [0, 80, 40, 0]', [0, 80, 40, 0]],
  ['overflow: true', true],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('poster', ctx.preview ? 140 : 300);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  let pending: Promise<void> = Promise.resolve();
  const show = (form: (typeof FORMS)[number]): void => {
    pending = pending.then(async () => {
      if (stage.disposed) return;
      vfx.remove(img);
      await vfx.add(img, { shader, overflow: form[1] });
      stage.say(`${form[0]}: the striped area is the extra room`);
    });
  };
  if (stage.bar) {
    select(stage.bar, 'overflow', FORMS.map((f) => [f, f[0]] as const), show);
    show(FORMS[0]!);
  } else {
    stage.cycle(FORMS, 2500, show);
  }
  await pending;
  return () => stage.dispose();
};

export default mount;
