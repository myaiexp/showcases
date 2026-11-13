// CreateScreenshotAsync and the render-target variant into img elements
import { ArcRotateCamera, Color3, Color4, FreeCamera, HemisphericLight, MeshBuilder, StandardMaterial, Tools, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'relative', width: '100%' });
  el.append(wrap);
  const stage = createStage(wrap, ctx);
  const { scene, canvas, engine } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2.4, 1.1, 10, new Vector3(0, 1, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.05, 0.07, 0.14, 1);

  const meshes = [0, 1, 2, 3].map((i) => {
    const m = i % 2 ? MeshBuilder.CreateBox(`m${i}`, { size: 1.4 }, scene) : MeshBuilder.CreateSphere(`m${i}`, { diameter: 1.6 }, scene);
    m.position.set((i - 1.5) * 2, 0.8, 0);
    const mat = new StandardMaterial(`m${i}-mat`, scene);
    mat.diffuseColor = Color3.FromHSV(i * 80, 0.65, 0.95);
    m.material = mat;
    return m;
  });
  // A second camera that is NOT the active one: its pictures need the render-target version.
  const top = new FreeCamera('top', new Vector3(0, 12, 0.01), scene);
  top.setTarget(new Vector3(0, 0, 0));

  const makeImg = (): HTMLImageElement => {
    const img = document.createElement('img');
    Object.assign(img.style, { flex: '1 1 0', minWidth: '0', width: '48%', background: '#000', aspectRatio: '8 / 5', objectFit: 'contain' });
    return img;
  };
  const shotA = makeImg();
  const shotB = makeImg();

  const takeActive = async (): Promise<number> => {
    // The active camera, at the size we ask for. The result is a base64 data URL.
    const data = await Tools.CreateScreenshotAsync(engine, camera, { width: 480, height: 300 });
    shotA.src = data;
    return data.length;
  };
  const takeRenderTarget = async (onlyFirstTwo: boolean): Promise<number> => {
    const data = await Tools.CreateScreenshotUsingRenderTargetAsync(engine, top, { width: 480, height: 300 }, 'image/png', 1, false, undefined, false, false, undefined, undefined, (texture) => {
      // customizeTexture can change the render list: here only some meshes appear.
      if (onlyFirstTwo) texture.renderList = [meshes[0]!, meshes[1]!];
    });
    shotB.src = data;
    return data.length;
  };

  let timer = 0;
  let t = 0;
  stage.run(() => {
    t += engine.getDeltaTime() / 1000;
    meshes.forEach((m, i) => (m.rotation.y = t * (0.5 + i * 0.3)));
    if (ctx.preview) camera.alpha += 0.006;
  });
  if (ctx.preview) {
    // The latest screenshot sits in a corner of the card, refreshed on a timer.
    Object.assign(shotA.style, { position: 'absolute', right: '6px', bottom: '6px', width: '38%', flex: 'none', border: '2px solid #fff', borderRadius: '4px' });
    wrap.append(shotA);
    const shoot = (): void => void scene.executeWhenReady(() => void takeActive());
    timer = window.setTimeout(function again() {
      shoot();
      timer = window.setTimeout(again, 1500);
    }, 500);
  } else {
    const row = document.createElement('div');
    Object.assign(row.style, { display: 'flex', gap: '4px', width: '100%', background: '#000' });
    row.append(shotA, shotB);
    el.append(row);
    const panel = createPanel(el);
    const readout = panel.readout('Take a screenshot: the picture appears below as an <img>, no download.');
    panel.row();
    panel.button('CreateScreenshotAsync (active camera)', async () => (readout.textContent = `left: ${(await takeActive() / 1024).toFixed(0)} KB data URL`));
    panel.button('RenderTarget: top camera, all meshes', async () => (readout.textContent = `right: ${(await takeRenderTarget(false) / 1024).toFixed(0)} KB data URL`));
    panel.button('RenderTarget: renderList of two meshes', async () => (readout.textContent = `right: ${(await takeRenderTarget(true) / 1024).toFixed(0)} KB data URL`));
    void takeActive();
  }

  return () => {
    window.clearTimeout(timer);
    stage.dispose();
    wrap.remove();
  };
};

export default mount;
