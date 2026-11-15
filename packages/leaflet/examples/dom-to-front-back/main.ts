// DomUtil.toFront and toBack reorder siblings, which is all that decides who paints on top
import { DomUtil, LeafletMap, Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const COLORS = { A: '#f87171', B: '#facc15', C: '#60a5fa' } as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button reorders the three divs in the overlay pane: nothing else changes.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [40, 10], zoom: 4, zoomControl: false, dragging: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const pane = map.getPane('overlayPane') as HTMLElement;

  const cards = (['A', 'B', 'C'] as const).map((name, i) => {
    const card = DomUtil.create('div', 'stack-card', pane);
    card.textContent = name;
    card.style.background = COLORS[name];
    return { name, card, offset: new Point(i * 34, i * 14) };
  });
  const base = map.latLngToLayerPoint([42, 6]);
  for (const c of cards) DomUtil.setPosition(c.card, base.add(c.offset));

  const order = (): string => `back → front: ${[...pane.children].map((n) => n.textContent).join(', ')}`;
  const move = (name: 'A' | 'B' | 'C', how: 'front' | 'back'): void => {
    const card = cards.find((c) => c.name === name)?.card;
    if (!card) return;
    if (how === 'front') DomUtil.toFront(card);
    else DomUtil.toBack(card);
    stage.say(`${how === 'front' ? 'toFront' : 'toBack'}(${name}): ${order()}`);
  };

  for (const n of ['A', 'B', 'C'] as const) {
    stage.button(`toFront ${n}`, () => move(n, 'front'));
    stage.button(`toBack ${n}`, () => move(n, 'back'));
  }
  stage.say(order());

  if (stage.preview) {
    const script: ['A' | 'B' | 'C', 'front' | 'back'][] = [['A', 'front'], ['C', 'back'], ['B', 'front'], ['A', 'back'], ['C', 'front']];
    let i = 0;
    stage.cycle([{ run: () => move(...(script[i++ % script.length] as ['A' | 'B' | 'C', 'front' | 'back'])) }], 1700);
  }
  return () => stage.dispose();
};

export default mount;
