// The docs' asset example: model files, a mixin, an image and a video texture in one a-assets
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

import * as images from '../../shared/images.ts';
import { obj } from '../../shared/models.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #0d1420">
      <a-assets>
        <a-asset-item id="gem-obj" src="${obj.gem()}"></a-asset-item>
        <a-asset-item id="gem-mtl" src="${obj.gemMtl()}"></a-asset-item>
        <a-mixin id="giant" scale="1.6 1.6 1.6"></a-mixin>
        <img id="advertisement" src="${images.label('SALE', '#b5483a')}">
        <video id="screen" autoplay muted loop playsinline></video>
      </a-assets>
      <a-plane src="#advertisement" width="1.6" height="1.6" position="-2.4 1.4 -3.5"></a-plane>
      <a-entity id="tv" geometry="primitive: plane; width: 2.4; height: 1.5" position="0 2.4 -5"></a-entity>
      <a-entity mixin="giant" obj-model="obj: #gem-obj; mtl: #gem-mtl" position="2 0.8 -3.5"
                animation="property: rotation; to: 0 360 0; dur: 7000; easing: linear; loop: true"></a-entity>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    // No video file offline: a canvas stream stands in for derby.mp4.
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 200;
    const g = canvas.getContext('2d')!;
    const video = document.querySelector('#screen') as HTMLVideoElement;
    video.srcObject = canvas.captureStream(24);
    stage.every(50, (i) => {
      g.fillStyle = `hsl(${(i * 6) % 360} 60% 35%)`;
      g.fillRect(0, 0, 320, 200);
      g.fillStyle = '#fff';
      g.beginPath();
      g.arc(160 + Math.cos(i / 8) * 100, 100 + Math.sin(i / 6) * 60, 24, 0, 7);
      g.fill();
    });
    void video.play().catch(() => undefined);
    (stage.scene.querySelector('#tv') as Entity).setAttribute('material', 'src', '#screen');
    stage.caption('img, a-asset-item, a-mixin and video in <a-assets>');
    if (stage.preview) sway(stage);
  },
});
