// An a-sky with a 360 image from a-assets, switched between three panoramas
import { aframeExample } from '../../shared/frame.ts';
import { select } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import { photos } from '../../shared/core-gallery.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: () => {
    const p = photos();
    return `
    <a-scene>
      <a-assets>
        ${p.map((x) => `<img id="${x.id}" src="${x.full}">\n        <img id="${x.id}-thumb" src="${x.thumb}">`).join('\n        ')}
      </a-assets>
      <!-- 360-degree image. -->
      <a-sky id="image-360" radius="10" src="#city"></a-sky>
      <a-camera></a-camera>
    </a-scene>`;
  },

  run(stage) {
    const sky = stage.scene.querySelector('#image-360') as Entity;
    const set = (id: string): void => {
      sky.setAttribute('src', '#' + id);
      stage.caption(`<a-sky id="image-360" radius="10" src="#${id}">`);
    };
    set('city');
    if (stage.preview) {
      sway(stage, { yaw: 60, seconds: 12 });
      stage.every(2500, (i) => set(['city', 'cubes', 'sechelt'][i % 3]!));
    } else if (stage.bar) {
      select(stage.bar, 'src', ['city', 'cubes', 'sechelt'], 'city', set);
    }
  },
});
