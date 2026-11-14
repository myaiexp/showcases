// VFX-JS example: wrap "repeat", "clamp" and "mirror" in the overflow area
import { VFX, type VFXProps } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

// Reads src everywhere, also outside 0..1, so the wrap mode decides what shows there.
const shader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    uv.x += sin(time * 0.8) * 0.15;
    outColor = texture(src, uv);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  const width = ctx.preview ? 60 : 160;
  const modes: NonNullable<VFXProps['wrap']>[] = ['repeat', 'clamp', 'mirror'];
  stage.root.style.gap = ctx.preview ? '14px' : '90px';
  stage.root.style.flexWrap = 'nowrap';
  for (const wrap of modes) {
    const img = await picture('testcard', width);
    const box = document.createElement('figure');
    box.style.margin = '0';
    const cap = document.createElement('figcaption');
    cap.textContent = `wrap: "${wrap}"`;
    cap.style.cssText = `color: var(--fg-2); text-align: center; white-space: nowrap; font-size: ${ctx.preview ? 9 : 13}px; margin-top: ${ctx.preview ? 16 : 50}px`;
    box.append(img, cap);
    stage.root.append(box);
    await vfx.add(img, { shader, overflow: ctx.preview ? 12 : 40, wrap });
  }
  stage.say('The extra room shows the texture repeated, its edge pixels stretched, or mirrored');
  return () => stage.dispose();
};

export default mount;
