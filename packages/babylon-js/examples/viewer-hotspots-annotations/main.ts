// Viewer hot spots with annotation labels that track them
import '@babylonjs/viewer';
import { ViewerHotSpotResult } from '@babylonjs/viewer';
import type { HTML3DElement, HotSpot } from '@babylonjs/viewer';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleGlb } from '../../shared/sample-model.ts';
import './style.css';

const NAMES = ['head', 'hat', 'base', 'ring'] as const;

const mount: Mount = async (el, ctx) => {
  const url = URL.createObjectURL(await sampleGlb());
  const viewer = document.createElement('babylon-viewer') as HTML3DElement;
  viewer.setAttribute('source', url);
  viewer.setAttribute('extension', '.glb');
  viewer.setAttribute('animation-auto-play', '');
  viewer.setAttribute('clear-color', '#0a0d18');
  if (ctx.preview) viewer.classList.add('bare');

  // One annotation element per hotspot name: its children are the label.
  for (const name of NAMES) {
    const annotation = document.createElement('babylon-viewer-annotation');
    annotation.setAttribute('hotspot', name);
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = name;
    annotation.append(tag);
    viewer.append(annotation);
  }
  el.append(viewer);

  // World hotspots: a fixed position and normal, plus an optional camera orbit to focus from.
  const hotSpots: Record<string, HotSpot> = {
    head: { type: 'world', position: [0, 2.1, 0], normal: [0, 1, 0], cameraOrbit: [1.2, 1.2, 5] },
    hat: { type: 'world', position: [0, 3, 0], normal: [0, 1, 0], cameraOrbit: [-0.6, 0.9, 6] },
    base: { type: 'world', position: [0.8, 0.15, 0], normal: [1, 0, 0], cameraOrbit: [0, 1.4, 6] },
  };
  const setHotSpots = (): void => {
    // A surface hotspot sticks to a triangle (three vertex indices plus barycentric
    // coordinates), so it follows the ring while the animation moves it.
    const meshes = viewer.viewerDetails?.model?.assetContainer.meshes ?? [];
    const meshIndex = meshes.findIndex((m) => m.name === 'ring');
    viewer.hotSpots = {
      ...hotSpots,
      ring: { type: 'surface', meshIndex: Math.max(meshIndex, 0), pointIndex: [0, 1, 2], barycentric: [0.34, 0.33, 0.33], cameraOrbit: [2.4, 1.1, 5] },
    };
  };
  viewer.addEventListener('modelchange', setHotSpots);

  let timer = 0;
  const cleanups: Array<() => void> = [() => viewer.removeEventListener('modelchange', setHotSpots)];
  if (ctx.preview) {
    // Focus the hotspots in turn: the camera glides to each one's orbit.
    let i = 0;
    timer = window.setInterval(() => viewer.focusHotSpot(NAMES[i++ % NAMES.length]!), 2200);
  } else {
    const panel = createPanel(el);
    const readout = panel.readout('Focus a hotspot, or use the hotspot picker in the viewer toolbar.');
    panel.row();
    for (const name of NAMES) panel.button(`focusHotSpot('${name}')`, () => viewer.focusHotSpot(name));
    panel.check('annotations visible', true, (on) => {
      for (const a of viewer.querySelectorAll('babylon-viewer-annotation')) (a as HTMLElement).style.display = on ? '' : 'none';
    });
    // queryHotSpot gives the screen position of a hotspot, e.g. for custom UI of your own.
    const result = new ViewerHotSpotResult();
    let frame = 0;
    const onRender = (): void => {
      if (++frame % 15) return;
      if (viewer.queryHotSpot('ring', result)) {
        readout.textContent = `ring hotspot: screen (${result.screenPosition.map((v) => v.toFixed(0)).join(', ')}), visibility ${result.visibility.toFixed(2)}`;
      }
    };
    viewer.addEventListener('viewerrender', onRender);
    cleanups.push(() => viewer.removeEventListener('viewerrender', onRender));
  }

  return () => {
    window.clearInterval(timer);
    for (const off of cleanups) off();
    viewer.remove();
    URL.revokeObjectURL(url);
  };
};

export default mount;
