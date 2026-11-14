// tone-js example: Send several channels to one shared reverb
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Send several channels to one shared reverb",
  summary:
    "Channel.send(\"name\") sends a copy of a channel to a named bus and receive(\"name\") picks it up on another channel. Three channels send to one Tone.Reverb, each by its own amount, like the aux send on a mixing desk.",
  section: "Channels and routing",
  tags: ["Channel", "send", "receive", "Reverb", "bus"],
  docs: ["repo/Tone/component/channel/Channel.ts", "repo/Tone/core/context/Gain.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
