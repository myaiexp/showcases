// fog type: exponential with an adjustable density
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene fog="type: exponential; color: #2a1f3d; density: 0.08" background="color: #2a1f3d">
      ${Array.from({ length: 10 }, (_, i) => `
      <a-cone position="${i % 2 ? 1.8 : -1.8} 1 ${-3 - i * 2.2}" radius-bottom="0.6" radius-top="0" height="2" color="hsl(${100 + i * 12}, 60%, 55%)"></a-cone>`).join('')}
      <a-plane rotation="-90 0 0" position="0 0 -12" width="10" height="40" color="#5b4a7a"></a-plane>
    </a-scene>`,
  run(stage) {
    const show = (): void => stage.caption(`fog: type exponential, density ${Number(stage.scene.getAttribute('fog').density).toFixed(3)}`);
    show();
    if (stage.preview) {
      stage.scene.setAttribute('animation', 'property: fog.density; from: 0.02; to: 0.15; dur: 3500; dir: alternate; easing: easeInOutSine; loop: true');
      stage.every(150, show);
      return;
    }
    // 10^-3.6 (the default, 0.00025) up to 10^-0.8.
    slider(stage.bar!, 'log10(density)', [-3.6, -0.8, 0.1], Math.log10(0.08), (v) => (stage.scene.setAttribute('fog', 'density', 10 ** v), show()));
  },
});
