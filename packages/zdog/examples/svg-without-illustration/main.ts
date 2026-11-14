// SVG without Illustration: a Zdog dog head rendered into a hand-made SVG badge
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const TAU = Zdog.TAU;
const NS = 'http://www.w3.org/2000/svg';

function svgEl<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>): SVGElementTagNameMap[K] {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { kind: 'svg', hint: 'Drag to turn the head. It is all SVG: zoom the page, it stays sharp.' });
  const svg = stage.element;

  // ----- setup: a viewBox centred on 0,0, sized by zoom ----- //
  const zoom = stage.zoom;
  const viewWidth = stage.width / zoom;
  const viewHeight = stage.height / zoom;
  svg.setAttribute('viewBox', `${-viewWidth / 2} ${-viewHeight / 2} ${viewWidth} ${viewHeight}`);

  // the badge is ordinary SVG that Zdog never touches
  svg.append(svgEl('circle', { r: 104, fill: '#2b4c7e' }));
  svg.append(svgEl('circle', { r: 104, fill: 'none', stroke: '#EA0', 'stroke-width': 6, 'stroke-dasharray': '4 8' }));
  const label = svgEl('text', { y: 82, 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 700, fill: '#FDB' });
  label.textContent = 'GOOD DOG';
  svg.append(label);
  // Zdog renders into this group only
  const layer = svgEl('g', {});
  svg.append(layer);

  // ----- model: a dog head on a scene Anchor ----- //
  const scene = new Zdog.Anchor({ translate: { y: -8 } });
  new Zdog.Shape({ addTo: scene, stroke: 90, color: '#c98a4b' }); // head
  for (const side of [-1, 1]) {
    new Zdog.Ellipse({
      addTo: scene, width: 30, height: 56, translate: { x: side * 46, y: 4, z: -6 },
      rotate: { z: side * -0.35 }, stroke: 12, fill: true, color: '#7a4a24',
    });
    new Zdog.Shape({ addTo: scene, translate: { x: side * 17, y: -14, z: 40 }, stroke: 9, color: '#1d1d1d' }); // eye
  }
  const snout = new Zdog.Shape({ addTo: scene, translate: { y: 12, z: 36 }, stroke: 38, color: '#e8c39a' });
  new Zdog.Shape({ addTo: snout, translate: { y: -6, z: 18 }, stroke: 13, color: '#1d1d1d' }); // nose
  new Zdog.Shape({ addTo: snout, path: [{ x: -7, y: 10 }, { y: 13 }, { x: 7, y: 10 }], translate: { z: 16 }, closed: false, stroke: 3, color: '#7a4a24' });

  // ----- animate: empty the group, then renderGraphSvg into it ----- //
  let isSpinning = true;
  stage.loop((_, t) => {
    if (isSpinning) scene.rotate.y = Math.sin(t * 0.9) * 0.9;
    scene.updateGraph();
    while (layer.firstChild) layer.removeChild(layer.firstChild);
    // the docs allow any SVG container (<svg> or <g>); the types only name <svg>
    scene.renderGraphSvg(layer as unknown as SVGSVGElement);
  });

  // ----- drag ----- //
  let dragStartRX = 0;
  let dragStartRY = 0;
  const minSize = Math.min(stage.width, stage.height);
  new Zdog.Dragger({
    startElement: svg,
    onDragStart: () => {
      isSpinning = false;
      dragStartRX = scene.rotate.x;
      dragStartRY = scene.rotate.y;
    },
    onDragMove: (_pointer, moveX, moveY) => {
      scene.rotate.x = dragStartRX - (moveY / minSize) * TAU;
      scene.rotate.y = dragStartRY - (moveX / minSize) * TAU;
    },
  });

  return stage.dispose;
};

export default mount;
