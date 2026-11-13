// A generator coroutine that spawns a spiral of spheres one per frame, waits on a Promise, then removes them
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Tools,
  Vector3,
} from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.1, 0.11, 0.14, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 22, new Vector3(0, 3, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.4), scene);

  let panel: HTMLElement | null = null;
  let status: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    status = document.createElement('span');
    panel.append(status);
    el.append(panel);
  }
  const say = (text: string): void => {
    if (status) status.textContent = text;
  };

  const COUNT = ctx.preview ? 40 : 90;
  let frame = 0;
  let alive = true;
  const spawned: Mesh[] = [];

  // Each `yield` hands control back until the next frame; yielding a Promise waits for it first.
  const spiralCoroutine = function* (): Generator<Promise<void> | void> {
    while (alive) {
      for (let i = 0; i < COUNT; i++) {
        const s = MeshBuilder.CreateSphere(`s${i}`, { diameter: 0.9, segments: 10 }, scene);
        const a = i * 0.45;
        s.position.set(Math.cos(a) * (2 + i * 0.07), i * 0.12, Math.sin(a) * (2 + i * 0.07));
        const mat = new StandardMaterial(`m${i}`, scene);
        mat.diffuseColor = Color3.FromHSV((i / COUNT) * 300, 0.7, 1);
        s.material = mat;
        spawned.push(s);
        say(`frame ${frame}: spawned sphere ${i + 1} of ${COUNT}`);
        yield;
      }
      say('all spawned: waiting 1.5 s on Tools.DelayAsync');
      yield Tools.DelayAsync(1500);
      while (spawned.length) {
        const s = spawned.pop()!;
        s.material?.dispose();
        s.dispose();
        say(`frame ${frame}: removed one, ${spawned.length} left`);
        yield;
      }
      yield Tools.DelayAsync(600);
    }
  };
  const frameCounter = scene.onBeforeRenderObservable.add(() => {
    frame++;
    if (ctx.preview) camera.alpha += 0.004;
  });
  void scene.onBeforeRenderObservable.runCoroutineAsync(spiralCoroutine());

  stage.run();
  return () => {
    alive = false;
    scene.onBeforeRenderObservable.remove(frameCounter);
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
