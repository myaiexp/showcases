// The babylon-viewer element: in-memory glb, attributes and events
import '@babylonjs/viewer'; // defines the <babylon-viewer> custom element
import type { HTML3DElement } from '@babylonjs/viewer';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleGlb } from '../../shared/sample-model.ts';
import './style.css';

const EVENTS = ['viewerready', 'modelchange', 'loadingprogresschange', 'animationplayingchange', 'selectedanimationchange', 'environmentchange'] as const;

const mount: Mount = async (el, ctx) => {
  // A blob: URL is memory, not network: the element's `source` takes it like any URL.
  const url = URL.createObjectURL(await sampleGlb());

  const viewer = document.createElement('babylon-viewer') as HTML3DElement;
  viewer.setAttribute('source', url);
  viewer.setAttribute('extension', '.glb'); // a blob URL has no file extension to infer from
  viewer.setAttribute('camera-auto-orbit', '');
  viewer.setAttribute('camera-auto-orbit-speed', ctx.preview ? '0.4' : '0.2');
  viewer.setAttribute('animation-auto-play', '');
  viewer.setAttribute('shadow-quality', ctx.preview ? 'none' : 'normal');
  viewer.setAttribute('clear-color', '#0a0d18');
  if (ctx.preview) viewer.classList.add('bare');
  el.append(viewer);

  const listeners: Array<() => void> = [];
  if (!ctx.preview) {
    const log = document.createElement('pre');
    log.className = 'log';
    const print = (line: string): void => {
      log.textContent += `${line}\n`;
      log.scrollTop = log.scrollHeight;
    };
    for (const name of EVENTS) {
      const handler = (): void => print(`${name}${name === 'loadingprogresschange' ? ` (loadingProgress = ${String(viewer.loadingProgress)})` : ''}`);
      viewer.addEventListener(name, handler);
      listeners.push(() => viewer.removeEventListener(name, handler));
    }

    const panel = createPanel(el);
    const set = (name: string, value: string): void => viewer.setAttribute(name, value);
    const flag = (name: string, on: boolean): void => (on ? viewer.setAttribute(name, '') : viewer.removeAttribute(name));
    panel.select('tone-mapping', ['neutral', 'standard', 'aces', 'none'] as const, 'neutral', (v) => set('tone-mapping', v));
    panel.select('shadow-quality', ['none', 'normal', 'high'] as const, 'normal', (v) => set('shadow-quality', v));
    panel.select('clear-color', ['#0a0d18', '#3a1020', '#10301f'] as const, '#0a0d18', (v) => set('clear-color', v));
    panel.row();
    panel.slider('exposure', 0.4, 2.5, 0.1, 1, (v) => set('exposure', String(v)));
    panel.slider('environment-intensity', 0, 3, 0.1, 1, (v) => set('environment-intensity', String(v)));
    panel.slider('animation-speed', 0.5, 2, 0.5, 1, (v) => set('animation-speed', String(v)));
    panel.row();
    panel.check('camera-auto-orbit', true, (on) => flag('camera-auto-orbit', on));
    panel.check('render-when-idle', false, (on) => flag('render-when-idle', on));
    panel.check('environment-visible', false, (on) => flag('environment-visible', on));
    panel.check('wireframe (through viewerDetails)', false, (on) => {
      // viewerDetails exposes the underlying scene and model once viewerready has fired.
      const details = viewer.viewerDetails;
      for (const material of details?.model?.assetContainer.materials ?? []) material.wireframe = on;
      details?.markSceneMutated(); // the viewer renders only on change, so tell it
    });
    panel.button('toggleAnimation()', () => viewer.toggleAnimation());
    panel.button('reset()', () => viewer.reset());
    el.append(log);
  }

  return () => {
    for (const off of listeners) off();
    viewer.remove(); // disconnecting the element disposes its engine and scene
    URL.revokeObjectURL(url);
  };
};

export default mount;
