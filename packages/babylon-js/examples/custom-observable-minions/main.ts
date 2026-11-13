// A hand-made Observable on a master sphere, watched by two minion observers you can add and remove
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  Observable,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mesh, Observer } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.1, 0.11, 0.14, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 14, new Vector3(0, 0, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, -0.4), scene);

  const ball = (name: string, color: Color3, diameter: number, y: number): Mesh => {
    const m = MeshBuilder.CreateSphere(name, { diameter, segments: 24 }, scene);
    const mat = new StandardMaterial(`${name}Mat`, scene);
    mat.diffuseColor = color;
    m.material = mat;
    m.position.y = y;
    return m;
  };
  const master = ball('master', new Color3(0.95, 0.8, 0.25), 1.6, 0);
  const growMinion = ball('growMinion', new Color3(0.3, 0.8, 0.9), 1, 3);
  const spinMinion = MeshBuilder.CreateBox('spinMinion', { size: 1 }, scene);
  spinMinion.position.y = -3;
  const spinMat = new StandardMaterial('spinMat', scene);
  spinMat.diffuseColor = new Color3(0.9, 0.4, 0.6);
  spinMinion.material = spinMat;

  // The Observable is a property of the master; its payload is the new x position.
  const onXChange = new Observable<number>();

  // Two observers react to every notification.
  const growMe = (x: number): void => {
    growMinion.scaling.setAll(1 + (x + 5) / 5);
  };
  const spinMe = (x: number): void => {
    spinMinion.rotation.y = x * 0.8;
    spinMinion.rotation.x = x * 0.4;
  };
  const observers: Record<string, Observer<number> | null> = {
    grow: onXChange.add(growMe),
    spin: onXChange.add(spinMe),
  };

  let flashTimer: ReturnType<typeof setTimeout> | undefined;
  let panel: HTMLElement | null = null;
  let status: HTMLElement | null = null;
  const refresh = (): void => {
    if (status) status.textContent = `onXChange.hasObservers: ${onXChange.hasObservers()}`;
  };
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    const toggle = (key: 'grow' | 'spin', fn: (x: number) => void, label: string): void => {
      const b = document.createElement('button');
      b.classList.add('btn');
      const text = (): string => `${observers[key] ? 'remove' : 'add'} ${label} observer`;
      b.textContent = text();
      b.onclick = () => {
        if (observers[key]) {
          onXChange.remove(observers[key]);
          observers[key] = null;
        } else {
          observers[key] = onXChange.add(fn);
        }
        b.textContent = text();
        refresh();
      };
      panel!.append(b);
    };
    toggle('grow', growMe, 'scale (top sphere)');
    toggle('spin', spinMe, 'rotate (bottom cube)');
    const once = document.createElement('button');
    once.classList.add('btn');
    once.textContent = 'addOnce: flash the master';
    once.onclick = () => {
      // addOnce runs on the next notification, then removes itself.
      onXChange.addOnce(() => {
        const mat = master.material as StandardMaterial;
        mat.emissiveColor.set(1, 1, 1);
        clearTimeout(flashTimer);
        flashTimer = setTimeout(() => mat.emissiveColor.set(0, 0, 0), 200);
      });
    };
    status = document.createElement('span');
    panel.append(once, status);
    el.append(panel);
    refresh();
  }

  // Each frame the master moves; when its x changes it notifies its observers.
  let t = 0;
  let lastX = NaN;
  const frameObserver = scene.onBeforeRenderObservable.add(() => {
    t += stage.engine.getDeltaTime() / 1000;
    const x = Math.sin(t) * 5;
    master.position.x = x;
    if (x !== lastX) {
      lastX = x;
      onXChange.notifyObservers(x);
    }
    if (ctx.preview) camera.alpha += 0.002;
  });
  stage.run();
  return () => {
    scene.onBeforeRenderObservable.remove(frameObserver);
    clearTimeout(flashTimer);
    onXChange.clear();
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
