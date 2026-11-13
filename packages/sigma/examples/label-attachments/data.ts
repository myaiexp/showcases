// Six "people" nodes with a role and a score for the attachment card to show
import Graph from 'graphology';

export function buildPeople(): Graph {
  const graph = new Graph();
  const people: Array<[string, string, number, number, number]> = [
    ['Ada Lovelace', 'Mathematician', 92, 0, 0],
    ['Grace Hopper', 'Compiler pioneer', 88, 30, 4],
    ['Alan Turing', 'Logician', 95, 60, 0],
    ['Margaret Hamilton', 'Flight software', 90, 8, 22],
    ['Katherine Johnson', 'Orbital mechanics', 87, 38, 24],
    ['Barbara Liskov', 'Type theory', 85, 66, 22],
  ];
  for (const [name, role, score, x, y] of people) {
    graph.addNode(name, { label: name, role, score, x, y, size: 1.2, color: '#277da1', attachment: null, backdrop: 'hidden', placement: 'below' });
  }
  const names = people.map(([n]) => n);
  names.forEach((n, i) => {
    const next = names[(i + 1) % names.length];
    if (next) graph.addEdge(n, next, { size: 0.2, color: '#ccc' });
  });
  return graph;
}
