// What the cursor emits and which states it adds, with the event detail
import { aframeExample } from '../../shared/frame.ts';
import { ghost } from '../../shared/ghost.ts';
import { logger } from '../../shared/comp-log.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="cursor" cursor="rayOrigin: mouse" raycaster="objects: .hit"></a-entity>
      <a-box id="box" class="hit" position="-2 1.6 -4" color="#EF2D5E"></a-box>
      <a-sphere id="sphere" class="hit" position="0 1.6 -4" radius="0.7" color="#4CC3D9"></a-sphere>
      <a-cone id="cone" class="hit" position="2 1.6 -4" radius-bottom="0.7" radius-top="0" color="#FFC65D"></a-cone>
    </a-scene>`,
  run(stage) {
    const log = logger(stage, 7);
    const cursor = stage.scene.querySelector('#cursor') as Entity;
    for (const name of ['mouseenter', 'mouseleave', 'mousedown', 'mouseup', 'click']) {
      cursor.addEventListener(name, (evt) => {
        const d = evt.detail as { intersectedEl?: Entity; mouseEvent?: MouseEvent; intersection?: { point: { x: number; y: number; z: number } } };
        const button = d.mouseEvent ? ` button ${d.mouseEvent.button === 2 ? 'right' : d.mouseEvent.button === 0 ? 'left' : d.mouseEvent.button}` : '';
        const point = name === 'click' && d.intersection ? ` at ${d.intersection.point.x.toFixed(1)} ${d.intersection.point.y.toFixed(1)}` : '';
        log(`${name}: ${d.intersectedEl?.id ?? '-'}${button}${point}   cursor [${cursor.states.join(', ')}]  target [${(d.intersectedEl as Entity | undefined)?.states.join(', ') ?? ''}]`);
      });
    }
    for (const el of Array.from(stage.scene.querySelectorAll('.hit')) as Entity[]) {
      el.addEventListener('mouseenter', () => el.setAttribute('material', 'emissive', '#555555'));
      el.addEventListener('mouseleave', () => el.setAttribute('material', 'emissive', '#000000'));
    }
    stage.caption('Move over the shapes; click with either button');
    if (!stage.preview) return;
    const mouse = ghost(stage);
    mouse.move(0.1, 0.5);
    const stops = [0.3, 0.5, 0.7, 0.9];
    stage.every(1200, async (i) => {
      await mouse.glide(stops[i % stops.length]!, 0.45, 500);
      mouse.click();
    });
  },
});
