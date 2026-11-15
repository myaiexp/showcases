// time.timeScale slows everything driven by deltaTime
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The left cube turns by deltaTime, the right one by actualDeltaTime.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 1.5, 8]);
  const tag = labels(stage, camera);
  const mesh = PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4);
  const scaled = solid(root, mesh, phong(engine, PALETTE.amber), [-2, 0, 0]);
  const actual = solid(root, mesh, phong(engine, PALETTE.cyan), [2, 0, 0]);
  const a = tag.add('deltaTime', '#ffd36b');
  const b = tag.add('actualDeltaTime', '#7fe3f0');
  const info = panel(stage, 'bl');
  const { time } = engine;
  if (!stage.preview) slider(stage.bar, 'timeScale', 0, 3, 0.05, 1, (v) => (time.timeScale = v), (v) => v.toFixed(2));
  tick(root, (dt, t) => {
    if (stage.preview) time.timeScale = 1.1 + Math.sin(t * 0.9);
    scaled.transform.rotate(0, 90 * dt, 0);
    actual.transform.rotate(0, 90 * time.actualDeltaTime, 0);
    a.at(scaled.transform.worldPosition.clone().set(-2, 1.3, 0));
    b.at(actual.transform.worldPosition.clone().set(2, 1.3, 0));
    info.text(
      `timeScale ${time.timeScale.toFixed(2)}\ndeltaTime ${time.deltaTime.toFixed(4)}   actualDeltaTime ${time.actualDeltaTime.toFixed(4)}\n` +
        `elapsedTime ${time.elapsedTime.toFixed(2)}   actualElapsedTime ${time.actualElapsedTime.toFixed(2)}\nframeCount ${time.frameCount}`,
    );
  });
  return stage.dispose;
};

export default mount;
