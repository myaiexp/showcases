// Performance recipe: an IntersectionObserver pauses drawing while offscreen
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox } from '../../shared/controls.ts';
import { badge } from '../../shared/overlay.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll the box: the frame counter stops while the globe is out of view.' });

  // Put the globe in a scrollable box with empty space above and below it.
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:relative';
  const scroller = document.createElement('div');
  const viewH = Math.round(stage.height * (stage.preview ? 0.75 : 0.6));
  scroller.style.cssText = `width:${stage.width + 16}px;height:${viewH}px;overflow-y:auto;overflow-x:hidden;
    border:1px solid var(--fg-3);border-radius:6px`;
  const spacer = (): HTMLDivElement => {
    const s = document.createElement('div');
    s.style.cssText = `height:${stage.height + 40}px`;
    return s;
  };
  const globeBox = document.createElement('div');
  globeBox.style.cssText = 'display:flex;justify-content:center';
  globeBox.append(stage.layer);
  scroller.append(spacer(), globeBox, spacer());
  wrap.append(scroller);
  stage.box.prepend(wrap);
  const status = badge(wrap, 'paused', 'top-left');

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.25,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.2, 0.2, 0.25],
    markers: [{ location: [37.78, -122.44], size: 0.05 }],
  });
  stage.own(globe);

  let phi = 0;
  let frames = 0;
  let raf = 0;
  const show = (): void => {
    status.textContent = `${raf ? 'rendering' : 'paused'}\nframes: ${frames}`;
  };
  function animate(): void {
    phi += 0.01;
    frames++;
    globe.update({ phi });
    show();
    raf = requestAnimationFrame(animate);
  }
  // Pause rendering when not visible
  const observer = new IntersectionObserver(
    ([e]) => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (e!.isIntersecting) animate();
      show();
    },
    { root: scroller },
  );
  observer.observe(stage.canvas);
  stage.onDispose(() => {
    observer.disconnect();
    cancelAnimationFrame(raf);
    raf = 0;
  });

  let auto = true;
  if (stage.bar) checkbox(stage.bar, 'Auto-scroll', true, (v) => (auto = v));
  stage.loop((_dt, t) => {
    if (!auto) return;
    const max = scroller.scrollHeight - scroller.clientHeight;
    scroller.scrollTop = (max * (1 - Math.cos((t / 7) * Math.PI * 2))) / 2;
  });
  show();

  return stage.dispose;
};

export default mount;
