// Sprite component flipX, flipY, colour tint and opacity on one frame
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addSprite, createAtlas, createSprite, createSpriteScene, drawIconGrid, gridFrames } from '../../shared/sprites.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createSpriteScene(el, ctx, { orthoHeight: 2 });
  const { app } = scene;
  const atlas = createAtlas(scene.stage.device, 256, drawIconGrid, gridFrames(4, 2, 64), 'icons');
  // Frame 7 is an arrow pointing up-right, so both flips are easy to see.
  const sprite = createSprite(scene.stage.device, atlas, ['7']);

  const names = ['original', 'flipX', 'flipY', 'tint', 'opacity'];
  const items = names.map((name, i) => {
    const e = addSprite(app, name, { type: 'simple', sprite, frame: 0 }, [(i - 2) * 1.7, 0, 0]);
    e.setLocalScale(1.3, 1.3, 1);
    return e;
  });
  const [, fx, fy, tint, fade] = items as [pc.Entity, pc.Entity, pc.Entity, pc.Entity, pc.Entity];

  const state = { flipX: true, flipY: true, hue: 0, opacity: 0.5, auto: true };
  const apply = (): void => {
    fx.sprite!.flipX = state.flipX;
    fy.sprite!.flipY = state.flipY;
    tint.sprite!.color = new pc.Color().fromString(hslToHex(state.hue));
    fade.sprite!.opacity = state.opacity;
  };
  apply();

  let t = 0;
  app.on('update', (dt: number) => {
    if (!state.auto) return;
    t += dt;
    state.flipX = Math.sin(t * 2) > 0;
    state.flipY = Math.sin(t * 1.3) > 0;
    state.hue = (t * 60) % 360;
    state.opacity = 0.5 + 0.5 * Math.sin(t * 1.5);
    apply();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const manual = (): void => {
      state.auto = false;
      apply();
    };
    panel.check('flipX', true, (on) => ((state.flipX = on), manual()));
    panel.check('flipY', true, (on) => ((state.flipY = on), manual()));
    panel.slider('tint hue', 0, 360, 1, 0, (v) => ((state.hue = v), manual()));
    panel.slider('opacity', 0, 1, 0.01, 0.5, (v) => ((state.opacity = v), manual()));
    panel.button('Animate', () => (state.auto = true));
  }

  return () => {
    sprite.destroy();
    atlas.destroy();
    scene.dispose();
  };
};

/** CSS hsl() at 80% saturation and 60% lightness as a #rrggbb string. */
function hslToHex(h: number): string {
  const s = 0.8;
  const l = 0.6;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number): string => {
    const k = (n + h / 30) % 12;
    const v = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(v * 255).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export default mount;
