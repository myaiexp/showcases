// Sprite animation clip events: play, pause, resume, stop, end and loop
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addSprite, createAtlas, createSprite, createSpriteScene, drawCoinFrames, gridFrames, spriteAsset } from '../../shared/sprites.ts';

const EVENTS = [
  pc.SpriteAnimationClip.EVENT_PLAY,
  pc.SpriteAnimationClip.EVENT_PAUSE,
  pc.SpriteAnimationClip.EVENT_RESUME,
  pc.SpriteAnimationClip.EVENT_STOP,
  pc.SpriteAnimationClip.EVENT_END,
  pc.SpriteAnimationClip.EVENT_LOOP,
];

const mount: Mount = async (el, ctx) => {
  const scene = await createSpriteScene(el, ctx, { orthoHeight: 2 });
  const { app } = scene;
  const atlas = createAtlas(scene.stage.device, 256, drawCoinFrames, gridFrames(4, 2, 64), 'coin');
  const sprite = createSprite(scene.stage.device, atlas, ['0', '1', '2', '3', '4', '5', '6', '7']);
  const asset = spriteAsset(app, sprite, 'spin');

  const coin = addSprite(app, 'coin', { type: 'animated', clips: { once: { name: 'once', fps: 8, loop: false, spriteAsset: asset } } });
  coin.setLocalScale(2.4, 2.4, 1);
  const clip = coin.sprite!.clip('once');

  // 'end' fires when a clip that doesn't loop reaches its last frame: pop the coin, then replay.
  let pop = 0;
  let wait = -1;
  const counts: Record<string, number> = {};
  const panel = ctx.preview ? null : createPanel(el);
  const log = panel?.readout();
  for (const name of EVENTS) {
    clip.on(name, () => {
      counts[name] = (counts[name] ?? 0) + 1;
      if (name === pc.SpriteAnimationClip.EVENT_END) {
        pop = 1;
        wait = 0.8;
      }
      if (log) log.textContent = EVENTS.map((n) => `${n}: ${counts[n] ?? 0}`).join('   ');
    });
  }

  coin.sprite!.play('once');
  app.on('update', (dt: number) => {
    pop = Math.max(0, pop - dt * 2.5);
    const s = 2.4 + pop * 0.5;
    coin.setLocalScale(s, s, 1);
    if (wait >= 0 && (wait -= dt) < 0) coin.sprite!.play('once');
  });

  if (panel) {
    panel.row();
    panel.button('Play', () => coin.sprite!.play('once'));
    panel.button('Pause', () => coin.sprite!.pause());
    panel.button('Resume', () => coin.sprite!.resume());
    panel.button('Stop', () => coin.sprite!.stop());
    panel.readout('The clip does not loop, so it fires end and the example plays it again.');
  }

  return () => {
    sprite.destroy();
    atlas.destroy();
    scene.dispose();
  };
};

export default mount;
