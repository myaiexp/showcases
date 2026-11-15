// Only the active camera renders; setting active: true on another switches the view
import { q } from '../../shared/comp-dom.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="front" camera="active: true" position="0 1.6 2" look-controls="enabled: false"></a-entity>
      <a-entity id="top" camera look-controls="enabled: false" position="0 9 -3" rotation="-90 0 0"></a-entity>
      <a-entity id="side" camera look-controls="enabled: false" position="7 2 -3" rotation="0 90 0"></a-entity>
      <a-box position="-1.4 0.5 -3" color="#EF2D5E"></a-box>
      <a-sphere position="0 0.7 -3" radius="0.7" color="#4CC3D9"></a-sphere>
      <a-cone position="1.4 0.6 -3" radius-bottom="0.6" radius-top="0" height="1.2" color="#FFC65D"></a-cone>
      <a-plane rotation="-90 0 0" position="0 0 -3" width="10" height="10" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    const ids = ['front', 'top', 'side'];
    const use = (id: string): void => {
      q(stage, `#${id}`).setAttribute('camera', 'active', true);
      stage.caption(`camera#${id} is active`);
    };
    use('front');
    if (stage.bar) for (const id of ids) button(stage.bar, id, () => use(id));
    if (stage.preview) stage.every(1800, (i) => use(ids[i % ids.length]!));
  },
});
