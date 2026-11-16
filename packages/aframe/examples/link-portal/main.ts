// A link portal: appearance only, with traversal bound to an event that never fires here
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { panorama } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets>
        <img id="homeThumbnail" src="${panorama()}">
        <img id="nightThumbnail" src="${panorama({ top: '#0a1030', horizon: '#3a2f6b', ground: '#101820', sun: '#dfe8ff', hills: '#1b2a3a' })}">
      </a-assets>
      <!-- on: names the event that triggers traversal; nothing here emits it, so the page never navigates. -->
      <a-entity id="home" link="href: index.html; title: My Homepage; image: #homeThumbnail; visualAspectEnabled: true; on: traverse; borderColor: white; highlightedColor: #24CAFF"
                position="-1.6 1.6 -3"></a-entity>
      <a-entity id="night" link="href: night.html; title: After dark; image: #nightThumbnail; visualAspectEnabled: true; on: traverse; backgroundColor: #1b1040; borderColor: #c58bff; titleColor: #ffd9a0; highlightedColor: #FFC65D"
                position="1.6 1.6 -3"></a-entity>
    </a-scene>`,
  run(stage) {
    stage.caption('link portals (traversal is disabled)');
    const portals = [q(stage, '#home'), q(stage, '#night')];
    if (stage.preview) {
      sway(stage, { yaw: 12 });
      stage.every(1200, (i) => portals.forEach((p, n) => p.setAttribute('link', 'highlighted', (i + n) % 2 === 0)));
      return;
    }
    toggle(stage.bar!, 'highlighted', false, (v) => portals.forEach((p) => p.setAttribute('link', 'highlighted', v)));
    toggle(stage.bar!, 'peekMode', false, (v) => portals.forEach((p) => p.setAttribute('link', 'peekMode', v)));
  },
});
