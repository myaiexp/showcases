// Anti-aliased and plain splats side by side, and the scene-wide override
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, emptyCloud, gauss, hue, rng, type SplatCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

type Override = 'undefined (follow each resource)' | 'true (all compensated)' | 'false (none compensated)';
const OVERRIDES: Record<Override, boolean | undefined> = {
  'undefined (follow each resource)': undefined,
  'true (all compensated)': true,
  'false (none compensated)': false,
};

/** A dense fuzz of tiny splats: the case where uncompensated opacity looks glittery. */
function fuzz(count: number): SplatCloud {
  const cloud = emptyCloud(count);
  const r = rng(17);
  for (let i = 0; i < count; i++) {
    const a = r() * Math.PI * 2;
    const u = r() * 2 - 1;
    const s = Math.sqrt(1 - u * u);
    const rad = 1 + gauss(r) * 0.03;
    cloud.positions.set([Math.cos(a) * s * rad, u * rad, Math.sin(a) * s * rad], i * 3);
    cloud.colors.set([...hue(0.08 + u * 0.06, 0.7, 1), 0.9], i * 4);
    cloud.scales.fill(0.009, i * 3, i * 3 + 3);
  }
  return cloud;
}

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 9, pitch: -10 });
  const { app } = scene;
  const cloud = fuzz(ctx.preview ? 30000 : 50000);

  // The same splats twice. antiAlias on a resource says how that splat should be rendered;
  // a loaded file records it, a procedural container needs it set by hand.
  const left = cloudContainer(scene.stage.device, cloud);
  const right = cloudContainer(scene.stage.device, cloud);
  left.antiAlias = true;
  right.antiAlias = false;
  scene.add(left, 'anti-aliased').setPosition(-1.4, 0, 0);
  scene.add(right, 'plain').setPosition(1.4, 0, 0);

  if (ctx.preview) {
    // Cards flip the scene-wide override so both variants take turns.
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      app.scene.gsplat.antiAlias = t % 6 < 2 ? undefined : t % 6 < 4 ? true : false;
    });
  } else {
    const panel = createPanel(el);
    panel.select<Override>('Scene.gsplat.antiAlias', Object.keys(OVERRIDES) as Override[], 'undefined (follow each resource)', (key) => {
      app.scene.gsplat.antiAlias = OVERRIDES[key];
    });
    panel.slider('antiAliasFilterSize', 0.05, 0.6, 0.05, 0.1, (v) => (app.scene.gsplat.antiAliasFilterSize = v));
    panel.row();
    panel.readout('left: resource.antiAlias = true, right: false. Same splats.');
  }

  return () => {
    app.scene.gsplat.antiAlias = undefined;
    scene.dispose();
  };
};

export default mount;
