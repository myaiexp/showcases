// The 360 image gallery guide: painted panoramas and thumbnails, and stand-ins for the community components
import * as images from './images.ts';
import type { AFrame, Entity } from './types.ts';

/**
 * The guide uses three photos (city, cubes, sechelt) and four community components:
 * event-set (see core-event-set.ts), layout, proxy-event and template. This file paints
 * stand-in panoramas and thumbnails, and writes small versions of the other three from
 * the guide's prose: `template` stamps a `<script type="text/html">` into an entity with
 * `${name}` filled from `data-name`; `layout` lines its children up; `proxy-event` re-emits
 * one entity's event on another under a new name.
 */
export const IDS = ['city', 'cubes', 'sechelt'] as const;

export function photos(): { id: (typeof IDS)[number]; full: string; thumb: string }[] {
  const looks = {
    city: { top: '#1d2a4a', horizon: '#e0956a', ground: '#2a2b33', hills: '#3a3d4d', seed: 5 },
    cubes: { top: '#3a1f5c', horizon: '#6fd0c4', ground: '#1d3b3b', hills: '#2d6a6a', seed: 9 },
    sechelt: { top: '#2a6fb0', horizon: '#cfe6f2', ground: '#2e4a2e', hills: '#3f7a4a', seed: 2 },
  };
  return IDS.map((id) => ({
    id,
    full: images.panorama({ ...looks[id], sun: id === 'cubes' ? null : '#fff3c4' }, 1024),
    thumb: images.label(id.toUpperCase(), { city: '#b5643a', cubes: '#2f8c85', sechelt: '#2f6fa8' }[id], '#ffffff', 128),
  }));
}

export function registerLayout(AFRAME: AFrame): void {
  AFRAME.registerComponent('layout', {
    schema: { type: { default: 'line' }, margin: { default: 1 } },
    init() {
      // Children may arrive after the layout does (templates, appendChild).
      this.el.addEventListener('child-attached', () => this.arrange());
    },
    update() {
      this.arrange();
    },
    arrange() {
      let i = 0;
      for (const child of this.el.children as unknown as Entity[]) {
        if (!child.object3D) continue;
        child.object3D.position.set(i * this.data.margin, 0, 0);
        i++;
      }
    },
  });
}

export function registerTemplate(AFRAME: AFrame): void {
  AFRAME.registerComponent('template', {
    schema: { src: { type: 'selector' } },
    update() {
      const script = this.data.src as HTMLElement | null;
      if (!script) return;
      // Simple ${name} interpolation from the entity's data-* attributes.
      this.el.innerHTML = script.textContent!.replace(/\$\{(\w+)\}/g, (_m: string, k: string) => (this.el as HTMLElement).dataset[k] ?? '');
    },
  });
}

export function registerProxyEvent(AFRAME: AFrame): void {
  AFRAME.registerComponent('proxy-event', {
    schema: { event: { type: 'string' }, to: { type: 'selector' }, as: { type: 'string' } },
    init() {
      this.forward = () => {
        const to = this.data.to as Entity | null;
        if (to) to.emit(this.data.as || this.data.event, undefined, false);
      };
      this.el.addEventListener(this.data.event, this.forward);
    },
    remove() {
      this.el.removeEventListener(this.data.event, this.forward);
    },
  });
}
