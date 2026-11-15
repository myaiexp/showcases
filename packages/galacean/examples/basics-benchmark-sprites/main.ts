// 2D benchmark in miniature: many SpriteRenderers sharing one Sprite, all rotating each frame
import { Camera, type Entity, Rect, Sprite, SpriteRenderer, Texture2D, Vector2 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';
import { paint } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Every sprite shares one texture, so the engine can draw them together; each one still turns every frame.' });
  const { engine, root } = stage;
  const cameraEntity = root.createChild('camera');
  cameraEntity.transform.setPosition(0, 0, 10);
  const camera = cameraEntity.addComponent(Camera);
  camera.isOrthographic = true;
  camera.orthographicSize = 5;
  const texture = new Texture2D(engine, 32, 32, undefined, false);
  texture.setImageSource(
    paint(32, (g, size) => {
      g.fillStyle = '#ffb454';
      g.fillRect(size * 0.1, size * 0.1, size * 0.8, size * 0.8);
      g.fillStyle = '#2b3a55';
      g.fillRect(size * 0.4, size * 0.1, size * 0.2, size * 0.5);
    }),
  );
  const sprite = new Sprite(engine, texture, new Rect(0, 0, 1, 1), new Vector2(0.5, 0.5));
  const items: Entity[] = [];
  const set = (count: number): void => {
    while (items.length < count) {
      const e = root.createChild('sprite');
      const r = e.addComponent(SpriteRenderer);
      r.sprite = sprite;
      r.width = r.height = 0.5;
      r.color.set(0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 0.6 + Math.random() * 0.4, 1);
      items.push(e);
    }
    while (items.length > count) items.pop()!.destroy();
    const columns = Math.ceil(Math.sqrt(count * 2));
    items.forEach((e, i) => e.transform.setPosition(((i % columns) - (columns - 1) / 2) * (18 / columns), (Math.floor(i / columns) - (Math.ceil(count / columns) - 1) / 2) * (18 / columns), 0));
  };
  const initial = stage.preview ? 300 : 800;
  set(initial);
  if (!stage.preview) slider(stage.bar, 'sprites', 100, 4000, 100, initial, set);
  const info = panel(stage, 'bl');
  let smooth = 0;
  tick(root, (dt) => {
    smooth = smooth * 0.95 + engine.time.actualDeltaTime * 1000 * 0.05;
    for (const e of items) e.transform.rotate(0, 0, 120 * dt);
    info.text(`${items.length} sprites rotating\nframe time ${smooth.toFixed(1)} ms`);
  });
  return stage.dispose;
};

export default mount;
