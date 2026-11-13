// babylon-js example: VideoRecorder into a video element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "VideoRecorder into a video element",
  summary:
    "A button starts a VideoRecorder on the engine's canvas for a chosen number of seconds; startRecording(null, seconds) resolves with a Blob that plays in a <video> element below, with IsSupported checked first. The card preview shows only the scene.",
  section: "Scene",
  tags: ['VideoRecorder', 'IsSupported', 'startRecording', 'stopRecording', 'isRecording'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/renderToVideo.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
