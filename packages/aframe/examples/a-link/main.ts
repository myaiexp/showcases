// <a-link>: portals with a 360° preview, a title and a highlight
import { toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { panorama } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene cursor="rayOrigin: mouse" raycaster="objects: [link]" background="color: #10161e">
      <a-assets>
        <img id="dusk" src="${panorama({ top: '#24124a', horizon: '#ff8c5a', hills: '#2a1f3d' })}">
        <img id="meadow" src="${panorama({ top: '#2f6fb3', horizon: '#cfe8ff', ground: '#3f6b2a', hills: '#2d5a2a', sun: '#ffffff' })}">
        <img id="night" src="${panorama({ top: '#02040c', horizon: '#14213d', ground: '#0b0f14', hills: '#101826', sun: null })}">
      </a-assets>
      <!-- href is where a click (the default 'on' event) would go; '#' targets stay in this page. -->
      <a-link href="#dusk" title="Dusk" image="#dusk" position="-2.4 1.6 -4"></a-link>
      <a-link href="#meadow" title="Meadow" image="#meadow" position="0 1.6 -4"></a-link>
      <a-link href="#night" title="Night" image="#night" position="2.4 1.6 -4"></a-link>
    </a-scene>`,

  run(stage) {
    const links = Array.from(stage.scene.querySelectorAll('a-link'));
    // highlighted swaps the border to highlightedColor; it cycles across the portals.
    stage.every(1200, (i) => links.forEach((link, k) => link.setAttribute('link', { highlighted: k === i % links.length })));
    // peekMode expands the middle portal's 360° image around the camera.
    if (stage.bar) toggle(stage.bar, 'peekMode (Meadow)', false, (v) => links[1]!.setAttribute('link', { peekMode: v }));
    // A click sets window.location to the href: a '#' href only changes this frame's hash.
    window.addEventListener('hashchange', () => stage.caption(`Navigated to ${location.hash}`));
    stage.caption(stage.preview ? 'highlighted cycles across the portals' : 'Click a portal');
  },
});
