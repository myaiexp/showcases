// Tiled sprite: the centre and edges of a 9-slice frame repeat, not stretch
import type { Mount } from '@/types.ts';
import * as pc from 'playcanvas';
import { createPanel } from '../../shared/panel.ts';
import { addSprite, createAtlas, createSprite, createSpriteScene, type Frame } from '../../shared/sprites.ts';

/** A 64 px brick with a 16 px border: a stone edge and a studded middle that tiles. */
function drawBrick(g: CanvasRenderingContext2D): void {
  g.fillStyle = '#6b4f3a';
  g.fillRect(0, 0, 64, 64);
  g.fillStyle = '#9a7552';
  g.fillRect(2, 2, 60, 60);
  g.fillStyle = '#7e5d40';
  g.fillRect(16, 16, 32, 32);
  g.fillStyle = '#d6b184';
  g.beginPath();
  g.arc(32, 32, 7, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#4a3525';
  g.fillRect(16, 16, 32, 2);
  g.fillRect(16, 46, 32, 2);
}

const mount: Mount = async (el, ctx) => {
  const scene = await createSpriteScene(el, ctx, { orthoHeight: 2.6 });
  const { app } = scene;
  const frame: Frame = { rect: new pc.Vec4(0, 0, 64, 64), pivot: new pc.Vec2(0.5, 0.5), border: new pc.Vec4(16, 16, 16, 16) };
  const atlas = createAtlas(scene.stage.device, 64, drawBrick, { brick: frame }, 'brick');

  // The same frame twice: sliced stretches the middle, tiled repeats it.
  const sliced = createSprite(scene.stage.device, atlas, ['brick'], { renderMode: pc.SPRITE_RENDERMODE_SLICED });
  const tiled = createSprite(scene.stage.device, atlas, ['brick'], { renderMode: pc.SPRITE_RENDERMODE_TILED });
  const left = addSprite(app, 'sliced', { type: 'simple', sprite: sliced, width: 3, height: 2.4 }, [-2.1, 0, 0]);
  const right = addSprite(app, 'tiled', { type: 'simple', sprite: tiled, width: 3, height: 2.4 }, [2.1, 0, 0]);

  const size = { w: 3, h: 2.4, auto: true };
  let t = 0;
  app.on('update', (dt: number) => {
    if (size.auto) {
      t += dt;
      size.w = 2.7 + 1.1 * Math.sin(t);
      size.h = 2.6 + 1.2 * Math.sin(t * 0.8 + 1);
    }
    for (const e of [left, right]) {
      e.sprite!.width = size.w;
      e.sprite!.height = size.h;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('width', 1, 3.8, 0.05, 3, (v) => ((size.auto = false), (size.w = v)));
    panel.slider('height', 1, 4.4, 0.05, 2.4, (v) => ((size.auto = false), (size.h = v)));
    panel.button('Animate', () => (size.auto = true));
    panel.readout('Left: Sliced. Right: Tiled.');
  }

  return () => {
    sliced.destroy();
    tiled.destroy();
    atlas.destroy();
    scene.dispose();
  };
};

export default mount;
