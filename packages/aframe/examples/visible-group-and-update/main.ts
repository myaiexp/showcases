// A container's visible flag hides everything inside it
import { q } from '../../shared/comp-dom.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="group" position="0 1.6 -4">
        <a-box position="-1.5 0 0" color="#EF2D5E"></a-box>
        <a-sphere position="0 0 0" radius="0.7" color="#4CC3D9"></a-sphere>
        <a-cone position="1.5 0 0" radius-bottom="0.6" radius-top="0" color="#FFC65D"></a-cone>
      </a-entity>
      <a-torus position="0 0.2 -4" radius="1.6" radius-tubular="0.04" color="#cfd8e3" rotation="90 0 0"></a-torus>
    </a-scene>`,
  run(stage) {
    const group = q(stage, '#group');
    const show = (via: string): void => {
      const text = `${via}\ngetAttribute('visible') = ${group.getAttribute('visible')}   object3D.visible = ${group.object3D.visible}`;
      stage.caption(`${via}: visible = ${group.object3D.visible}`);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    const viaAttribute = (): void => (group.setAttribute('visible', !group.object3D.visible), show("setAttribute('visible', …)"));
    const viaThree = (): void => ((group.object3D.visible = !group.object3D.visible), show('object3D.visible = …'));
    if (stage.bar) {
      button(stage.bar, "setAttribute('visible', !visible)", viaAttribute);
      button(stage.bar, 'object3D.visible = !visible', viaThree);
    }
    show('initial');
    if (stage.preview) stage.every(1300, (i) => (i % 2 ? viaAttribute() : viaThree()));
  },
});
