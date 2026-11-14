// tone-js example: Solo one channel and silence the rest
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Solo one channel and silence the rest",
  summary:
    "Tone.Channel is a channel strip with volume, pan, mute and solo. Solo the keys and the bass and lead channels go quiet; solo nothing and everyone plays again. Click a strip in the full view.",
  section: "Channels and routing",
  tags: ["Channel", "solo", "muted", "Solo"],
  docs: ["repo/Tone/component/channel/Channel.ts", "repo/Tone/component/channel/Solo.ts", "repo/Tone/component/channel/PanVol.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
