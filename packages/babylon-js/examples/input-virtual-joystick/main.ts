// VirtualJoysticks with an opt-in page-wide overlay
import { ArcRotateCamera, Color3, HemisphericLight, MeshBuilder, StandardMaterial, Vector3, VirtualJoystick } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'relative', width: '100%' });
  el.append(wrap);
  const stage = createStage(wrap, ctx);
  const { scene } = stage;

  // Not attached to pointer input: the joysticks (or, in cards, a script) drive the view.
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.0, 13, Vector3.Zero(), scene);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.2), scene);
  scene.clearColor.set(0.08, 0.09, 0.12, 1);
  const floor = MeshBuilder.CreateGround('floor', { width: 16, height: 16 }, scene);
  const floorMat = new StandardMaterial('floor-mat', scene);
  floorMat.diffuseColor = new Color3(0.16, 0.18, 0.25);
  floor.material = floorMat;
  const ball = MeshBuilder.CreateSphere('ball', { diameter: 1.4, segments: 20 }, scene);
  ball.position.y = 0.7;
  const ballMat = new StandardMaterial('ball-mat', scene);
  ballMat.diffuseColor = new Color3(0.5, 0.8, 1);
  ball.material = ballMat;

  // What the two sticks report: a unit-ish vector each (the same shape as joystick.deltaPosition).
  const leftValue = new Vector3();
  const rightValue = new Vector3();
  let t = 0;

  // The HUD: a small readout, and in cards a drawn stand-in for the sticks (no page-wide canvas in cards).
  const hud = document.createElement('canvas');
  hud.width = 260;
  hud.height = 90;
  Object.assign(hud.style, { position: 'absolute', left: '50%', bottom: '8px', transform: 'translateX(-50%)', pointerEvents: 'none' });
  wrap.append(hud);
  const g = hud.getContext('2d')!;
  const drawStick = (cx: number, v: Vector3): void => {
    g.strokeStyle = '#7a88b8';
    g.lineWidth = 2;
    g.beginPath();
    g.arc(cx, 45, 30, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = '#7dcfff';
    g.beginPath();
    g.arc(cx + v.x * 24, 45 - v.y * 24, 10, 0, Math.PI * 2);
    g.fill();
  };

  let left: VirtualJoystick | undefined;
  let right: VirtualJoystick | undefined;
  let releaseButton: HTMLButtonElement | undefined;
  const onKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') engage(false);
  };
  let engaged = false;
  let engageBox: HTMLInputElement | undefined;

  // The joystick overlay is one canvas on document.body above the whole page, so it is only
  // switched on (pointer events) while the reader asks for it; Esc or the button turns it off.
  function engage(on: boolean): void {
    engaged = on;
    if (engageBox) engageBox.checked = on;
    const canvas = VirtualJoystick.Canvas;
    if (canvas) canvas.style.pointerEvents = on ? 'auto' : 'none';
    if (releaseButton) releaseButton.style.display = on ? 'block' : 'none';
  }

  if (!ctx.preview) {
    // alwaysVisible keeps the sticks drawn; the docs' constructor takes a flag for the left or right side.
    left = new VirtualJoystick(true, { alwaysVisible: true });
    right = new VirtualJoystick(false, { alwaysVisible: true });
    const canvas = VirtualJoystick.Canvas!;
    canvas.style.position = 'fixed';
    left.setPosition(window.innerWidth * 0.18, window.innerHeight * 0.78);
    right.setPosition(window.innerWidth * 0.82, window.innerHeight * 0.78);
    releaseButton = document.createElement('button');
    releaseButton.className = 'btn';
    releaseButton.textContent = 'Release the page (Esc)';
    Object.assign(releaseButton.style, { position: 'fixed', top: '12px', right: '12px', zIndex: '10', display: 'none' });
    releaseButton.addEventListener('click', () => engage(false));
    document.body.append(releaseButton);
    window.addEventListener('keydown', onKey);
    engage(false);

    const panel = createPanel(el);
    engageBox = panel.check('Engage the joystick overlay (it covers the whole page until released)', false, engage);
    panel.readout('Left stick moves the ball, right stick orbits the camera. Works with touch or mouse.');
  }

  stage.run(() => {
    const dt = stage.engine.getDeltaTime() / 1000;
    t += dt;
    if (left && right) {
      // deltaPosition is a Vector3 that updates while the stick is held.
      leftValue.copyFrom(left.deltaPosition);
      rightValue.copyFrom(right.deltaPosition);
    } else {
      leftValue.set(Math.cos(t * 0.9), Math.sin(t * 0.9) * 0.8, 0);
      rightValue.set(Math.sin(t * 0.4) * 0.7, 0, 0);
    }
    ball.position.x = Math.max(-7, Math.min(7, ball.position.x + leftValue.x * dt * 5));
    ball.position.z = Math.max(-7, Math.min(7, ball.position.z + leftValue.y * dt * 5));
    camera.alpha -= rightValue.x * dt * 1.5;
    g.clearRect(0, 0, hud.width, hud.height);
    drawStick(50, leftValue);
    drawStick(210, rightValue);
  });

  return () => {
    window.removeEventListener('keydown', onKey);
    releaseButton?.remove();
    // Release the first-created joystick first: it owns the resize listener. Then the shared canvas is gone.
    left?.releaseCanvas();
    right?.releaseCanvas();
    VirtualJoystick.Canvas?.remove();
    stage.dispose();
    wrap.remove();
  };
};

export default mount;
