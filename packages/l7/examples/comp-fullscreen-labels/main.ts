// Fullscreen options btnText, exitBtnText, exitTitle and exitBtnIcon
import { Fullscreen, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

/** A small cross icon for the "exit" state, drawn in code. */
function crossIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('width', '14');
  svg.setAttribute('height', '14');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M3 3l10 10M13 3L3 13');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '2');
  svg.append(path);
  return svg;
}

const LABELS = {
  english: { btnText: 'Fullscreen', exitBtnText: 'Exit fullscreen', exitTitle: 'Back to the page' },
  short: { btnText: 'Go', exitBtnText: 'Back', exitTitle: 'Leave fullscreen' },
  none: { btnText: '', exitBtnText: '', exitTitle: 'Leave fullscreen' },
} as const;
type LabelSet = keyof typeof LABELS;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const full = addControl(stage, scene, new Fullscreen({ position: 'topright', ...LABELS.english, exitBtnIcon: crossIcon() }));
  const out = stage.readout();
  const apply = (name: LabelSet): void => {
    full.setOptions({ ...LABELS[name], exitBtnIcon: crossIcon() });
    if (out) out.textContent = `${name}: ${JSON.stringify(LABELS[name])}, exitBtnIcon: a cross drawn in code\nThe exit* options show only while the map is fullscreen: click the control to see them.`;
  };
  apply('english');
  const names = Object.keys(LABELS) as LabelSet[];
  if (stage.bar) select(stage.bar, 'labels', names, 'english', apply);
  else stage.every(1400, (i) => apply(names[i % names.length] ?? 'english'));

  return () => stage.dispose();
};

export default mount;
