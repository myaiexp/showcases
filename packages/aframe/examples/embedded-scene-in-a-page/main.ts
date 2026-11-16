// <a-scene embedded> inside an ordinary page, sized by CSS and driven by an HTML button
import { aframeExample } from '../../shared/frame.ts';
import { q } from '../../shared/comp-dom.ts';

const css = (preview: boolean): string => `
  body { margin: 0; padding: ${preview ? 6 : 14}px; font: 14px system-ui, sans-serif; color: #cfd8e3; background: #1b2430; }
  h2 { margin: 0 0 6px; font-size: 16px; }
  p { margin: 0 0 8px; }
  #myEmbeddedScene { width: 100%; height: ${preview ? 110 : 230}px; max-width: 560px; border: 2px solid #3a4a5c; }
  a-scene { height: 100%; width: 100%; }
  button { margin-top: 8px; padding: 4px 10px; }
`;

export default aframeExample(import.meta.url, {
  setup(_AFRAME, { preview }) {
    // The page's own CSS: a <style> in <head>, as in the docs. A card gets a shorter scene so it fits 200px.
    const style = document.createElement('style');
    style.textContent = css(preview);
    document.head.append(style);
  },
  scene: `
    <h2>A page with a scene in it</h2>
    <p>The scene below is an ordinary block, sized with CSS.</p>
    <div id="myEmbeddedScene">
      <a-scene background="color: #ECECEC" embedded>
        <a-box id="box" position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow animation="property: rotation; to: 0 405 0; dur: 8000; easing: linear; loop: true"></a-box>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow></a-sphere>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow></a-plane>
      </a-scene>
    </div>
    <button id="recolour">Recolour the box</button>`,
  run(stage) {
    const colours = ['#4CC3D9', '#EF2D5E', '#FFC65D', '#7BC8A4'];
    let n = 0;
    const recolour = (): void => q(stage, '#box').setAttribute('color', colours[++n % colours.length]!);
    stage.scene.ownerDocument.querySelector('#recolour')!.addEventListener('click', recolour);
    stage.caption('embedded: the canvas is part of the layout');
    if (stage.preview) stage.every(1500, recolour);
  },
});
