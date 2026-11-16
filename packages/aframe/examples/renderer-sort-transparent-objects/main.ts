// sortTransparentObjects draws transparent things far to near instead of in DOM order
import { toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c" renderer="sortTransparentObjects: false">
      <a-entity camera look-controls="enabled: false" position="0 1.6 1"
                animation="property: position; from: -2 1.6 1; to: 2 1.6 1; dur: 4000; dir: alternate; easing: easeInOutSine; loop: true"></a-entity>
      <!-- Markup order: nearest first, farthest last. -->
      <a-plane position="0 1.6 -2.5" width="1.6" height="1.6" material="color: #EF2D5E; transparent: true; opacity: 0.55"></a-plane>
      <a-plane position="0.5 1.6 -3.5" width="1.6" height="1.6" material="color: #4CC3D9; transparent: true; opacity: 0.55"></a-plane>
      <a-plane position="1 1.6 -4.5" width="1.6" height="1.6" material="color: #FFC65D; transparent: true; opacity: 0.55"></a-plane>
    </a-scene>`,
  run(stage) {
    const show = (): void => stage.caption(`sortTransparentObjects: ${stage.scene.getAttribute('renderer').sortTransparentObjects}`);
    show();
    if (stage.bar) toggle(stage.bar, 'sortTransparentObjects', false, (v) => (stage.scene.setAttribute('renderer', { sortTransparentObjects: v }), show()));
    if (stage.preview) stage.every(2200, (i) => (stage.scene.setAttribute('renderer', { sortTransparentObjects: i % 2 === 1 }), show()));
  },
});
