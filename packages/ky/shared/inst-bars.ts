// A panel of timed calls: a name, the milliseconds it took and a bar of that length
import { panel, type Tone } from './panels.ts';

export function bars(parent: HTMLElement, title: string, scale: number, max = 6) {
  const p = panel(parent, title);
  return {
    ...p,
    clear() {
      p.body.replaceChildren();
    },
    add(name: string, ms: number, tone: Tone = 'ok') {
      const box = document.createElement('div');
      box.className = 'inst-bar';
      box.dataset['tone'] = tone;
      const label = Object.assign(document.createElement('span'), { className: 'inst-bar-name', textContent: name });
      const time = Object.assign(document.createElement('span'), { className: 'inst-bar-ms', textContent: `${Math.round(ms)} ms` });
      const track = document.createElement('div');
      track.className = 'inst-bar-track';
      const fill = document.createElement('div');
      fill.className = 'inst-bar-fill';
      fill.style.width = `${Math.min(100, (ms / scale) * 100)}%`;
      track.append(fill);
      box.append(label, time, track);
      p.body.append(box);
      while (p.body.childElementCount > max) p.body.firstElementChild?.remove();
    },
  };
}
