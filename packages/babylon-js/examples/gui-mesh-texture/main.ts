// Babylon GUI texture mode: an AdvancedDynamicTexture on a plane, with a clickable button in 3D
import { ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control, Rectangle, TextBlock } from '@babylonjs/gui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 6, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  scene.clearColor.set(0.1, 0.11, 0.16, 1);
  new HemisphericLight('light', new Vector3(0, 1, -1), scene);

  const plane = MeshBuilder.CreatePlane('screen', { width: 4, height: 2.4, sideOrientation: 2 }, scene);

  // Texture mode: you pick the texture resolution; the UI is drawn onto the mesh.
  const ui = AdvancedDynamicTexture.CreateForMesh(plane, 1024, 614);

  const card = new Rectangle('card');
  card.background = '#1d2433';
  card.color = '#4cc2ff';
  card.thickness = 8;
  card.cornerRadius = 40;
  ui.addControl(card);

  const counter = new TextBlock('counter', 'Clicks: 0');
  counter.color = 'white';
  counter.fontSize = 110;
  counter.top = '-120px';
  card.addControl(counter);

  let clicks = 0;
  const show = () => (counter.text = `Clicks: ${clicks}`);
  const button = Button.CreateSimpleButton('click', 'Click me');
  button.width = '460px';
  button.height = '150px';
  button.top = '110px';
  button.fontSize = 70;
  button.color = 'white';
  button.background = '#2a6fdb';
  button.cornerRadius = 30;
  button.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
  button.onPointerUpObservable.add(() => {
    clicks++;
    show();
  });
  card.addControl(button);

  let timer = 0;
  if (ctx.preview) {
    // Nobody can click in a card, so count by itself.
    timer = window.setInterval(() => {
      clicks++;
      show();
    }, 900);
    stage.run(() => (plane.rotation.y = Math.sin(performance.now() / 1200) * 0.6));
  } else {
    stage.run();
  }

  return () => {
    clearInterval(timer);
    ui.dispose();
    stage.dispose();
  };
};

export default mount;
