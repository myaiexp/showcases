// objects picks what is tested; after a class change, refreshObjects() updates the list
import { sway } from '../../shared/card.ts';
import { q, qa } from '../../shared/comp-dom.ts';
import { button, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="shooter" position="0 1.5 0" rotation="0 90 0" raycaster="objects: .clickable; showLine: true; far: 8; autoRefresh: false"
                animation="property: rotation; from: 0 60 0; to: 0 -60 0; dur: 4000; dir: alternate; easing: linear; loop: true"></a-entity>
      <a-sphere id="a" class="clickable" position="-2.2 1.5 -5" radius="0.6" color="#EF2D5E"></a-sphere>
      <a-sphere id="b" class="not-clickable" position="0 1.5 -6" radius="0.6" color="#4CC3D9"></a-sphere>
      <a-sphere id="c" class="clickable" position="2.2 1.5 -5" radius="0.6" color="#7BC8A4"></a-sphere>
    </a-scene>`,
  run(stage) {
    const shooter = q(stage, '#shooter');
    const refresh = (): void => (shooter.components.raycaster as unknown as { refreshObjects(): void }).refreshObjects();
    const report = (): void => {
      const rc = shooter.components.raycaster as unknown as { intersectedEls: HTMLElement[] };
      const classes = qa(stage, 'a-sphere').map((e) => `${e.id}${e.classList.contains('clickable') ? '*' : ''}`).join(' ');
      const text = `clickable (*): ${classes}   intersected: ${rc.intersectedEls.map((e) => e.id).join(', ') || 'none'}`;
      stage.caption(text);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    stage.every(200, report);
    if (stage.preview) {
      sway(stage, { yaw: 4 });
      stage.every(2500, () => {
        q(stage, '#b').classList.toggle('clickable');
        refresh();
      });
      return;
    }
    button(stage.bar!, 'toggle .clickable on the blue sphere', () => q(stage, '#b').classList.toggle('clickable'));
    button(stage.bar!, 'refreshObjects()', refresh);
    toggle(stage.bar!, 'autoRefresh', false, (v) => shooter.setAttribute('raycaster', 'autoRefresh', v));
  },
});
