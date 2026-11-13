// Packet diagrams: field ranges, the +N bit-count shorthand and descending bit order
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A UDP header: the compact one first. +16 starts at the end of the previous field.
const UDP = `packet
title UDP Packet
+16: "Source Port"
+16: "Destination Port"
32-47: "Length"
48-63: "Checksum"
64-95: "Data (variable length)"`;

// A TCP header written with explicit bit ranges; single bits are just the number.
const TCP = `---
title: "TCP Packet"
---
packet
0-15: "Source Port"
16-31: "Destination Port"
32-63: "Sequence Number"
64-95: "Acknowledgment Number"
96-99: "Data Offset"
100-105: "Reserved"
106: "URG"
107: "ACK"
108: "PSH"
109: "RST"
110: "SYN"
111: "FIN"
112-127: "Window"
128-143: "Checksum"
144-159: "Urgent Pointer"
160-191: "(Options and Padding)"
192-255: "Data (variable length)"`;

// A hardware register: bitOrder descending mirrors every row, showBits prints the numbers.
const REGISTER = `---
config:
  packet:
    showBits: true
    bitOrder: descending
    bitsPerRow: 16
---
packet
0-7: "DATA"
8-11: "TYPE"
12: "EN"
13-15: "RESERVED"`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'UDP with +N bits', code: UDP },
      { label: 'TCP with ranges', code: TCP },
      { label: 'Register, descending bits', code: REGISTER },
    ],
  });

export default mount;
