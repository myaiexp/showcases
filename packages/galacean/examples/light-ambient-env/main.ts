// AssetType.Env loads a baked ambient light: SH diffuse plus a prefiltered specular cube
import type { Mount } from '@/types.ts';
import { demo, orbit } from '../../shared/gfx-kit.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { pbrGrid } from '../../shared/gfx-light.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 7], target: [0, 0, 0], light: false, hint: 'Metallic 0 to 1 across, roughness 0.08 to 0.98 down. Only the ambient light shines.' });
  stage.scene.ambientLight = await loadStudioEnv(engine);
  pbrGrid(root, engine, 5, 3);
  orbit(camera.entity, [0, 0, 0], 7, 0.5, 0.25);
  return stage.dispose;
};

export default mount;
