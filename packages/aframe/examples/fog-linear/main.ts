// <a-scene fog="type: linear; …">: near and far bracket where the fog builds
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene fog="type: linear; color: #AAA; near: 2; far: 20" background="color: #AAAAAA">
      ${Array.from({ length: 12 }, (_, i) => `
      <a-box position="-1.6 1 ${-3 - i * 2.5}" width="0.7" height="2" depth="0.7" color="hsl(${i * 30}, 70%, 55%)"></a-box>
      <a-box position="1.6 1 ${-3 - i * 2.5}" width="0.7" height="2" depth="0.7" color="hsl(${i * 30 + 15}, 70%, 55%)"></a-box>`).join('')}
      <a-plane rotation="-90 0 0" position="0 0 -15" width="8" height="40" color="#6b7b8f"></a-plane>
    </a-scene>`,
  run(stage) {
    const show = (): void => {
      const f = stage.scene.getAttribute('fog');
      stage.caption(`fog: type ${f.type}, near ${Math.round(f.near)}, far ${Math.round(f.far)}`);
    };
    show();
    if (stage.preview) {
      stage.scene.setAttribute('animation', 'property: fog.far; from: 8; to: 40; dur: 3500; dir: alternate; easing: easeInOutSine; loop: true');
      stage.every(150, show);
      return;
    }
    const set = (k: string) => (v: number) => (stage.scene.setAttribute('fog', k, v), show());
    slider(stage.bar!, 'near', [0, 30, 1], 2, set('near'));
    slider(stage.bar!, 'far', [3, 80, 1], 20, set('far'));
  },
});
