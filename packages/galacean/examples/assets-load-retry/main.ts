// retryCount and retryInterval: a load that can't succeed takes longer to fail
import { AssetType, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { lit, phong, solid, tick } from '../../shared/core-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The URL is a blob that was revoked before loading, so every attempt fails.' });
  const { engine, root } = stage;
  lit(stage, [0, 2, 8]);
  const log = eventLog(stage, 6, 'bl');
  const materials = Array.from({ length: 6 }, () => phong(engine, [0.4, 0.43, 0.5]));
  const spheres = materials.map((m, i) => solid(root, PrimitiveMesh.createSphere(engine, 0.35, 16), m, [(i - 2.5) * 1.1, 0, 0]));
  const COUNTS = ['0', '1', '2', '4'] as const;
  let retryCount = 2;
  let began = 0;
  let pending = false;
  const attemptTotal = (): number => retryCount + 1;
  const run = (): void => {
    const url = URL.createObjectURL(new Blob(['not an image']));
    URL.revokeObjectURL(url);
    log.log(`load({ url: <revoked blob>, retryCount: ${retryCount}, retryInterval: 400 })`);
    began = performance.now();
    pending = true;
    engine.resourceManager
      .load({ type: AssetType.Texture2D, url, retryCount, retryInterval: 400 })
      .then(() => log.log('loaded?'))
      .catch((e: unknown) => log.log(`failed after ${((performance.now() - began) / 1000).toFixed(2)} s: ${String((e as Error)?.message ?? e).slice(0, 36)}`))
      .finally(() => (pending = false));
  };
  run();
  if (!stage.preview) select(stage.bar, 'retryCount', COUNTS, (v) => ((retryCount = Number(v)), run()), '2');
  let last = 0;
  tick(root, (_dt, t) => {
    const elapsed = (performance.now() - began) / 400;
    spheres.forEach((s, i) => {
      const used = pending ? Math.min(attemptTotal(), 1 + Math.floor(elapsed)) : attemptTotal();
      materials[i]!.baseColor.set(i < used ? 0.9 : 0.4, i < used ? 0.35 : 0.43, i < used ? 0.3 : 0.5, 1);
      s.isActive = i < attemptTotal();
      s.transform.setScale(i < used ? 1.25 : 0.8, i < used ? 1.25 : 0.8, 1);
    });
    if (stage.preview && !pending && t - last > 1.4) {
      last = t;
      retryCount = [0, 2, 4][Math.floor(t / 4) % 3]!;
      run();
    }
  });
  return stage.dispose;
};

export default mount;
