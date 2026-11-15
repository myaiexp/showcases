// Control className and style: restyle through setOptions, or clear both
import { Scene, Zoom } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';
import './style.css';

const STYLE = 'border:2px solid #ffd166;border-radius:14px;box-shadow:0 0 14px rgba(255,209,102,.7);';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const zoom = addControl(stage, scene, new Zoom({ position: 'topright', className: 'big-zoom', style: STYLE }));
  const out = stage.readout();
  let cls = true;
  let sty = true;
  const apply = (): void => {
    zoom.setOptions({ className: cls ? 'big-zoom' : '', style: sty ? STYLE : '' });
    if (out) out.textContent = `className: '${cls ? 'big-zoom' : ''}' (the example's own CSS class makes the buttons large)\nstyle: '${sty ? STYLE : ''}'`;
  };
  apply();
  if (stage.bar) {
    toggle(stage.bar, 'className', true, (v) => ((cls = v), apply()));
    toggle(stage.bar, 'style', true, (v) => ((sty = v), apply()));
  } else {
    stage.every(1300, (i) => {
      cls = i % 4 < 2;
      sty = i % 2 === 0;
      apply();
    });
  }

  return () => stage.dispose();
};

export default mount;
