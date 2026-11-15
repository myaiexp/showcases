// Button control options btnIcon, btnText, title and vertical, on Fullscreen
import { Fullscreen, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

/** An SVG icon drawn in code: four corner brackets. */
function bracketIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '2');
  svg.append(path);
  return svg;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const full = addControl(stage, scene, new Fullscreen({ position: 'topright', btnText: 'Full', btnIcon: bracketIcon(), title: 'Fill the screen', vertical: false }));
  const out = stage.readout();
  const state = { text: true, icon: true, vertical: false, title: 'Fill the screen' };
  const apply = (): void => {
    full.setOptions({
      btnText: state.text ? 'Full' : '',
      btnIcon: state.icon ? bracketIcon() : undefined,
      title: state.title,
      vertical: state.vertical,
    });
    if (out) out.textContent = `btnText: ${state.text ? "'Full'" : "''"}, btnIcon: ${state.icon ? 'an SVG element' : 'default'}, title: '${state.title}', vertical: ${state.vertical}\n(hover the button to see its title)`;
  };
  apply();
  if (stage.bar) {
    toggle(stage.bar, 'btnText', true, (v) => ((state.text = v), apply()));
    toggle(stage.bar, 'btnIcon', true, (v) => ((state.icon = v), apply()));
    toggle(stage.bar, 'vertical', false, (v) => ((state.vertical = v), apply()));
    select(stage.bar, 'title', ['Fill the screen', 'Go big'] as const, 'Fill the screen', (v) => ((state.title = v), apply()));
  } else {
    stage.every(1300, (i) => {
      state.text = i % 4 !== 1;
      state.icon = i % 4 !== 2;
      state.vertical = i % 2 === 1;
      apply();
    });
  }

  return () => stage.dispose();
};

export default mount;
