// BloomEffect.dirtTexture and dirtIntensity: bloom through a dirty lens
import { BloomEffect, PostProcess } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';
import { canvasTexture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await postDemo(el, ctx, { hint: 'dirtIntensity 0 to 10.' });
  const say = caption(stage);
  const bloom = root.createChild('post').addComponent(PostProcess).addEffect(BloomEffect);
  bloom.threshold.value = 0.5;
  bloom.intensity.value = 2;
  bloom.dirtTexture.value = canvasTexture(engine, (g, size) => {
    g.fillStyle = '#000';
    g.fillRect(0, 0, size, size);
    let seed = 7;
    const rand = (): number => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 90; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const r = 4 + rand() * (i % 9 === 0 ? 46 : 14);
      const grad = g.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(255,255,255,${0.35 + rand() * 0.5})`);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad;
      g.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }, { size: 512, srgb: false });
  const set = (v: number): void => {
    bloom.dirtIntensity.value = v;
    say(`dirtIntensity ${bloom.dirtIntensity.value.toFixed(1)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => set(5 + 4.5 * Math.sin(t * 0.8)));
  else {
    set(5);
    slider(stage.bar, 'dirtIntensity', 0, 10, 0.1, 5, set);
  }
  return stage.dispose;
};

export default mount;
