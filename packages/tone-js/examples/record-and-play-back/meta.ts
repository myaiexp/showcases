// tone-js example: Record what you play and download it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Record what you play and download it",
  summary:
    "Tone.Recorder wraps the browser MediaRecorder: connect a synth to it, start() it, play, and stop() returns the recording as a Blob. In the full view, record a phrase, play it back and download the file. Cards show a stand-in: they stay silent.",
  section: "Channels and routing",
  tags: ["Recorder", "start", "stop", "Blob", "MediaRecorder"],
  docs: ["repo/Tone/component/channel/Recorder.ts", "repo/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
