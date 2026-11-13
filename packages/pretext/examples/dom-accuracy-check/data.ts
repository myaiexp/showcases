// Multilingual test strings, widths and the per-script font list for dom-accuracy-check
export interface Case {
  label: string;
  text: string;
}

export const CASES: Case[] = [
  { label: 'Latin', text: 'The quick brown fox jumps over the lazy dog while the band plays on and on.' },
  { label: 'German', text: 'Donaudampfschifffahrtsgesellschaft und Rechtsschutzversicherungsgesellschaften tagen heute.' },
  { label: 'Chinese', text: '春天到了，花儿开了，我们一起去公园里散步，看看盛开的樱花吧。' },
  { label: 'Japanese', text: 'ちょっと待ってください。ラーメンとコーヒーをお願いします、約3ヶ月ぶりです。' },
  { label: 'Arabic', text: 'بدأت الرحلة في الصباح الباكر وانتهت عند غروب الشمس في المدينة القديمة.' },
  { label: 'Emoji', text: 'Launch 🚀 day 🎉 with the team 👩‍👩‍👧 and a flag 🇫🇮 and a heart ❤️ too.' },
  { label: 'Thai', text: 'สวัสดีครับ วันนี้อากาศดีมาก เราไปเดินเล่นที่สวนสาธารณะกันเถอะ' },
  { label: 'Mixed', text: 'AGI 春天到了. بدأت الرحلة 🚀 and Thai สวัสดี in one line.' },
];

export const WIDTHS = [80, 120, 180, 240, 320];

// A named font per script, never a bare generic: Inter, then CJK, Arabic/Hebrew, Thai and emoji faces.
export const FAMILY =
  '"Inter Variable", "Noto Sans CJK SC", "Hiragino Kaku Gothic ProN", "PingFang SC", "DejaVu Sans", "Geeza Pro", "FreeSans", "Thonburi", "Noto Color Emoji", "Apple Color Emoji", sans-serif';
