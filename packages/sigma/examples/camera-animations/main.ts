// Drives the camera with animate(), zoomIn/zoomOut/reset and the named easing curves
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildClusterGraph } from './data.ts';
import './style.css';

const EASINGS = [
  'linear',
  'quadraticIn',
  'quadraticOut',
  'quadraticInOut',
  'cubicIn',
  'cubicOut',
  'cubicInOut',
  'exponentialIn',
  'exponentialOut',
  'exponentialInOut',
] as const;
type EasingName = (typeof EASINGS)[number];

// Camera x/y live in framed graph space: 0.5 is the centre.
const TOUR = [
  { x: 0.25, y: 0.3, ratio: 0.4 },
  { x: 0.75, y: 0.35, ratio: 0.5 },
  { x: 0.7, y: 0.75, ratio: 0.35 },
  { x: 0.3, y: 0.7, ratio: 0.5 },
  { x: 0.5, y: 0.5, ratio: 1 },
];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const renderer = new Sigma(buildClusterGraph(5, 40), container);
  const camera = renderer.getCamera();

  let timer = 0;
  if (preview) {
    // A looping tour; each leg uses the next easing so the loop also shows how they differ.
    let leg = 0;
    const step = (): void => {
      const target = TOUR[leg % TOUR.length];
      const easing = EASINGS[(leg * 3) % EASINGS.length] ?? 'linear';
      void camera.animate(target ?? {}, { duration: 1400, easing });
      leg++;
    };
    step();
    timer = window.setInterval(step, 1700);
    return () => {
      clearInterval(timer);
      camera.cancelAnimation();
      renderer.kill();
    };
  }

  let easing: EasingName = 'quadraticInOut';
  let duration = 1000;

  const controls = document.createElement('div');
  controls.className = 'controls';
  const status = document.createElement('code');
  status.className = 'readout';
  status.textContent = 'idle';

  const button = (label: string, onClick: () => void): void => {
    const b = document.createElement('button');
    b.textContent = label;
    b.addEventListener('click', onClick);
    controls.append(b);
  };
  // animate() resolves when the animation stops, completed or interrupted.
  const run = async (name: string, action: Promise<void>): Promise<void> => {
    status.textContent = `${name}: running`;
    await action;
    status.textContent = camera.isAnimating() ? `${name}: interrupted by a newer animation` : `${name}: stopped`;
  };

  button('animate() to a corner', () => {
    const t = TOUR[Math.floor(Math.random() * 4)] ?? TOUR[0];
    void run('animate', camera.animate(t ?? {}, { duration, easing }));
  });
  button('zoomIn()', () => void run('zoomIn', camera.zoomIn({ duration, easing })));
  button('zoomOut({ factor: 2 })', () => void run('zoomOut', camera.zoomOut({ factor: 2, duration, easing })));
  button('reset()', () => void run('reset', camera.reset({ duration, easing })));
  button('cancelAnimation()', () => camera.cancelAnimation());

  const select = document.createElement('select');
  for (const name of EASINGS) select.append(new Option(name, name, false, name === easing));
  select.addEventListener('change', () => (easing = select.value as EasingName));
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '100';
  slider.max = '3000';
  slider.step = '100';
  slider.value = String(duration);
  const sliderLabel = document.createElement('span');
  sliderLabel.textContent = `duration ${duration} ms`;
  slider.addEventListener('input', () => {
    duration = Number(slider.value);
    sliderLabel.textContent = `duration ${duration} ms`;
  });
  controls.append(select, slider, sliderLabel);
  el.append(controls, status);

  return () => {
    camera.cancelAnimation();
    renderer.kill();
  };
};

export default mount;
