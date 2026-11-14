// DeviceSourceManager keyboard and pointer readouts
import { ArcRotateCamera, Color3, DeviceSourceManager, DeviceType, HemisphericLight, MeshBuilder, PointerInput, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Key codes the demo reads. DeviceType.Keyboard inputs are plain key codes.
const KEYS = { W: 87, A: 65, S: 83, D: 68, SPACE: 32, UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39 };

const mount: Mount = (el, ctx) => {
  // A wrapper so the text readout can sit over the canvas.
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'relative', width: '100%' });
  el.append(wrap);
  const stage = createStage(wrap, ctx);
  const { scene, canvas, engine } = stage;
  canvas.tabIndex = 0;

  new ArcRotateCamera('camera', -Math.PI / 2, 1.0, 11, new Vector3(0, 0.5, 0), scene);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.2), scene);
  scene.clearColor.set(0.08, 0.09, 0.12, 1);
  const floor = MeshBuilder.CreateGround('floor', { width: 14, height: 14 }, scene);
  const floorMat = new StandardMaterial('floor-mat', scene);
  floorMat.diffuseColor = new Color3(0.16, 0.18, 0.25);
  floor.material = floorMat;
  const cube = MeshBuilder.CreateBox('cube', { size: 1.2 }, scene);
  cube.position.y = 0.6;
  const cubeMat = new StandardMaterial('cube-mat', scene);
  cube.material = cubeMat;

  const readout = document.createElement('pre');
  Object.assign(readout.style, {
    position: 'absolute',
    top: '6px',
    left: '8px',
    margin: '0',
    font: '11px/1.35 var(--font-mono, monospace)',
    color: '#c0caf5',
    pointerEvents: 'none',
    textShadow: '0 0 4px #000',
  });
  wrap.append(readout);

  // The manager watches the engine's input element; devices appear when they are first used.
  const manager = new DeviceSourceManager(engine);
  const devices = new Map<string, string>();
  const connected = manager.onDeviceConnectedObservable.add((d) => devices.set(`${d.deviceType}:${d.deviceSlot}`, `${DeviceType[d.deviceType]} (slot ${d.deviceSlot})`));
  const disconnected = manager.onDeviceDisconnectedObservable.add((d) => devices.delete(`${d.deviceType}:${d.deviceSlot}`));
  let lastKey = '-';
  let keyHooked = false;

  // Preview cards take no input, so they feed the canvas synthetic key and pointer events;
  // everything below reads them through the same DeviceSourceManager.
  let simTime = 0;
  let simKey = -1;
  const sim = (): void => {
    simTime += engine.getDeltaTime() / 1000;
    const want = [KEYS.W, KEYS.D, KEYS.S, KEYS.A][Math.floor(simTime / 0.9) % 4]!;
    if (want !== simKey) {
      if (simKey >= 0) canvas.dispatchEvent(new KeyboardEvent('keyup', { keyCode: simKey, key: String.fromCharCode(simKey) }));
      simKey = want;
      canvas.dispatchEvent(new KeyboardEvent('keydown', { keyCode: want, key: String.fromCharCode(want) }));
    }
    const r = canvas.getBoundingClientRect();
    canvas.dispatchEvent(
      new PointerEvent('pointermove', {
        pointerType: 'mouse',
        pointerId: 1,
        clientX: r.left + r.width * (0.5 + 0.4 * Math.sin(simTime)),
        clientY: r.top + r.height * (0.5 + 0.3 * Math.cos(simTime * 1.3)),
      }),
    );
  };

  stage.run(() => {
    if (ctx.preview) sim();
    const keyboard = manager.getDeviceSource(DeviceType.Keyboard);
    const mouse = manager.getDeviceSource(DeviceType.Mouse);
    if (keyboard && !keyHooked) {
      // Keyboards also publish an event per change, with the original KeyboardEvent data.
      keyHooked = true;
      keyboard.onInputChangedObservable.add((e) => (lastKey = `${e.key ?? e.code ?? ''} (code ${e.inputIndex})`));
    }

    // Poll with getInput: 1 while a key or button is down, 0 otherwise.
    const dt = engine.getDeltaTime() / 1000;
    const down = (code: number): boolean => keyboard?.getInput(code) === 1;
    const dx = (down(KEYS.D) || down(KEYS.RIGHT) ? 1 : 0) - (down(KEYS.A) || down(KEYS.LEFT) ? 1 : 0);
    const dz = (down(KEYS.W) || down(KEYS.UP) ? 1 : 0) - (down(KEYS.S) || down(KEYS.DOWN) ? 1 : 0);
    cube.position.x = Math.max(-6, Math.min(6, cube.position.x + dx * 5 * dt));
    cube.position.z = Math.max(-6, Math.min(6, cube.position.z + dz * 5 * dt));
    cube.position.y = 0.6 + (down(KEYS.SPACE) ? 0.8 : 0);
    const left = mouse?.getInput(PointerInput.LeftClick) === 1;
    cube.scaling.setAll(left ? 1.5 : 1);
    const mx = mouse?.getInput(PointerInput.Horizontal) ?? 0;
    const my = mouse?.getInput(PointerInput.Vertical) ?? 0;
    cubeMat.diffuseColor = Color3.FromHSV((mx / Math.max(1, canvas.clientWidth)) * 300, 0.6, 0.6 + (my / Math.max(1, canvas.clientHeight)) * 0.4);

    readout.textContent = [
      `devices: ${[...devices.values()].join(', ') || 'none yet' + (ctx.preview ? '' : ' (click the canvas, move, press keys)')}`,
      `WASD/arrows ${dx},${dz}  space ${down(KEYS.SPACE) ? 'down' : 'up'}  last key ${lastKey}`,
      `pointer ${Math.round(mx)}, ${Math.round(my)}  left button ${left ? 'down' : 'up'}`,
      ctx.preview ? '(simulated input in this card)' : '',
    ].join('\n');
  });

  return () => {
    manager.onDeviceConnectedObservable.remove(connected);
    manager.onDeviceDisconnectedObservable.remove(disconnected);
    manager.dispose();
    stage.dispose();
    wrap.remove();
  };
};

export default mount;
