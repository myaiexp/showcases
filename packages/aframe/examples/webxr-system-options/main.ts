// The webxr system's configuration, read back from sceneEl.systems.webxr
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene webxr="requiredFeatures: hit-test,local-floor;
                    optionalFeatures: dom-overlay,unbounded;
                    overlayElement: #overlay;" background="color: #10151c">
      <a-sphere position="0 1.6 -3" radius="0.7" color="#4CC3D9" animation="property: position; from: 0 1.2 -3; to: 0 2 -3; dur: 1800; dir: alternate; easing: easeInOutSine; loop: true"></a-sphere>
    </a-scene>
    <div id="overlay" style="display:none">AR overlay (handheld AR only)</div>`,
  run(stage) {
    const sys = stage.scene.systems.webxr as { data: Record<string, unknown>; sessionReferenceSpaceType?: string };
    const text = [
      `referenceSpaceType: ${String(sys.data.referenceSpaceType)}`,
      `requiredFeatures: ${JSON.stringify(sys.data.requiredFeatures)}`,
      `optionalFeatures: ${JSON.stringify(sys.data.optionalFeatures)}`,
      `overlayElement: ${sys.data.overlayElement ? `<${(sys.data.overlayElement as HTMLElement).tagName.toLowerCase()} id="${(sys.data.overlayElement as HTMLElement).id}">` : 'null'}`,
      `sessionReferenceSpaceType: ${String(sys.sessionReferenceSpaceType)}`,
    ].join('\n');
    stage.caption('requiredFeatures: hit-test, local-floor   optionalFeatures: dom-overlay, unbounded');
    const out = stage.readout();
    if (out) out.textContent = text;
    if (stage.preview) sway(stage, { yaw: 8 });
  },
});
