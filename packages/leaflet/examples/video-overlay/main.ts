// A VideoOverlay playing a canvas stream, with play and pause through getElement()
import { LeafletMap, VideoOverlay } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { canvasVideo, stormFrame } from '../../shared/canvas-media.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The tutorial\'s video is a remote file. This one is a canvas stream in a <video> element, which VideoOverlay accepts in place of URLs.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [23, -115], zoom: stage.preview ? 3 : 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  // Muted, so autoplay is allowed; the stream's tracks stop with the stage.
  const video = canvasVideo(stage, 480, 340, stormFrame);
  const videoBounds: [[number, number], [number, number]] = [
    [32, -130],
    [13, -100],
  ];
  const videoOverlay = new VideoOverlay(video, videoBounds, { opacity: 0.85 }).addTo(map);
  void video.play().catch(() => undefined);
  videoOverlay.on('load', () => stage.say('load: the first frame arrived'));

  stage.button('Pause', () => {
    videoOverlay.getElement()?.pause();
    stage.say('getElement().pause()');
  });
  stage.button('Play', () => {
    void videoOverlay.getElement()?.play();
    stage.say('getElement().play()');
  });

  if (stage.preview) {
    stage.cycle([{ say: 'playing', run: () => undefined, hold: 3500 }, { say: 'paused with getElement().pause()', run: () => videoOverlay.getElement()?.pause(), hold: 1300 }, { say: 'play()', run: () => void videoOverlay.getElement()?.play(), hold: 1000 }]);
  }
  return () => stage.dispose();
};

export default mount;
