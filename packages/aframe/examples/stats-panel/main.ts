// <a-scene stats>: the metrics panel, with counts that follow what the scene holds
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene stats background="color: #10151c">
      <a-box position="-1 1.6 -4" color="#4CC3D9" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-box>
      <a-sphere position="1 1.6 -4" radius="0.6" color="#EF2D5E"></a-sphere>
    </a-scene>`,
  run(stage) {
    stage.caption('stats panel, top left of the view');
    let n = 0;
    const add = (): void => {
      const s = document.createElement('a-sphere');
      s.setAttribute('radius', '0.25');
      s.setAttribute('color', `hsl(${(n * 47) % 360}, 70%, 60%)`);
      s.setAttribute('position', `${((n % 7) - 3) * 0.9} ${0.4 + Math.floor(n / 7) * 0.6} -3`);
      stage.scene.append(s);
      n++;
    };
    const remove = (): void => {
      const spheres = stage.scene.querySelectorAll('a-sphere[data-extra]');
      spheres[spheres.length - 1]?.remove();
    };
    const addTagged = (): void => (add(), stage.scene.lastElementChild!.setAttribute('data-extra', ''));
    if (stage.bar) {
      button(stage.bar, 'add 20 spheres', () => Array.from({ length: 20 }, addTagged));
      button(stage.bar, 'remove 20', () => Array.from({ length: 20 }, remove));
    }
    if (stage.preview) stage.every(900, (i) => (i % 6 < 3 ? Array.from({ length: 10 }, addTagged) : Array.from({ length: 10 }, remove)));
  },
});
