// Logo control with your own img (a data: URL, since the default logo is remote)
import { Logo, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom, logoImage } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const LOGOS = [logoImage('L7 gallery', '#ffd166'), logoImage('my own logo', '#4ecdc4'), logoImage('data: URL', '#ff6b6b')];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // logoVisible stays false: the scene's default logo is a remote image. This Logo control gets its own.
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // No href: the docs say the image is then shown and clicking it goes nowhere.
  const logo = addControl(stage, scene, new Logo({ position: 'bottomleft', img: LOGOS[0] ?? '' }));
  const out = stage.readout();
  let k = 0;
  const next = (): void => {
    k = (k + 1) % LOGOS.length;
    logo.setOptions({ img: LOGOS[k] });
    if (out) out.textContent = `setOptions({ img }): logo ${k + 1} of ${LOGOS.length}, all data: URLs (SVG drawn in code)`;
  };
  if (out) out.textContent = 'new Logo({ img: dataUrl }), no href, so the image does not link anywhere.';
  if (stage.bar) button(stage.bar, 'setOptions({ img })', next);
  else stage.every(1300, next);

  return () => stage.dispose();
};

export default mount;
