// CustomWiggle: the five wiggle types plus an amplitudeEase/timingEase pair, each plotted beside a swinging bar
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { CustomWiggle } from 'gsap/CustomWiggle';
import { btn, h, slider } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

// CustomWiggle extends CustomEase, so both are registered.
gsap.registerPlugin(CustomEase, CustomWiggle);

const NS = 'http://www.w3.org/2000/svg';
const TYPES = ['easeOut', 'easeInOut', 'anticipate', 'uniform', 'random'] as const;

const mount: Mount = (el, { preview }) => {
  const grid = h('div', preview ? 'grid small' : 'grid');
  const tiles = [...TYPES, 'custom'].map((name) => {
    const tile = h('div', 'tile', '', grid);
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '-2 -2 104 64');
    const mid = document.createElementNS(NS, 'line');
    mid.setAttribute('x1', '0');
    mid.setAttribute('x2', '100');
    mid.setAttribute('y1', '30');
    mid.setAttribute('y2', '30');
    mid.setAttribute('class', 'mid');
    const curve = document.createElementNS(NS, 'path');
    curve.setAttribute('class', 'curve');
    svg.append(mid, curve);
    const swing = h('div', 'swing', '', tile);
    h('div', 'bar', '', swing);
    h('span', 'label', name === 'custom' ? 'amplitudeEase + timingEase' : `type: "${name}"`, tile);
    tile.prepend(svg);
    return { name, curve, bar: swing.firstElementChild as HTMLElement };
  });
  el.append(grid);

  const cfg = { wiggles: 6, angle: 30 };
  let tl: gsap.core.Timeline | undefined;

  const rebuild = (): void => {
    tl?.kill();
    // A new timeline per rebuild, created from a DOM handler (outside any context) and
    // killed by handle, so nothing accumulates.
    tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    for (const t of tiles) {
      const id = `wiggle-${t.name}`;
      if (t.name === 'custom') {
        // amplitudeEase and timingEase override the type
        CustomWiggle.create(id, { wiggles: cfg.wiggles, amplitudeEase: 'power2.in', timingEase: 'sine.inOut' });
      } else {
        CustomWiggle.create(id, { wiggles: cfg.wiggles, type: t.name as (typeof TYPES)[number] });
      }
      // The property value sets the strength: rotation 30 swings to 30 and back just as far the other way.
      tl.fromTo(t.bar, { rotation: 0 }, { rotation: cfg.angle, duration: 2, ease: id }, 0);
      t.curve.setAttribute('d', CustomEase.getSVGData(id, { width: 100, height: 60 }));
    }
  };
  rebuild();

  if (!preview) {
    const controls = h('div', 'controls');
    slider('wiggles', 1, 20, 1, cfg.wiggles, (v) => { cfg.wiggles = v; rebuild(); }, controls);
    slider('rotation', 5, 60, 1, cfg.angle, (v) => { cfg.angle = v; rebuild(); }, controls);
    btn('Replay', () => tl?.restart(), controls);
    el.append(controls);
  }

  return () => {
    tl?.kill();
  };
};

export default mount;
