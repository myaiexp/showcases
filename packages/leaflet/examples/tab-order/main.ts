// The keyboard tab order inside a map: container, markers, controls
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const FOCUSABLE = 'a[href], button, [tabindex]:not([tabindex="-1"])';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the map, then press Tab (or use Next). The skipped marker has keyboard: false.' });
  const pre = stage.side('Tab stops');
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: 5, zoomControl: true }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  new Marker([52, 6], { alt: 'First marker' }).addTo(map);
  new Marker([48, 14], { alt: 'Second marker' }).addTo(map);
  new Marker([50, 10], { alt: 'Skipped marker', keyboard: false }).addTo(map);

  const container = map.getContainer();
  const name = (node: HTMLElement): string => {
    if (node === container) return 'map container';
    if (node instanceof HTMLImageElement) return `marker "${node.alt}"`;
    return node.getAttribute('aria-label') || node.title || node.textContent?.trim() || 'link';
  };
  const stops = (): HTMLElement[] => [container, ...container.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((n) => n.tabIndex >= 0);
  let at = -1;
  const show = (): void => {
    const list = stops();
    const lines = list.map((n, i) => `${i === at ? '→' : ' '} ${i + 1}. ${name(n)}`);
    if (pre) pre.textContent = lines.join('\n');
    else stage.say(at >= 0 ? `focus ${at + 1} of ${list.length}: ${name(list[at] as HTMLElement)}` : `${list.length} tab stops`);
  };
  const next = (): void => {
    const list = stops();
    at = (at + 1) % list.length;
    list[at]?.focus({ preventScroll: true });
    show();
  };
  container.addEventListener('focusin', (e) => {
    const i = stops().indexOf(e.target as HTMLElement);
    if (i >= 0 && i !== at) {
      at = i;
      show();
    }
  }, { signal: stage.signal });
  stage.onDispose(() => {
    const active = document.activeElement as HTMLElement | null;
    if (active && container.contains(active)) active.blur();
  });
  stage.button('Next (Tab)', next);
  show();

  if (stage.preview) stage.cycle([{ run: next }], 1300);
  return () => stage.dispose();
};

export default mount;
