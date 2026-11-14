// Render 3D into an interface: a camera draws a model into an image's texture
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);
  const { app } = ui;

  // The texture to render into. SRGBA8 keeps the colours right; origin TOP makes it the right way up.
  const previewTexture = new pc.Texture(ui.stage.device, { name: 'preview', width: 512, height: 512, format: pc.PIXELFORMAT_SRGBA8, mipmaps: false });
  const renderTarget = new pc.RenderTarget({ colorBuffer: previewTexture, depth: true, origin: pc.RENDERTARGET_ORIGIN_TOP });

  // A layer holding only what the preview camera should see, which the main camera does not render.
  const previewLayer = new pc.Layer({ name: 'Preview' });
  app.scene.layers.push(previewLayer);

  const model = new pc.Entity('model');
  model.addComponent('render', { type: 'box', layers: [previewLayer.id] });
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color().fromString(COL.accent);
  material.update();
  model.render!.material = material;
  model.setLocalPosition(0, 0, 0);
  app.root.addChild(model);

  const light = new pc.Entity('light');
  light.addComponent('light', { type: 'directional', layers: [previewLayer.id] });
  light.setEulerAngles(40, 30, 0);
  app.root.addChild(light);

  // Priority -1 renders it before the main camera (0), so the texture is ready when the UI draws.
  const previewCamera = new pc.Entity('preview camera');
  previewCamera.addComponent('camera', { layers: [previewLayer.id], renderTarget, priority: -1, clearColor: new pc.Color(0, 0, 0, 0) });
  previewCamera.setPosition(0, 1, 3.2);
  previewCamera.lookAt(0, 0, 0);
  app.root.addChild(previewCamera);

  // The interface: a framed portrait showing the texture, and a caption.
  addElement(ui.screen, 'frame', { width: 250, height: 250, color: color(COL.panel) }, [-130, 10]);
  const portrait = addElement(ui.screen, 'portrait', { width: 230, height: 230, texture: previewTexture }, [-130, 10]);
  addText(ui, ui.screen, 'The model is not in the main', { fontSize: 22, color: color(COL.dim) }, [150, 40]);
  addText(ui, ui.screen, "camera's view: this is a", { fontSize: 22, color: color(COL.dim) }, [150, 12]);
  addText(ui, ui.screen, 'texture in an image element', { fontSize: 22, color: color(COL.dim) }, [150, -16]);

  const state = { speed: 40 };
  app.on('update', (dt: number) => model.rotate(state.speed * dt * 0.6, state.speed * dt, 0));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('spin speed', 0, 200, 5, 40, (v) => (state.speed = v));
    panel.slider('portrait width', 80, 260, 1, 230, (v) => (portrait.element!.width = v));
  }

  return () => {
    renderTarget.destroy();
    previewTexture.destroy();
    ui.dispose();
  };
};

export default mount;
