// engine.registerView: one engine drawing three canvases, one camera each
import { ArcRotateCamera, Color3, Color4, Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { EngineView } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = (el, ctx) => {
  // The canvas that creates the engine becomes a "working" canvas: it is never shown.
  const working = document.createElement('canvas');
  const engine = new Engine(working, true, { adaptToDeviceRatio: !ctx.preview });

  const row = document.createElement('div');
  Object.assign(row.style, { display: 'flex', gap: '3px', width: '100%', background: '#000' });
  const makeCanvas = (): HTMLCanvasElement => {
    const c = document.createElement('canvas');
    // Canvases of the same size avoid a master-canvas resize for every view.
    Object.assign(c.style, { flex: '1 1 0', minWidth: '0', width: '33%', height: ctx.preview ? '200px' : '380px', touchAction: 'none', outline: 'none' });
    row.append(c);
    return c;
  };
  const [orbitCanvas, topCanvas, sideCanvas] = [makeCanvas(), makeCanvas(), makeCanvas()] as [HTMLCanvasElement, HTMLCanvasElement, HTMLCanvasElement];
  el.append(row);

  // Events come from the working canvas unless inputElement is set before the scene exists.
  engine.inputElement = orbitCanvas;
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.05, 0.07, 0.14, 1);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);

  const knot = MeshBuilder.CreateTorusKnot('knot', { radius: 1.2, tube: 0.35, radialSegments: 96 }, scene);
  const knotMat = new StandardMaterial('knot-mat', scene);
  knotMat.diffuseColor = new Color3(0.9, 0.5, 0.25);
  knot.material = knotMat;
  const moons = [0, 1, 2].map((i) => {
    const m = MeshBuilder.CreateSphere(`moon${i}`, { diameter: 0.55 }, scene);
    const mat = new StandardMaterial(`moon${i}-mat`, scene);
    mat.diffuseColor = Color3.FromHSV(i * 120, 0.6, 0.95);
    m.material = mat;
    return m;
  });

  const orbit = new ArcRotateCamera('orbit', -Math.PI / 3, 1.1, 9, Vector3.Zero(), scene);
  if (!ctx.preview) orbit.attachControl(orbitCanvas, true);
  const top = new FreeCamera('top', new Vector3(0, 10, 0.001), scene);
  top.setTarget(Vector3.Zero());
  const side = new FreeCamera('side', new Vector3(0, 0, -9), scene);
  side.setTarget(Vector3.Zero());

  // A view pairs a canvas with the camera used for it.
  const views: EngineView[] = [engine.registerView(orbitCanvas, orbit), engine.registerView(topCanvas, top), engine.registerView(sideCanvas, side)];

  let t = 0;
  engine.runRenderLoop(() => {
    // The callback runs once per view each frame: advance the animation on the first only.
    if (engine.activeView?.target === orbitCanvas) {
      t += engine.getDeltaTime() / 1000;
      knot.rotation.y = t * 0.6;
      moons.forEach((m, i) => m.position.set(Math.cos(t + i * 2.1) * 3, Math.sin(t * 1.3 + i) * 1.2, Math.sin(t + i * 2.1) * 3));
      if (ctx.preview) orbit.alpha += 0.01;
    }
    scene.render();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('top view enabled (view.enabled)', true, (on) => (views[1]!.enabled = on));
    panel.check('side view enabled', true, (on) => (views[2]!.enabled = on));
    panel.readout('One scene, one engine, three canvases. Drag in the left canvas to orbit.');
  }

  const resizeObserver = new ResizeObserver(() => engine.resize());
  resizeObserver.observe(row);

  return () => {
    resizeObserver.disconnect();
    for (const c of [orbitCanvas, topCanvas, sideCanvas]) engine.unRegisterView(c);
    engine.stopRenderLoop();
    scene.dispose();
    engine.dispose();
    row.remove();
  };
};

export default mount;
