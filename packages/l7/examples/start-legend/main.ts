// new Control({ position }) with a custom onAdd: a hand-made legend
import { Control, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/point-data.ts';
import { regions } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';

const GRADES = [0, 10, 20, 50, 100];
const COLOR = ['#fff5eb', '#fdd0a2', '#fd8d3c', '#d94801', '#7f2704'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.5 : 3.3 }),
  });
  await stage.ready(scene);

  const band = (d: number): string => COLOR[GRADES.filter((g) => d >= g).length - 1] ?? COLOR[0]!;
  const layer = new PolygonLayer({}).source(regions()).color('density', (d: number) => band(d * 1.2));
  scene.addLayer(layer);

  const legend = new Control({ position: 'bottomright' });
  legend.onAdd = function () {
    const box = document.createElement('div');
    box.style.cssText = 'padding:6px 9px;border-radius:4px;background:rgba(10,16,24,.9);color:#cfe3f7;font:11px/1.6 ui-monospace,monospace';
    const lines: string[] = [];
    for (let i = 0; i < GRADES.length; i++) {
      lines.push(`<i style="display:inline-block;width:12px;height:12px;margin-right:6px;background:${COLOR[i]}"></i>${GRADES[i]}${GRADES[i + 1] ? `–${GRADES[i + 1]}` : '+'}`);
    }
    box.innerHTML = lines.join('<br>');
    return box;
  };
  scene.addControl(legend);
  stage.own(() => scene.removeControl(legend));

  if (stage.preview) drift(stage, scene, [15, 50], 3);

  return () => stage.dispose();
};

export default mount;
