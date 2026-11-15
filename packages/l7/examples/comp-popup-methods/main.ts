// Popup methods: setTitle, setHTML, setText, setLngLat, show, hide, setOptions
import { Popup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const popup = addPopup(stage, scene, new Popup({ lngLat: { lng: 10, lat: ctx.preview ? 46 : 50 }, title: 'Title', html: 'Content', closeOnClick: false }));
  const out = stage.readout();
  let n = 0;
  const report = (call: string): void => {
    if (out) out.textContent = `${call}\ngetIsShow(): ${popup.getIsShow()}  getOptions().anchor: ${popup.getOptions().anchor}  getOptions().maxWidth: ${popup.getOptions().maxWidth}`;
  };
  const steps: [string, () => void][] = [
    ["setTitle('Title ' + n)", () => popup.setTitle(`Title ${++n}`)],
    ["setHTML('<b>Bold</b> content')", () => popup.setHTML('<b>Bold</b> content')],
    ["setText('Plain text')", () => popup.setText('Plain text')],
    ['setLngLat([next place])', () => {
      const p = ['Berlin', 'Vienna', 'Paris', 'Hamburg'].map((name) => PLACES.find((x) => x.name === name))[n++ % 4];
      if (p) popup.setLngLat([p.lng, p.lat]);
    }],
    ['hide()', () => popup.hide()],
    ['show()', () => popup.show()],
    ["setOptions({ anchor: 'left' or 'bottom' })", () => popup.setOptions({ anchor: popup.getOptions().anchor === 'left' ? 'bottom' : 'left' })],
  ];
  if (stage.bar) for (const [label, fn] of steps) button(stage.bar, label, () => (fn(), report(label)));
  else
    stage.every(1000, (i) => {
      const [label, fn] = steps[i % steps.length] ?? steps[0] ?? ['', () => undefined];
      fn();
      report(label);
    });
  report('new Popup({ lngLat, title, html })');

  return () => stage.dispose();
};

export default mount;
