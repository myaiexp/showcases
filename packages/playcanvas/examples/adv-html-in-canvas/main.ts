// HTML-in-Canvas: a live HTML panel as a texture, or a 2D canvas stand-in
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { addScreen, screenMaterial } from '../../shared/advanced-feed.ts';
import { showNotice } from '../../shared/notice.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick } from '../../shared/shaders.ts';

const W = 512;
const H = 320;

/** The panel as a canvas 2D drawing, for browsers without HTML-in-Canvas. */
function drawPanel(g: CanvasRenderingContext2D, time: number, count: number): void {
  const grad = g.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#243b6b');
  grad.addColorStop(1, '#5b2a72');
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#fff';
  g.font = 'bold 40px sans-serif';
  g.fillText('Hello 3D World', 28, 70);
  g.font = '28px monospace';
  g.fillText(`t = ${time.toFixed(1)} s`, 28, 130);
  g.fillText(`clicks: ${count}`, 28, 170);
  for (let i = 0; i < 8; i++) {
    const h = 20 + (0.5 + 0.5 * Math.sin(time * 2 + i)) * 70;
    g.fillStyle = `hsl(${200 + i * 20} 80% 65%)`;
    g.fillRect(28 + i * 56, H - 24 - h, 44, h);
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, distance: 7, pitch: -8, yaw: 20, autoRotate: 14, clear: '#141821' });
  const { app, stage } = scene;
  const device = stage.device;
  const canvas = stage.canvas;
  const supported = device.supportsHtmlTextures;
  if (!supported) showNotice(el, 'No HTML-in-Canvas in this browser (Chrome 157 and later has it): the panel is drawn with canvas 2D instead.');

  const texture = new pc.Texture(device, {
    name: 'html-panel',
    width: W,
    height: H,
    format: pc.PIXELFORMAT_RGBA8,
    mipmaps: false,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
  });
  const material = screenMaterial(texture);
  material.cull = pc.CULLFACE_NONE;
  material.update();
  const screen = addScreen(app, material, [0, 0, 0], 5.6, 3.5);

  let clicks = 0;
  const ac = new AbortController();
  const timers: number[] = [];
  const cleanups: (() => void)[] = [];

  if (supported) {
    // 1. opt the canvas in, 2. put a drawable element inside it, 3. bind it as the texture source.
    const html = document.createElement('div');
    html.setAttribute('drawable', '');
    html.style.cssText = `width:${W}px;height:${H}px;box-sizing:border-box;padding:24px;color:#fff;font:28px monospace;background:linear-gradient(135deg,#243b6b,#5b2a72)`;
    const title = document.createElement('div');
    title.style.cssText = 'font:bold 40px sans-serif;margin-bottom:12px';
    title.textContent = 'Hello 3D World';
    const clock = document.createElement('div');
    const bars = document.createElement('div');
    bars.style.cssText = 'display:flex;gap:12px;align-items:flex-end;height:96px;margin-top:20px';
    for (let i = 0; i < 8; i++) {
      const bar = document.createElement('div');
      bar.style.cssText = `width:44px;background:hsl(${200 + i * 20} 80% 65%);animation:adv-bar 1.4s ${i * -0.17}s ease-in-out infinite alternate`;
      bar.style.setProperty('height', '30px');
      bars.append(bar);
    }
    const style = document.createElement('style');
    style.textContent = '@keyframes adv-bar { from { height: 20px } to { height: 90px } }';
    html.append(style, title, clock, bars);
    canvas.setAttribute('content', 'drawable');
    canvas.append(html);
    const target = canvas as HTMLCanvasElement & { requestPaint(): void };
    target.addEventListener('paint', () => texture.setSource(html), { once: true, signal: ac.signal });
    target.requestPaint();
    target.addEventListener('paint', () => texture.upload(), { signal: ac.signal });
    const tick = (): void => void (clock.textContent = `t = ${(performance.now() / 1000).toFixed(1)} s   clicks: ${clicks}`);
    tick();
    timers.push(window.setInterval(tick, 100));
    cleanups.push(() => {
      html.remove();
      canvas.removeAttribute('content');
    });
  } else {
    const paper = document.createElement('canvas');
    paper.width = W;
    paper.height = H;
    const g = paper.getContext('2d')!;
    texture.setSource(paper);
    onTick(app, (t) => {
      drawPanel(g, t, clicks);
      texture.upload();
    });
  }

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.button('Count a click', () => clicks++);
    panel.readout(`supportsHtmlTextures: ${supported}`);
  }

  return () => {
    ac.abort();
    timers.forEach((id) => window.clearInterval(id));
    cleanups.forEach((fn) => fn());
    material.destroy();
    texture.destroy();
    screen.destroy();
    scene.dispose();
  };
};

export default mount;
