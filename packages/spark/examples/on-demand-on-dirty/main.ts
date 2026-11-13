// On-demand rendering: no loop, Spark's onDirty and a coalesced requestRender
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, button, checkbox, overlay } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const counts = { frames: 0, requests: 0, dirty: 0 };

  // The docs' requestRender: any number of calls in a frame turn into one render.
  let renderScheduled = false;
  let raf = 0;
  const requestRender = (): void => {
    counts.requests++;
    if (renderScheduled) return;
    renderScheduled = true;
    raf = requestAnimationFrame(() => {
      renderScheduled = false;
      counts.frames++;
      stage.renderer.render(stage.scene, stage.camera);
      show();
    });
  };

  // createStage builds the renderer, SparkRenderer and camera; we simply never call run().
  // Spark calls onDirty when a sort or a load finishes: that is what draws the first frame.
  const stage = createStage(el, ctx, {
    position: [0, 0.4, 3.4],
    orbit: false,
    spark: {
      onDirty: () => {
        counts.dirty++;
        requestRender();
      },
    },
  });
  const knot = new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, ctx.preview ? 12000 : 24000) });
  stage.scene.add(knot);
  const label = overlay(el);
  const show = (): void => {
    label.textContent = `frames rendered ${counts.frames}\nrender requests ${counts.requests}\nonDirty calls ${counts.dirty}`;
  };

  // The camera moves only when asked: a drag changes yaw/pitch, then requests a render.
  let yaw = 0.4;
  let pitch = 0.15;
  const placeCamera = (): void => {
    const r = 3.4;
    stage.camera.position.set(Math.sin(yaw) * Math.cos(pitch) * r, Math.sin(pitch) * r, Math.cos(yaw) * Math.cos(pitch) * r);
    stage.camera.lookAt(0, 0, 0);
  };
  placeCamera();

  const ac = new AbortController();
  const { signal } = ac;
  let drag: { x: number; y: number } | null = null;
  if (!ctx.preview) {
    const c = stage.canvas;
    c.style.cursor = 'grab';
    c.addEventListener('pointerdown', (e) => {
      drag = { x: e.clientX, y: e.clientY };
      c.setPointerCapture(e.pointerId);
    }, { signal });
    c.addEventListener('pointermove', (e) => {
      if (!drag) return;
      yaw -= (e.clientX - drag.x) * 0.008;
      pitch = Math.max(-1.4, Math.min(1.4, pitch + (e.clientY - drag.y) * 0.008));
      drag = { x: e.clientX, y: e.clientY };
      placeCamera();
      requestRender();
    }, { signal });
    c.addEventListener('pointerup', () => (drag = null), { signal });
  }
  // Resizing clears the canvas, and Spark cannot see it, so ask for a frame.
  const resizeObserver = new ResizeObserver(requestRender);
  resizeObserver.observe(stage.canvas);

  // The application owns every change it makes: nudge the knot, then request a render.
  const nudge = (): void => {
    knot.rotation.y += 0.5;
    requestRender();
  };
  let timer = window.setInterval(nudge, ctx.preview ? 700 : 1500);
  if (!ctx.preview) {
    const bar = controlBar(el);
    button(bar, 'Nudge now', nudge);
    checkbox(bar, 'rotate every 1.5 s', true, (on) => {
      window.clearInterval(timer);
      timer = on ? window.setInterval(nudge, 1500) : 0;
    });
    checkbox(bar, 'continuous loop, for comparison', false, (on) => {
      stage.renderer.setAnimationLoop(
        on
          ? () => {
              counts.frames++;
              knot.rotation.y += 0.01;
              stage.renderer.render(stage.scene, stage.camera);
              show();
            }
          : null,
      );
      if (!on) requestRender();
    });
  }

  show();
  requestRender();
  return () => {
    window.clearInterval(timer);
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    ac.abort();
    stage.dispose();
  };
};

export default mount;
