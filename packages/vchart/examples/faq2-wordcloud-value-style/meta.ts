// vchart example: FAQ: word size and colour from the value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: word size and colour from the value",
  summary:
    "fontSizeRange maps the smallest and largest value to a pixel size, and word.style.fill / fillOpacity callbacks colour each word by its value. Sliders move the range; the card sweeps it.",
  section: 'FAQ',
  tags: ['wordCloud','fontSizeRange','word.style.fill','fillOpacity'],
  docs: [
    'repo/docs/assets/faq/en/138-How to customize the font size of words in Word Cloud Chart.md',
    'repo/docs/assets/faq/en/204-How to set the color and transparency of individual words inside the word cloud based on their values.md',
    'repo/docs/assets/option/en/series/word-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
