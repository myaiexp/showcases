// Keyboard and pointer observables driving a ball, with an event tally
import { ArcRotateCamera, Color3, Color4, HemisphericLight, KeyboardEventTypes, KeyboardInfo, MeshBuilder, PointerEventTypes, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const MOVES: Record<string, Vector3> = {
  w: new Vector3(0, 0, 1),
  s: new Vector3(0, 0, -1),
  a: new Vector3(-1, 0, 0),
  d: new Vector3(1, 0, 0),
  arrowup: new Vector3(0, 0, 1),
  arrowdown: new Vector3(0, 0, -1),
  arrowleft: new Vector3(-1, 0, 0),
  arrowright: new Vector3(1, 0, 0),
};

const POINTER_NAMES = new Map<number, string>(Object.entries(PointerEventTypes).map(([name, value]) => [value, name]));

const mount: Mount = (el, ctx) => {
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'relative', width: '100%' });
  el.append(wrap);
  const stage = createStage(wrap, ctx);
  const { scene, canvas, engine } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.0, 14, new Vector3(0, 0, 0), scene);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.05, 0.07, 0.14, 1);

  const ground = MeshBuilder.CreateGround('ground', { width: 12, height: 12, subdivisions: 12 }, scene);
  const groundMat = new StandardMaterial('ground-mat', scene);
  groundMat.diffuseColor = new Color3(0.25, 0.3, 0.38);
  groundMat.wireframe = true;
  ground.material = groundMat;
  const ball = MeshBuilder.CreateSphere('ball', { diameter: 1.4 }, scene);
  ball.position.y = 0.7;
  const ballMat = new StandardMaterial('ball-mat', scene);
  ballMat.diffuseColor = new Color3(0.95, 0.55, 0.2);
  ball.material = ballMat;
  const marker = MeshBuilder.CreateTorus('marker', { diameter: 1.2, thickness: 0.08 }, scene);
  marker.isVisible = false;

  // Keyboard: remember which keys are held, move the ball each frame.
  const held = new Set<string>();
  const kb = scene.onKeyboardObservable.add((info) => {
    const key = info.event.key.toLowerCase();
    if (info.type === KeyboardEventTypes.KEYDOWN) held.add(key);
    else if (info.type === KeyboardEventTypes.KEYUP) held.delete(key);
  });

  // Pointer: tally every event type; a pick on the ground moves the marker, wheel resizes the ball.
  const tally = new Map<string, number>();
  let last = '';
  const px = scene.onPointerObservable.add((info) => {
    const name = POINTER_NAMES.get(info.type) ?? String(info.type);
    tally.set(name, (tally.get(name) ?? 0) + 1);
    last = name;
    switch (info.type) {
      case PointerEventTypes.POINTERPICK:
        if (info.pickInfo?.hit && info.pickInfo.pickedMesh === ground && info.pickInfo.pickedPoint) {
          marker.isVisible = true;
          marker.position.copyFrom(info.pickInfo.pickedPoint).addInPlaceFromFloats(0, 0.05, 0);
        }
        break;
      case PointerEventTypes.POINTERWHEEL: {
        const dy = (info.event as WheelEvent).deltaY;
        ball.scaling.scaleInPlace(dy > 0 ? 0.92 : 1.08);
        break;
      }
      case PointerEventTypes.POINTERDOUBLETAP:
        ballMat.diffuseColor = Color3.Random();
        break;
    }
  });

  const caption = document.createElement('pre');
  Object.assign(caption.style, { position: 'absolute', left: '0', top: '0', margin: '0', padding: '4px 8px', fontSize: ctx.preview ? '10px' : '12px', color: 'var(--green)', background: 'rgba(8,9,14,0.75)', pointerEvents: 'none' });
  wrap.append(caption);
  const show = (): void => {
    const counts = ['POINTERDOWN', 'POINTERUP', 'POINTERMOVE', 'POINTERWHEEL', 'POINTERPICK', 'POINTERTAP', 'POINTERDOUBLETAP'].map((n) => `${n.replace('POINTER', '').toLowerCase()} ${tally.get(n) ?? 0}`);
    caption.textContent = `keys held: ${[...held].join(' ') || '-'}\nlast pointer event: ${last || '-'}\n${counts.join('  ')}`;
  };

  let t = 0;
  const speed = 5;
  stage.run(() => {
    const dt = engine.getDeltaTime() / 1000;
    t += dt;
    for (const key of held) {
      const dir = MOVES[key];
      if (dir) ball.position.addInPlace(dir.scale(speed * dt));
    }
    ball.position.x = Math.max(-5.5, Math.min(5.5, ball.position.x));
    ball.position.z = Math.max(-5.5, Math.min(5.5, ball.position.z));
    ball.rotation.y = t;
    show();
  });

  let timer = 0;
  if (ctx.preview) {
    // No input reaches a card, so scripted key events go through the same observable.
    const script = ['arrowright', 'arrowup', 'arrowleft', 'arrowdown'];
    let i = 0;
    const press = (key: string, type: number): void => {
      scene.onKeyboardObservable.notifyObservers(new KeyboardInfo(type, new KeyboardEvent(type === KeyboardEventTypes.KEYDOWN ? 'keydown' : 'keyup', { key })));
    };
    const step = (): void => {
      const key = script[i++ % script.length]!;
      press(key, KeyboardEventTypes.KEYDOWN);
      timer = window.setTimeout(() => {
        press(key, KeyboardEventTypes.KEYUP);
        timer = window.setTimeout(step, 150);
      }, 900);
    };
    step();
  } else {
    camera.attachControl(canvas, true);
    // Keyboard events only reach a focused canvas, so click it first.
    canvas.tabIndex = 0;
    canvas.addEventListener('pointerdown', () => canvas.focus());
    canvas.focus();
    const hint = document.createElement('div');
    hint.textContent = 'Click the scene, then use WASD or the arrow keys. Click the ground to drop a marker, scroll to resize the ball, double-click to recolour it.';
    Object.assign(hint.style, { width: '100%', padding: 'var(--space-2) var(--space-3)', boxSizing: 'border-box', background: 'var(--bg-surface)', color: 'var(--fg-2)', fontSize: '0.85rem' });
    el.append(hint);
  }

  return () => {
    window.clearTimeout(timer);
    scene.onKeyboardObservable.remove(kb);
    scene.onPointerObservable.remove(px);
    stage.dispose();
    wrap.remove();
  };
};

export default mount;
