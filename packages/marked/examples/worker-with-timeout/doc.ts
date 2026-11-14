// Builds a long made-up trip diary so there is something big to parse
export function diary(days: number): string {
  const parts: string[] = [];
  for (let d = 1; d <= days; d++) {
    parts.push(
      `## Day ${d}\n\nWoke up early and had **coffee** by the _harbour_. Bought [tickets](#day-${d}) for the evening ferry.\n\n- Packed the bag\n- Checked the \`weather\`\n- Called home\n`,
    );
  }
  return parts.join('\n');
}
