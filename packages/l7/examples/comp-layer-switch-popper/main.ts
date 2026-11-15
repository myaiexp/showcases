// LayerSwitch popper options: popperPlacement, popperTrigger and popperClassName
import { LayerSwitch, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, dots, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';
import { select } from '../../shared/controls.ts';
import './style.css';

const PLACEMENTS = ['top-start', 'top', 'top-end', 'left-start', 'left', 'left-end', 'bottom-start', 'bottom', 'bottom-end', 'right-start', 'right', 'right-end'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const capitals = dots(PLACES.filter((p) => p.kind === 'capital'), { name: 'Capitals', color: '#ffd166', size: 12 });
  const ports = dots(PLACES.filter((p) => p.kind === 'port'), { name: 'Ports', color: '#4ecdc4', size: 12 });
  scene.addLayer(capitals);
  scene.addLayer(ports);

  const sw = addControl(
    stage,
    scene,
    new LayerSwitch({ position: 'topright', layers: [capitals, ports], popperTrigger: 'hover', popperPlacement: 'bottom', popperClassName: 'warm-popper' }),
  );
  const out = stage.readout();
  const apply = (o: Parameters<typeof sw.setOptions>[0]): void => {
    sw.setOptions(o);
    if (out) out.textContent = `popperPlacement: '${sw.getOptions().popperPlacement}', popperTrigger: '${sw.getOptions().popperTrigger}'\npopperClassName: 'warm-popper' (the example's CSS tints the bubble)`;
  };
  apply({});
  if (stage.bar) {
    select(stage.bar, 'popperPlacement', PLACEMENTS, 'bottom', (v) => apply({ popperPlacement: v }));
    select(stage.bar, 'popperTrigger', ['hover', 'click'] as const, 'hover', (v) => apply({ popperTrigger: v }));
  } else {
    // Cards: hover the button (mousemove on it opens the popper) and walk the placements.
    const press = (el: Element | null | undefined): void => void el?.dispatchEvent(new MouseEvent('click', { bubbles: false }));
    stage.every(1100, (i) => {
      apply({ popperPlacement: PLACEMENTS[(i * 4) % PLACEMENTS.length] ?? 'bottom' });
      sw.getContainer().querySelector('button')?.dispatchEvent(new MouseEvent('mousemove', { bubbles: false }));
    });
  }

  return () => stage.dispose();
};

export default mount;
