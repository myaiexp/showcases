// The scene's shadow system: type, autoUpdate and enabled
import { sway } from '../../shared/card.ts';
import { select, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c" shadow="type: pcf">
      <a-entity light="type: ambient; intensity: 0.45"></a-entity>
      <a-entity light="type: directional; castShadow: true; intensity: 0.9; shadowMapWidth: 256; shadowMapHeight: 256; shadowCameraLeft: -4; shadowCameraRight: 4; shadowCameraTop: 4; shadowCameraBottom: -4" position="-2 5 1"></a-entity>
      <a-sphere position="-1.5 1 -4" radius="0.5" color="#EF2D5E" shadow
                animation="property: position; to: 1.5 1 -4; dur: 3000; dir: alternate; easing: easeInOutSine; loop: true"></a-sphere>
      <a-box position="0 0.5 -4" color="#FFC65D" shadow></a-box>
      <a-plane rotation="-90 0 0" position="0 0 -4" width="12" height="8" color="#8da3bf" shadow="receive: true"></a-plane>
    </a-scene>`,
  run(stage) {
    stage.caption('<a-scene shadow="type: pcf">  (shadow map kept small to show the filtering)');
    if (stage.preview) return sway(stage, { yaw: 5, pitch: 6 });
    const set = (prop: string) => (v: string | boolean) => stage.scene.setAttribute('shadow', prop, v);
    select(stage.bar!, 'type', ['pcf', 'basic'], 'pcf', set('type'));
    toggle(stage.bar!, 'autoUpdate', true, set('autoUpdate'));
    toggle(stage.bar!, 'enabled', true, set('enabled'));
  },
});
