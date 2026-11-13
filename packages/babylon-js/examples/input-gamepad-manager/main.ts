// GamepadManager readout with a scripted virtual pad
import { ArcRotateCamera, Color3, GamepadManager, HemisphericLight, MeshBuilder, StandardMaterial, Vector3, Xbox360Button, Xbox360Pad } from '@babylonjs/core';
import type { Gamepad } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

interface FakeBrowserPad {
  id: string;
  index: number;
  buttons: { value: number }[];
  axes: number[];
}

const mount: Mount = (el, ctx) => {
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'relative', width: '100%' });
  el.append(wrap);
  const stage = createStage(wrap, ctx);
  const { scene } = stage;

  new ArcRotateCamera('camera', -Math.PI / 2, 1.0, 12, Vector3.Zero(), scene);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.2), scene);
  scene.clearColor.set(0.08, 0.09, 0.12, 1);
  const floor = MeshBuilder.CreateGround('floor', { width: 14, height: 14 }, scene);
  const floorMat = new StandardMaterial('floor-mat', scene);
  floorMat.diffuseColor = new Color3(0.16, 0.18, 0.25);
  floor.material = floorMat;
  const ball = MeshBuilder.CreateSphere('ball', { diameter: 1.4, segments: 20 }, scene);
  const ballMat = new StandardMaterial('ball-mat', scene);
  ballMat.diffuseColor = new Color3(0.5, 0.8, 1);
  ball.material = ballMat;
  ball.position.y = 0.7;

  const readout = document.createElement('pre');
  Object.assign(readout.style, { position: 'absolute', top: '6px', left: '8px', margin: '0', font: '11px/1.35 var(--font-mono, monospace)', color: '#c0caf5', pointerEvents: 'none', textShadow: '0 0 4px #000' });
  wrap.append(readout);
  const hud = document.createElement('canvas');
  hud.width = 170;
  hud.height = 90;
  Object.assign(hud.style, { position: 'absolute', right: '8px', bottom: '8px', pointerEvents: 'none' });
  wrap.append(hud);
  const g = hud.getContext('2d')!;

  // The manager listens for gamepadconnected events and polls the browser's gamepads.
  const manager = new GamepadManager(scene);
  let lastButton = '-';
  const watch = (pad: Gamepad): void => {
    if (pad instanceof Xbox360Pad) pad.onButtonDownObservable.add((b) => (lastButton = Xbox360Button[b] ?? String(b)));
  };
  let connectedLine = 'no pad connected: showing a scripted virtual Xbox360Pad';
  const onConnect = manager.onGamepadConnectedObservable.add((pad) => {
    connectedLine = `connected: ${pad.id}`;
    watch(pad);
  });
  const onDisconnect = manager.onGamepadDisconnectedObservable.add(() => {
    connectedLine = 'no pad connected: showing a scripted virtual Xbox360Pad';
  });

  // The stand-in: a real Xbox360Pad object wrapped around a fake browser gamepad that a script writes to.
  const fake: FakeBrowserPad = { id: 'virtual', index: 0, buttons: Array.from({ length: 16 }, () => ({ value: 0 })), axes: [0, 0, 0, 0] };
  const virtual = new Xbox360Pad('Virtual Xbox 360 pad', 0, fake);
  watch(virtual);

  let t = 0;
  let vy = 0;
  stage.run(() => {
    const dt = stage.engine.getDeltaTime() / 1000;
    t += dt;
    const real = manager.gamepads[0];
    let pad: Gamepad = virtual;
    if (real) pad = real;
    else {
      fake.axes[0] = Math.cos(t * 1.1) * 0.9;
      fake.axes[1] = Math.sin(t * 1.1) * 0.9;
      fake.axes[2] = Math.cos(t * 0.5) * 0.6;
      fake.axes[3] = Math.sin(t * 0.7) * 0.6;
      fake.buttons[0]!.value = t % 2.4 < 0.25 ? 1 : 0; // A
      fake.buttons[1]!.value = t % 3.1 < 0.3 ? 1 : 0; // B
      fake.buttons[6]!.value = (Math.sin(t) + 1) / 2; // left trigger
      fake.buttons[7]!.value = (Math.sin(t * 1.6) + 1) / 2; // right trigger
      virtual.update(); // copies the fake values into the pad's own properties
    }

    // Read the state through the Gamepad API, like the docs' check-state snippet.
    const x360 = pad instanceof Xbox360Pad ? pad : null;
    const ls = pad.leftStick;
    ball.position.x = Math.max(-6, Math.min(6, ball.position.x + ls.x * dt * 5));
    ball.position.z = Math.max(-6, Math.min(6, ball.position.z - ls.y * dt * 5));
    if (x360 && x360.buttonA && ball.position.y <= 0.71) vy = 6;
    vy -= 16 * dt;
    ball.position.y = Math.max(0.7, ball.position.y + vy * dt);
    if (ball.position.y === 0.7) vy = 0;
    ballMat.diffuseColor = new Color3(0.4 + (x360?.rightTrigger ?? 0) * 0.6, 0.8 - (x360?.leftTrigger ?? 0) * 0.5, 1 - (x360?.buttonB ?? 0) * 0.7);

    readout.textContent = [
      connectedLine,
      `left stick ${ls.x.toFixed(2)}, ${ls.y.toFixed(2)}   right stick ${pad.rightStick.x.toFixed(2)}, ${pad.rightStick.y.toFixed(2)}`,
      x360 ? `A ${x360.buttonA}  B ${x360.buttonB}  LT ${x360.leftTrigger.toFixed(2)}  RT ${x360.rightTrigger.toFixed(2)}  last button ${lastButton}` : 'not an Xbox360Pad: only sticks are read here',
    ].join('\n');

    // A tiny pad drawing.
    g.clearRect(0, 0, hud.width, hud.height);
    g.strokeStyle = '#7a88b8';
    g.lineWidth = 1.5;
    const stick = (cx: number, cy: number, v: { x: number; y: number }): void => {
      g.beginPath();
      g.arc(cx, cy, 24, 0, Math.PI * 2);
      g.stroke();
      g.fillStyle = '#7dcfff';
      g.beginPath();
      g.arc(cx + v.x * 16, cy + v.y * 16, 7, 0, Math.PI * 2);
      g.fill();
    };
    stick(40, 52, ls);
    stick(128, 52, pad.rightStick);
    if (x360) {
      g.fillStyle = '#9ece6a';
      g.globalAlpha = 0.25 + 0.75 * x360.buttonA;
      g.fillRect(84, 60, 12, 12);
      g.fillStyle = '#f7768e';
      g.globalAlpha = 0.25 + 0.75 * x360.buttonB;
      g.fillRect(100, 48, 12, 12);
      g.globalAlpha = 1;
      g.fillStyle = '#c0caf5';
      g.fillRect(12, 4, 56 * x360.leftTrigger, 6);
      g.fillRect(102, 4, 56 * x360.rightTrigger, 6);
    }
  });

  return () => {
    manager.onGamepadConnectedObservable.remove(onConnect);
    manager.onGamepadDisconnectedObservable.remove(onDisconnect);
    manager.dispose();
    stage.dispose();
    wrap.remove();
  };
};

export default mount;
