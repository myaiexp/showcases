// The camera's frustum: field of view, zoom factor and the near and far clipping planes
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-entity id="cam" camera="fov: 80; zoom: 1; near: 0.1; far: 40" look-controls="enabled: false" position="0 1.6 0"></a-entity>
      ${Array.from({ length: 10 }, (_, i) => `
      <a-box position="-1.8 1 ${-3 - i * 3}" width="0.6" height="2" depth="0.6" color="hsl(${i * 36}, 65%, 60%)"></a-box>
      <a-box position="1.8 1 ${-3 - i * 3}" width="0.6" height="2" depth="0.6" color="hsl(${i * 36}, 65%, 60%)"></a-box>`).join('')}
      <a-plane rotation="-90 0 0" position="0 0 -15" width="8" height="40" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    const cam = q(stage, '#cam');
    const report = (): void => {
      const d = cam.getAttribute('camera');
      stage.caption(`fov ${Math.round(d.fov)}  zoom ${Number(d.zoom).toFixed(2)}  near ${Number(d.near).toFixed(1)}  far ${Math.round(d.far)}`);
    };
    stage.every(150, report);
    if (stage.preview) {
      cam.setAttribute('animation__fov', 'property: camera.fov; from: 40; to: 110; dur: 3000; dir: alternate; easing: easeInOutSine; loop: true');
      cam.setAttribute('animation__far', 'property: camera.far; from: 8; to: 40; dur: 4000; dir: alternate; easing: easeInOutSine; loop: true');
      return;
    }
    const set = (k: string) => (v: number) => cam.setAttribute('camera', k, v);
    slider(stage.bar!, 'fov', [20, 140, 1], 80, set('fov'));
    slider(stage.bar!, 'zoom', [0.5, 4, 0.1], 1, set('zoom'));
    slider(stage.bar!, 'near', [0.1, 20, 0.1], 0.1, set('near'));
    slider(stage.bar!, 'far', [3, 60, 1], 40, set('far'));
  },
});
