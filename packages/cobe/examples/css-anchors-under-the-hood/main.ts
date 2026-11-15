// CSS Anchors recipe opened up: cobe's 1px anchor divs and its :root style
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';
import { PLACES } from '../../shared/places.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Outlined squares are the anchor divs; the text below is cobe\'s :root style.' });

  // 1. Add id to markers (and arcs). stage.id keeps the names unique on the page.
  const sf = stage.id('sf');
  const tokyo = stage.id('tokyo');
  const london = stage.id('london');

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.25,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.2, 0.2, 0.25],
    markers: [
      { location: PLACES.sf.location, size: 0.03, id: sf },
      { location: PLACES.tokyo.location, size: 0.04, id: tokyo },
      { location: PLACES.london.location, size: 0.04, id: london },
    ],
  });
  stage.own(globe);

  // 3. Position an element using the CSS anchor functions
  const label = document.createElement('div');
  label.className = 'anchored';
  label.textContent = 'San Francisco';
  label.style.position = 'absolute';
  label.style.setProperty('position-anchor', `--cobe-${sf}`);
  label.style.bottom = 'anchor(top)';
  label.style.left = 'anchor(center)';
  label.style.opacity = `var(--cobe-visible-${sf}, 0)`;
  stage.layer.append(label);

  // 2. The visibility variables sit in a <style> in <head> whose text starts with :root{
  const out = readout(stage.preview ? stage.layer : stage.box);
  out.className = stage.preview ? 'style-readout in-card' : 'style-readout';
  let found: HTMLStyleElement | null = null;
  const prefix = stage.id('');
  const findStyle = (): HTMLStyleElement | null => {
    if (found?.isConnected) return found;
    found = null;
    for (const s of document.head.querySelectorAll('style')) {
      const text = s.textContent ?? '';
      if (text.startsWith(':root{') && text.includes(`--cobe-visible-${prefix}`)) found = s;
    }
    return found;
  };

  let phi = 0;
  let frame = 0;
  stage.loop(() => {
    phi += 0.004;
    globe.update({ phi });
    if (frame++ % 6 !== 0) return;
    const text = findStyle()?.textContent ?? '(no style found)';
    const anchors = stage.layer.querySelectorAll('[style*="anchor-name"]').length;
    const shown = stage.preview ? text.split(prefix).join('') : text.split(';').join(';\n  ').replace('{', '{\n  ');
    out.textContent = `${anchors} anchor divs\n${shown}`;
  });

  return stage.dispose;
};

export default mount;
