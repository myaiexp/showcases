// Animation steps chained with beginDirectAnimation's end callback: approach, open, enter, lights, close
import { Animation, FreeCamera, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { buildRoom } from './scene.ts';
import './style.css';

const FPS = 30;
const CONSTANT = Animation.ANIMATIONLOOPMODE_CONSTANT;

/** A one-property animation running from key 0 to `frames` along the given values. */
function track(name: string, prop: string, type: number, frames: number, from: unknown, to: unknown): Animation {
  const a = new Animation(name, prop, FPS, type, CONSTANT);
  a.setKeys([
    { frame: 0, value: from },
    { frame: frames, value: to },
  ]);
  return a;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene } = stage;
  scene.clearColor.set(0.5, 0.65, 0.85, 1);
  const camera = new FreeCamera('camera', new Vector3(0, 5, -30), scene);
  const { hinge, spots } = buildRoom(scene);

  const OPEN = Math.PI / 2.2;
  const V3 = Animation.ANIMATIONTYPE_VECTOR3;
  const F = Animation.ANIMATIONTYPE_FLOAT;
  // Each step starts when the previous one's onAnimationEnd fires; the last one starts the first again.
  const steps: { label: string; run: (next: () => void) => void }[] = [
    {
      label: '1. camera moves to the door',
      run: (next) => {
        camera.position.set(0, 5, -30);
        camera.rotation.y = 0;
        scene.beginDirectAnimation(camera, [track('approach', 'position', V3, 90, new Vector3(0, 5, -30), new Vector3(0, 2, -10))], 0, 90, false, 1, next);
      },
    },
    {
      label: '2. door swings open',
      run: (next) => {
        scene.beginDirectAnimation(hinge, [track('open', 'rotation.y', F, 60, 0, OPEN)], 0, 60, false, 1, next);
      },
    },
    {
      label: '3. camera enters and turns',
      run: (next) => {
        const moveIn = track('moveIn', 'position', V3, 150, new Vector3(0, 2, -10), new Vector3(-2, 2, 3));
        const turn = track('turn', 'rotation.y', F, 150, 0, Math.PI);
        scene.beginDirectAnimation(camera, [moveIn, turn], 0, 150, false, 1, next);
      },
    },
    {
      label: '4. spot lights come on',
      run: (next) => {
        spots.forEach((spot, i) => {
          const dim = track('dimmer', 'intensity', F, 60, 0, 1);
          scene.beginDirectAnimation(spot, [dim], 0, 60, false, 1, i === 0 ? next : undefined);
        });
      },
    },
    {
      label: '5. door closes, lights go out',
      run: (next) => {
        spots.forEach((spot) => {
          scene.beginDirectAnimation(spot, [track('off', 'intensity', F, 45, 1, 0)], 0, 45, false);
        });
        scene.beginDirectAnimation(hinge, [track('close', 'rotation.y', F, 60, OPEN, 0)], 0, 60, false, 1, next);
      },
    },
  ];

  let status: HTMLElement | null = null;
  if (!ctx.preview) {
    status = document.createElement('div');
    status.className = 'panel';
    el.append(status);
  }
  const play = (i: number): void => {
    const step = steps[i % steps.length]!;
    if (status) status.textContent = step.label;
    step.run(() => play(i + 1));
  };
  play(0);

  stage.run();
  return () => {
    status?.remove();
    stage.dispose();
  };
};

export default mount;
