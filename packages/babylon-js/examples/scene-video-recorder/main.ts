// VideoRecorder recording the canvas into a video element on the page
import { ArcRotateCamera, Color3, Color4, HemisphericLight, MeshBuilder, StandardMaterial, VideoRecorder, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { engineOptions: { preserveDrawingBuffer: true } });
  const { scene, canvas, engine } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 9, new Vector3(0, 0.8, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.05, 0.07, 0.14, 1);

  const knot = MeshBuilder.CreateTorusKnot('knot', { radius: 1.4, tube: 0.45, radialSegments: 128 }, scene);
  knot.position.y = 1.4;
  const mat = new StandardMaterial('mat', scene);
  mat.diffuseColor = new Color3(0.9, 0.5, 0.25);
  knot.material = mat;
  const ground = MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
  ground.material = Object.assign(new StandardMaterial('ground-mat', scene), { diffuseColor: new Color3(0.25, 0.3, 0.4) });

  let t = 0;
  stage.run(() => {
    t += engine.getDeltaTime() / 1000;
    knot.rotation.set(t * 0.7, t * 1.1, 0);
    mat.diffuseColor = Color3.FromHSV((t * 40) % 360, 0.65, 0.95);
    camera.alpha += ctx.preview ? 0.005 : 0.002;
  });
  // The preview only shows the scene: recording needs a button and a <video> on the page.
  if (ctx.preview) return () => stage.dispose();

  let objectUrl: string | undefined;
  const video = document.createElement('video');
  Object.assign(video.style, { display: 'none', width: '100%', maxHeight: '320px', background: '#000' });
  video.controls = true;
  video.loop = true;

  const panel = createPanel(el);
  const readout = panel.readout();
  const supported = VideoRecorder.IsSupported(engine);
  readout.textContent = supported ? 'Press record: the canvas is captured for the chosen length, then played back below.' : 'This browser cannot record a canvas stream.';
  let seconds = 4;
  let recorder: VideoRecorder | undefined;
  let button: HTMLButtonElement;
  panel.slider('duration (s)', 1, 10, 1, seconds, (v) => (seconds = v));
  button = panel.button('startRecording()', async () => {
    if (!supported) return;
    if (recorder?.isRecording) {
      recorder.stopRecording(); // ends early; the promise below still resolves with what was captured
      return;
    }
    recorder = new VideoRecorder(engine);
    button.textContent = 'stopRecording()';
    readout.textContent = `Recording ${seconds} s...`;
    // A null file name means: do not download, just hand back the Blob.
    const blob = await recorder.startRecording(null, seconds);
    button.textContent = 'startRecording()';
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(blob);
    video.src = objectUrl;
    video.style.display = 'block';
    void video.play().catch(() => undefined);
    readout.textContent = `Recorded ${(blob.size / 1024).toFixed(0)} KB (${blob.type || 'video/webm'}).`;
  });
  el.append(video);

  return () => {
    if (recorder?.isRecording) recorder.stopRecording();
    video.pause();
    video.removeAttribute('src');
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    video.remove();
    stage.dispose();
  };
};

export default mount;
