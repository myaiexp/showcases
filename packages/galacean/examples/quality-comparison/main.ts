// Four viewport cameras with different antiAliasing and msaaSamples settings
import { AntiAliasing, Camera, MSAASamples, PrimitiveMesh, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, spin } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 5], hint: 'Top left: off.  Top right: FXAA.  Bottom left: MSAA 4x.  Bottom right: both.' });
  const say = caption(stage);
  const wheel = root.createChild('wheel');
  for (let i = 0; i < 8; i++) add(wheel, PrimitiveMesh.createCuboid(engine, 0.06, 3.2, 0.06), blinn(engine, [0.9, 0.75, 0.4], 40), [0, 0, 0], 'spoke').entity.transform.setRotation(0, 0, i * 22.5);
  spin(wheel, [6, 0, 8]);
  const setups: [Vector4, AntiAliasing, MSAASamples][] = [
    [new Vector4(0, 0.5, 0.5, 0.5), AntiAliasing.None, MSAASamples.None],
    [new Vector4(0.5, 0.5, 0.5, 0.5), AntiAliasing.FXAA, MSAASamples.None],
    [new Vector4(0, 0, 0.5, 0.5), AntiAliasing.None, MSAASamples.FourX],
    [new Vector4(0.5, 0, 0.5, 0.5), AntiAliasing.FXAA, MSAASamples.FourX],
  ];
  setups.forEach(([rect, aa, msaa], i) => {
    const cam = i === 0 ? camera : root.createChild(`camera ${i}`).addComponent(Camera);
    if (i) cam.entity.transform.setPosition(0, 0, 5);
    cam.viewport = rect;
    cam.antiAliasing = aa;
    cam.msaaSamples = msaa;
    cam.fieldOfView = 35;
  });
  say('off | FXAA | MSAA 4x | FXAA + MSAA 4x');
  return stage.dispose;
};

export default mount;
