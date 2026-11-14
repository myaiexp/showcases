// tone-js example: Crossfade between two sounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Crossfade between two sounds",
  summary:
    "Tone.CrossFade has two inputs, a and b, and one fade control: 0 plays only a, 1 only b, and in between they trade places at equal power so the loudness stays steady. A low saw melody fades into a high triangle one.",
  section: "Channels and routing",
  tags: ["CrossFade", "fade", "a", "b"],
  docs: ["repo/Tone/component/channel/CrossFade.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
