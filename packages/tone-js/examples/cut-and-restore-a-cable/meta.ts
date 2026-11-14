// tone-js example: Cut and restore a cable while it plays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cut and restore a cable while it plays",
  summary:
    "A drum loop reaches the speakers by two cables: straight through a Gain, and through a Tone.FeedbackDelay. Click a cable in the picture to disconnect it, and again to plug it back in, while the sound keeps going.",
  section: "Channels and routing",
  tags: ["connect", "disconnect", "Gain", "FeedbackDelay"],
  docs: ["repo/Connections.md", "repo/Tone/core/context/ToneAudioNode.ts", "repo/Tone/core/context/Gain.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
