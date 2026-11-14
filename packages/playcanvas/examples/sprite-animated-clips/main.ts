// Animated sprite component: named clips with fps and loop, play and pause
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addSprite, createAtlas, createSprite, createSpriteScene, drawCoinFrames, gridFrames, spriteAsset } from '../../shared/sprites.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createSpriteScene(el, ctx, { orthoHeight: 2 });
  const { app } = scene;

  // Eight coin frames. A clip plays a sprite *asset*, so the sprites are registered as assets:
  // 'spin' plays all eight frames, 'wobble' only the three narrowest.
  const atlas = createAtlas(scene.stage.device, 256, drawCoinFrames, gridFrames(4, 2, 64), 'coin');
  const spin = createSprite(scene.stage.device, atlas, ['0', '1', '2', '3', '4', '5', '6', '7']);
  const wobble = createSprite(scene.stage.device, atlas, ['2', '3', '4', '3']);
  const spinAsset = spriteAsset(app, spin, 'spin');
  const wobbleAsset = spriteAsset(app, wobble, 'wobble');

  const coin = addSprite(app, 'coin', {
    type: 'animated',
    clips: {
      spin: { name: 'spin', fps: 10, loop: true, spriteAsset: spinAsset },
      wobble: { name: 'wobble', fps: 6, loop: true, spriteAsset: wobbleAsset },
    },
    autoPlayClip: 'spin',
  });
  coin.setLocalScale(2.4, 2.4, 1);
  const sprite = coin.sprite!;

  if (ctx.preview) {
    // Swap clips every few seconds so the card shows both.
    let t = 0;
    let current = 'spin';
    app.on('update', (dt: number) => {
      t += dt;
      const want = Math.floor(t / 3) % 2 ? 'wobble' : 'spin';
      if (want !== current) sprite.play((current = want));
    });
  } else {
    const panel = createPanel(el);
    const status = panel.readout();
    panel.select('clip', ['spin', 'wobble'] as const, 'spin', (name) => sprite.play(name));
    panel.slider('fps', 1, 30, 1, 10, (v) => {
      for (const clip of Object.values(sprite.clips)) clip.fps = v;
    });
    panel.slider('speed', 0, 3, 0.1, 1, (v) => {
      sprite.speed = v;
    });
    panel.check('loop', true, (on) => {
      for (const clip of Object.values(sprite.clips)) clip.loop = on;
    });
    panel.row();
    panel.button('Pause', () => sprite.pause());
    panel.button('Resume', () => sprite.resume());
    panel.button('Stop', () => sprite.stop());
    panel.button('Play again', () => sprite.play(sprite.currentClip?.name ?? 'spin'));
    app.on('update', () => {
      const clip = sprite.currentClip;
      status.textContent = clip ? `${clip.name}: frame ${clip.frame}, ${clip.isPlaying ? 'playing' : clip.isPaused ? 'paused' : 'stopped'}` : '';
    });
  }

  return () => {
    spin.destroy();
    wobble.destroy();
    atlas.destroy();
    scene.dispose();
  };
};

export default mount;
