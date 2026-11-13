// Material plugins added to single StandardMaterials, not registered
import { ArcRotateCamera, Color3, HemisphericLight, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { GreyscalePlugin, ScanlinePlugin } from './plugins.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 9, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.5), scene);

  const make = (name: string, x: number) => {
    const knot = MeshBuilder.CreateTorusKnot(name, { radius: 0.8, tube: 0.28, radialSegments: 96 }, scene);
    knot.position.x = x;
    const mat = new StandardMaterial(name, scene);
    mat.diffuseColor = new Color3(1, 0.5, 0.2);
    knot.material = mat;
    return { knot, mat };
  };
  const plain = make('plain', -3);
  const grey = make('grey', 0);
  const scan = make('scan', 3);

  // RegisterMaterialPlugin would add a plugin to every material created afterwards, on the
  // whole page. Instantiating one with a material changes that material only.
  new GreyscalePlugin(grey.mat);
  const scanline = new ScanlinePlugin(scan.mat);
  scanline.isEnabled = true;

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('scanline.isEnabled', true, (on) => (scanline.isEnabled = on));
    panel.select('scanline tint', ['green', 'amber', 'cyan'] as const, 'green', (v) => {
      scanline.tint = { green: new Color3(0.4, 1, 0.6), amber: new Color3(1, 0.75, 0.3), cyan: new Color3(0.4, 0.9, 1) }[v];
    });
  }

  stage.run(() => {
    scanline.time += 0.02;
    for (const { knot } of [plain, grey, scan]) knot.rotation.y += 0.006;
  });
  return () => stage.dispose();
};

export default mount;
