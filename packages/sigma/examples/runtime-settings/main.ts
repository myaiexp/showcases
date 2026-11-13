// Flips sigma settings on a live renderer with setSetting() and setSettings()
import Sigma from 'sigma';
import type { Settings } from 'sigma/settings';
import type { Mount } from '@/types.ts';
import { buildClusterGraph } from './data.ts';
import './style.css';

type BooleanSetting = 'renderLabels' | 'hideEdgesOnMove' | 'enableCameraZooming' | 'enableCameraPanning';

const TOGGLES: { key: BooleanSetting; hint: string }[] = [
  { key: 'renderLabels', hint: 'draw node labels' },
  { key: 'hideEdgesOnMove', hint: 'edges vanish while the camera moves' },
  { key: 'enableCameraZooming', hint: 'wheel zoom on or off' },
  { key: 'enableCameraPanning', hint: 'background drag on or off' },
];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const renderer = new Sigma(buildClusterGraph(4, 14), container, {
    settings: { labelRenderedSizeThreshold: 3, hideEdgesOnMove: false },
  });
  const camera = renderer.getCamera();

  let timer = 0;
  if (preview) {
    // Each tick flips two settings and moves the camera, so both effects are visible without input.
    let on = true;
    const step = (): void => {
      on = !on;
      renderer.setSettings({ renderLabels: on, hideEdgesOnMove: !on });
      void camera.animate(on ? { ratio: 1, x: 0.5, y: 0.5 } : { ratio: 0.5, x: 0.35, y: 0.4 }, { duration: 900 });
    };
    timer = window.setInterval(step, 1500);
    return () => {
      clearInterval(timer);
      camera.cancelAnimation();
      renderer.kill();
    };
  }

  const controls = document.createElement('div');
  controls.className = 'controls';
  const log = document.createElement('code');
  log.className = 'readout';
  log.textContent = 'Change a setting; the call appears here.';
  const say = (text: string): void => {
    log.textContent = text;
  };

  for (const { key, hint } of TOGGLES) {
    const label = document.createElement('label');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = Boolean(renderer.getSetting(key));
    box.addEventListener('change', () => {
      // setSetting changes one key and schedules a refresh.
      renderer.setSetting(key, box.checked);
      say(`renderer.setSetting('${key}', ${box.checked})`);
    });
    label.append(box, ` ${key} (${hint})`);
    label.style.display = 'flex';
    label.style.gap = 'var(--space-1)';
    controls.append(label);
  }

  const bounds = (settings: Partial<Settings>, text: string): void => {
    // setSettings changes several keys in one refresh.
    renderer.setSettings(settings);
    say(`renderer.setSettings(${text})`);
  };
  const limit = document.createElement('button');
  limit.textContent = 'Limit zoom to 0.5 to 3';
  limit.addEventListener('click', () =>
    bounds({ minCameraRatio: 0.5, maxCameraRatio: 3 }, '{ minCameraRatio: 0.5, maxCameraRatio: 3 }'),
  );
  const free = document.createElement('button');
  free.textContent = 'Remove zoom limits';
  free.addEventListener('click', () => bounds({ minCameraRatio: null, maxCameraRatio: null }, '{ minCameraRatio: null, maxCameraRatio: null }'));
  controls.append(limit, free);
  el.append(controls, log);

  return () => renderer.kill();
};

export default mount;
