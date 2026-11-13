// SceneOptimizer degrading a heavy scene, listing each applied step
import { ArcRotateCamera, SceneOptimizer, SceneOptimizerOptions, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { buildWorld } from './world.ts';
import type { World } from './world.ts';

const PRESETS = ['LowDegradationAllowed', 'ModerateDegradationAllowed', 'HighDegradationAllowed'] as const;

const mount: Mount = (el, ctx) => {
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'relative', width: '100%' });
  el.append(wrap);
  const stage = createStage(wrap, ctx);
  const { scene, canvas, engine } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2.4, 1.0, 17, new Vector3(0, 0.5, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);

  const log = document.createElement('pre');
  let world: World = buildWorld(scene, camera);
  let optimizer: SceneOptimizer | undefined;
  let preset: (typeof PRESETS)[number] = 'ModerateDegradationAllowed';
  let targetFps = 1000; // unreachable on purpose, so every level gets applied
  const applied: string[] = [];

  const show = (): void => {
    log.textContent = `target ${targetFps} fps, now ${optimizer ? optimizer.currentFrameRate.toFixed(0) : engine.getFps().toFixed(0)} fps, hardware scaling ${engine.getHardwareScalingLevel()}\n${applied.length ? applied.map((a, i) => `${i + 1}. ${a}`).join('\n') : 'nothing applied yet'}`;
  };

  const start = (): void => {
    optimizer?.dispose();
    applied.length = 0;
    // The presets are SceneOptimizerOptions with progressive levels; trackerDuration is the pause between levels.
    const options = SceneOptimizerOptions[preset](targetFps);
    options.trackerDuration = ctx.preview ? 700 : 1200;
    optimizer = new SceneOptimizer(scene, options);
    optimizer.onNewOptimizationAppliedObservable.add((o) => {
      applied.push(`${o.getDescription()} (priority ${o.priority})`);
      show();
    });
    optimizer.onFailureObservable.add(() => {
      applied.push('target fps not reached with these options');
      show();
    });
    optimizer.start();
    show();
  };

  const reset = (): void => {
    optimizer?.dispose();
    optimizer = undefined;
    world.dispose();
    engine.setHardwareScalingLevel(1);
    world = buildWorld(scene, camera);
    applied.length = 0;
    show();
  };

  let t = 0;
  let timer = 0;
  stage.run(() => {
    t += engine.getDeltaTime() / 1000;
    world.update(t);
    if (ctx.preview) camera.alpha += 0.005;
  });

  if (ctx.preview) {
    Object.assign(log.style, { position: 'absolute', left: '0', top: '0', margin: '0', padding: '4px 6px', fontSize: '10px', color: 'var(--green)', background: 'rgba(8,9,14,0.75)', maxWidth: '70%', whiteSpace: 'pre-wrap', pointerEvents: 'none' });
    wrap.append(log);
    // Run, let the degradation play out, then rebuild the full-quality world and go again.
    const cycle = (): void => {
      reset();
      start();
    };
    timer = window.setInterval(cycle, 9000);
    window.setTimeout(start, 800);
    const tick = window.setInterval(show, 400);
    const stopTick = (): void => window.clearInterval(tick);
    return () => {
      stopTick();
      window.clearInterval(timer);
      optimizer?.dispose();
      stage.dispose();
      wrap.remove();
    };
  }

  const panel = createPanel(el);
  panel.select('options preset', PRESETS, preset, (v) => (preset = v));
  panel.slider('targetFrameRate', 20, 1000, 10, targetFps, (v) => (targetFps = v));
  panel.row();
  panel.button('new SceneOptimizer(...).start()', start);
  panel.button('stop()', () => optimizer?.stop());
  panel.button('Rebuild the full-quality world', reset);
  Object.assign(log.style, { width: '100%', margin: '0', padding: 'var(--space-2) var(--space-3)', boxSizing: 'border-box', background: 'var(--bg-surface)', color: 'var(--fg-2)', fontSize: '0.8rem', height: '9em', overflow: 'auto' });
  el.append(log);
  show();
  const tick = window.setInterval(show, 500);

  return () => {
    window.clearInterval(tick);
    optimizer?.dispose();
    stage.dispose();
    wrap.remove();
  };
};

export default mount;
