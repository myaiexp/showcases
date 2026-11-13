// DynamicTexture: draw on a canvas with drawText and the 2D context, then wrap a cube in it
import { ArcRotateCamera, DynamicTexture, HemisphericLight, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SIZE = 512;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 3, Math.PI / 2.6, 6, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.6), scene);

  // The option parameter can be a number: width and height are both 512.
  const texture = new DynamicTexture('dynamic', SIZE, scene);
  // getContext() exposes the whole HTML5 canvas API.
  const g = texture.getContext();
  const gradient = g.createLinearGradient(0, 0, SIZE, SIZE);
  gradient.addColorStop(0, '#1b2a49');
  gradient.addColorStop(1, '#7b2d6b');
  g.fillStyle = gradient;
  g.fillRect(0, 0, SIZE, SIZE);

  // A rotated rectangle, saving and restoring the context around the transform.
  g.save();
  g.translate(SIZE / 2, SIZE / 2);
  g.rotate(Math.PI / 4);
  g.strokeStyle = '#f5c542';
  g.lineWidth = 12;
  g.strokeRect(-110, -110, 220, 220);
  g.restore();

  // A quadratic curve outline, as in the docs' drawing example.
  g.beginPath();
  g.moveTo(75, 25);
  g.quadraticCurveTo(25, 25, 25, 62.5);
  g.quadraticCurveTo(25, 100, 50, 100);
  g.quadraticCurveTo(50, 120, 30, 125);
  g.quadraticCurveTo(60, 120, 65, 100);
  g.quadraticCurveTo(125, 100, 125, 62.5);
  g.quadraticCurveTo(125, 25, 75, 25);
  g.strokeStyle = '#ffffff';
  g.lineWidth = 4;
  g.stroke();

  // drawText(text, x, y, font, color, canvasColor, invertY, update) also updates the texture.
  texture.drawText('Babylon', 90, 300, 'bold 90px sans-serif', '#ffffff', null, true, false);
  texture.drawText('DynamicTexture', 90, 380, '40px sans-serif', '#f5c542', null, true, true);

  const material = new StandardMaterial('material', scene);
  material.diffuseTexture = texture;
  const box = MeshBuilder.CreateBox('box', { size: 2.4 }, scene);
  box.material = material;

  stage.run(() => {
    box.rotation.y += 0.008;
    box.rotation.x = 0.35;
  });

  return () => stage.dispose();
};

export default mount;
