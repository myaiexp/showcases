// A live readout of the camera's x, y, ratio and angle, fed by the camera's "updated" event
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildClusterGraph } from './data.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const frame = document.createElement('div');
  frame.className = 'frame';
  const container = document.createElement('div');
  container.className = 'stage';
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  frame.append(container, overlay);
  el.append(frame);

  const renderer = new Sigma(buildClusterGraph(5, 30), container);
  const camera = renderer.getCamera();

  // "updated" fires on every frame of an animation, and on every wheel or drag step.
  const show = (): void => {
    const { x, y, ratio, angle } = camera.getState();
    const deg = (angle * 180) / Math.PI;
    overlay.textContent =
      `x      ${x.toFixed(3)}\ny      ${y.toFixed(3)}\nratio  ${ratio.toFixed(3)}\nangle  ${angle.toFixed(3)} rad (${deg.toFixed(0)} deg)`;
  };
  show();
  camera.on('updated', show);

  let timer = 0;
  if (preview) {
    // Rotate, zoom and pan in turn so every number in the readout moves.
    const legs = [
      { x: 0.35, y: 0.4, ratio: 0.5, angle: Math.PI / 4 },
      { x: 0.65, y: 0.6, ratio: 0.8, angle: -Math.PI / 6 },
      { x: 0.5, y: 0.5, ratio: 1, angle: 0 },
    ];
    let i = 0;
    const step = (): void => {
      void camera.animate(legs[i % legs.length] ?? {}, { duration: 1300, easing: 'cubicInOut' });
      i++;
    };
    step();
    timer = window.setInterval(step, 1700);
    return () => {
      clearInterval(timer);
      camera.off('updated', show);
      camera.cancelAnimation();
      renderer.kill();
    };
  }

  // Full view: the animation events tell a finished move from an interrupted one.
  const log = document.createElement('code');
  log.className = 'readout';
  log.textContent = 'Drag, scroll, or use the buttons; the readout above follows every change.';
  log.style.whiteSpace = 'normal';
  camera.on('animationStart', () => (log.textContent = 'animationStart'));
  camera.on('animationEnd', ({ completed }) => (log.textContent = `animationEnd (completed: ${completed})`));

  const controls = document.createElement('div');
  controls.className = 'controls';
  const button = (label: string, onClick: () => void): void => {
    const b = document.createElement('button');
    b.textContent = label;
    b.addEventListener('click', onClick);
    controls.append(b);
  };
  const spin = (delta: number): void => {
    // updateState gets the current state, so a relative change needs no extra reads.
    camera.updateState((s) => ({ angle: s.angle + delta }));
  };
  button('Rotate left 15 deg (updateState)', () => spin(-Math.PI / 12));
  button('Rotate right 15 deg (updateState)', () => spin(Math.PI / 12));
  button('Spin 90 deg (animate)', () => void camera.animate({ angle: camera.angle + Math.PI / 2 }, { duration: 800 }));
  button('zoomIn()', () => void camera.zoomIn());
  button('reset()', () => void camera.reset({ duration: 600 }));
  el.append(controls, log);

  return () => {
    camera.off('updated', show);
    camera.cancelAnimation();
    renderer.kill();
  };
};

export default mount;
