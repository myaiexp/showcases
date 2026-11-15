// Distance limits and test rate of a raycaster
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-entity id="ray" position="-3 1.5 -1" rotation="0 -90 0" raycaster="objects: .t; showLine: true; far: 6; near: 1; lineColor: #FFC65D; lineOpacity: 0.8"></a-entity>
      ${[1, 2, 3, 4, 5, 6, 7].map((d) => `<a-sphere class="t" id="s${d}" position="${-3 + d} 1.5 -1" radius="0.28" color="hsl(${d * 45}, 70%, 60%)"></a-sphere>`).join('')}
    </a-scene>`,
  run(stage) {
    const ray = q(stage, '#ray');
    const report = (): void => {
      const rc = ray.components.raycaster as unknown as { intersectedEls: HTMLElement[] };
      const d = ray.getAttribute('raycaster');
      const text = `near ${d.near}  far ${d.far}  interval ${d.interval}  hits: ${rc.intersectedEls.length}`;
      stage.caption(text);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    stage.every(200, report);
    if (stage.preview) {
      sway(stage, { yaw: 10 });
      stage.every(1600, (i) => ray.setAttribute('raycaster', 'far', 2 + (i % 6)));
      return;
    }
    const set = (k: string) => (v: number | boolean) => ray.setAttribute('raycaster', k, v);
    slider(stage.bar!, 'near', [0, 6, 0.5], 1, set('near'));
    slider(stage.bar!, 'far', [1, 12, 0.5], 6, set('far'));
    slider(stage.bar!, 'interval (ms)', [0, 1000, 50], 0, set('interval'));
    toggle(stage.bar!, 'enabled', true, set('enabled'));
  },
  height: 420,
});
