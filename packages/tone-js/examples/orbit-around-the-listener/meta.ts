// tone-js example: A sound orbiting around your head
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A sound orbiting around your head",
  summary:
    "Tone.Panner3D puts a sound at a position in space around the listener, who looks along -z. Automating positionX and positionZ in a circle makes it orbit; the map shows where it is, and distance makes it quieter. Use headphones.",
  section: "Channels and routing",
  tags: ["Panner3D", "positionX", "positionZ", "panningModel", "refDistance", "rolloffFactor"],
  docs: ["repo/Tone/component/channel/Panner3D.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
