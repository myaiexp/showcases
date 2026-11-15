// Popup content: lngLat with title and html (string or element), or text
import { Popup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, dots, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const MODES = ['title + html string', 'title + html element', 'text', 'html array'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(dots(PLACES, { size: 6 }));

  // Cards are small: anchor lower and narrower so the whole bubble fits.
  const paris = ctx.preview ? { lng: 8, lat: 46 } : { lng: 2.35, lat: 48.86 };
  let popup: Popup | undefined;
  const show = (mode: Mode): void => {
    if (popup) scene.removePopup(popup);
    // html and title accept a string, an element, an array of elements, a fragment or a text node.
    const strong = document.createElement('b');
    strong.textContent = 'Paris';
    const em = document.createElement('i');
    em.textContent = '11 million, as a DOM element';
    const opts =
      mode === 'title + html string'
        ? { title: 'Popup Title', html: 'Popup <b>Content</b> as an HTML string' }
        : mode === 'title + html element'
          ? { title: strong, html: em }
          : mode === 'text'
            ? { text: 'Just text: markup like <b>this</b> is shown literally' }
            : { html: [strong, document.createElement('br'), em] };
    popup = addPopup(stage, scene, new Popup({ lngLat: paris, closeOnClick: false, maxWidth: ctx.preview ? '150px' : '240px', ...opts }));
    const out = stage.readout();
    if (out) out.textContent = `new Popup({ lngLat, ${Object.keys(opts).join(', ')} }) -> ${mode}`;
  };
  show('title + html string');
  if (stage.bar) select(stage.bar, 'content', MODES, MODES[0], show);
  else stage.every(1400, (i) => show(MODES[i % MODES.length] ?? MODES[0]));

  return () => stage.dispose();
};

export default mount;
