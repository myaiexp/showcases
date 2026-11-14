// A short sample article (tea brewing) that scroll examples use as something worth reading

const PARAGRAPHS = [
  'Most bad tea is a temperature problem. Boiling water scorches green and white leaves, which turns them bitter and flat, while black tea and herbal blends want the full heat to open up properly.',
  'Start with fresh, cold water. Water that has been boiled twice loses dissolved air, and the cup tastes dull for it. Fill the kettle with only as much as you plan to drink.',
  'Warm the pot first. A cold ceramic pot steals several degrees from the brew in the first minute, which is the minute that matters most. A quick rinse of hot water fixes it.',
  'Measure the leaves rather than guessing. A level teaspoon per cup is a fair start for small leaves, and two for large twisted ones that take up more room before they unfurl.',
  'Time it. Three minutes suits most black teas, two suits green, and a long five is fine for herbal blends that cannot turn bitter. A kitchen timer beats memory every time.',
  'Take the leaves out when the time is up. Tea left sitting keeps extracting tannins, and the cup you poured at minute three is not the cup you are drinking at minute ten.',
  'Taste before adding anything. Milk and sugar are fine, but a good brew often needs neither, and you can only learn what a tea does by drinking it plain at least once.',
  'Keep notes. Write down the tea, the water temperature, the weight and the time. After a few weeks you will have a small private recipe book that beats any generic chart.',
];

/** Words in the whole sample article, for reading-time maths. */
export const ARTICLE_WORDS = PARAGRAPHS.join(' ').split(/\s+/).length;

/** The article as headline plus paragraphs. Built from the constants above, never from user input. */
export function articleHtml(): string {
  return `<h3>Making tea that tastes right</h3>${PARAGRAPHS.map((p) => `<p>${p}</p>`).join('')}`;
}
