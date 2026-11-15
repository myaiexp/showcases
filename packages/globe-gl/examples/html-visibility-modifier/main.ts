// HTML elements: htmlElementVisibilityModifier fades elements behind the globe
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['default: hidden behind the globe', 'modifier: faded behind the globe'],
    hint: 'Both globes spin together. On the right, htmlElementVisibilityModifier(elem, isVisible) dims far-side markers rather than removing them.',
  });
  const dark = await texture('dark');
  const size = stage.preview ? 9 : 12;

  // Elements cannot be shared between globes, and each globe tags its own data: separate copies.
  const make = (pane: (typeof stage.panes)[number], modifier: boolean) => {
    const globe = stage.own(new Globe(pane.container), pane)
      .globeImageUrl(dark)
      .htmlElementsData(cities.slice(0, stage.preview ? 12 : 20).map((c) => ({ ...c })))
      .htmlElement((d) => {
        const m = document.createElement('div');
        m.textContent = (d as City).name;
        m.style.cssText = `font:${size}px/1 system-ui,sans-serif;color:#fff;background:rgba(20,30,60,.85);border:1px solid #5ec8ff;
          border-radius:8px;padding:2px 5px;white-space:nowrap;transition:opacity .4s`;
        return m;
      });
    if (modifier) {
      // The layer calls this with the element and whether it is on the near side.
      globe.htmlElementVisibilityModifier((elem, isVisible) => {
        elem.style.opacity = isVisible ? '1' : '0.15';
      });
    }
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.8;
    globe.pointOfView({ lat: 20, lng: 20, altitude: 2.6 });
    return globe;
  };
  make(stage.panes[0]!, false);
  make(stage.panes[1]!, true);

  return stage.dispose;
};

export default mount;
