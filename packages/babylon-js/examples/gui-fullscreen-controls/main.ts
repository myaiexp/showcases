// Babylon GUI fullscreen mode: a TextBlock, Button and Slider, plus a label linked to a mesh
import { ArcRotateCamera, Color3, HemisphericLight, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control, Rectangle, Slider, StackPanel, TextBlock } from '@babylonjs/gui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.4, 8, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.5), scene);

  const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
  const material = new StandardMaterial('material', scene);
  material.diffuseColor = new Color3(0.3, 0.7, 1);
  box.material = material;

  // Fullscreen mode covers the whole canvas; only one is allowed per scene.
  const ui = AdvancedDynamicTexture.CreateFullscreenUI('ui', true, scene);

  // A StackPanel lays its children out vertically.
  const panel = new StackPanel();
  panel.width = '220px';
  panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  panel.paddingLeft = '12px';
  panel.paddingTop = '12px';
  ui.addControl(panel);

  const title = new TextBlock('title', 'Rotation speed: 1.0');
  title.height = '30px';
  title.color = 'white';
  title.fontSize = 18;
  panel.addControl(title);

  const slider = new Slider('speed');
  slider.minimum = 0;
  slider.maximum = 4;
  slider.value = 1;
  slider.height = '20px';
  slider.width = '200px';
  slider.color = '#4cc2ff';
  slider.background = '#333a4a';
  slider.onValueChangedObservable.add((value) => (title.text = `Rotation speed: ${value.toFixed(1)}`));
  panel.addControl(slider);

  const toggle = Button.CreateSimpleButton('toggle', 'Toggle colour');
  toggle.width = '200px';
  toggle.height = '36px';
  toggle.paddingTop = '10px';
  toggle.color = 'white';
  toggle.background = '#2a6fdb';
  let warm = false;
  toggle.onPointerUpObservable.add(() => {
    warm = !warm;
    material.diffuseColor = warm ? new Color3(1, 0.5, 0.2) : new Color3(0.3, 0.7, 1);
  });
  panel.addControl(toggle);

  // A label that follows the cube on screen through linkWithMesh (root-level controls only).
  const tag = new Rectangle('tag');
  tag.width = '90px';
  tag.height = '30px';
  tag.cornerRadius = 8;
  tag.color = 'white';
  tag.background = '#00000099';
  tag.thickness = 1;
  ui.addControl(tag);
  const tagText = new TextBlock('tagText', 'cube');
  tagText.color = 'white';
  tag.addControl(tagText);
  tag.linkWithMesh(box);
  tag.linkOffsetY = -110;

  const start = performance.now();
  stage.run(() => {
    if (ctx.preview) {
      // No pointer in a card, so move the slider by itself.
      slider.value = 2 + Math.sin((performance.now() - start) / 700) * 1.9;
    }
    box.rotation.y += 0.01 * slider.value;
    box.rotation.x = 0.4;
  });

  return () => {
    ui.dispose();
    stage.dispose();
  };
};

export default mount;
