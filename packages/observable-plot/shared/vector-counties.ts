// US counties joined with population and 2020 election data, as the vector page does
import { csvStrings, topojson, usTopology, type Row } from './data.ts';

export interface Counties {
  nation: ReturnType<typeof topojson.mesh>;
  statemesh: ReturnType<typeof topojson.mesh>;
  counties: Row[];
}

let cached: Promise<Counties> | undefined;

/** The docs' derivation: county features carry population, margin2020 and votes properties. */
export function loadCounties(): Promise<Counties> {
  cached ??= (async () => {
    const [us, population, election] = await Promise.all([usTopology(), csvStrings('us-county-population.csv'), csvStrings('us-presidential-election-2020.csv')]);
    const pop = new Map(population.map((d) => [d.state + d.county, +d.population]));
    const byFips = new Map(election.map((d) => [d.fips, d]));
    for (const g of us.objects.counties.geometries) {
      const props = ((g as { properties?: Row }).properties ??= {});
      props.population = pop.get(g.id as string);
      const e = byFips.get(g.id);
      if (e) {
        props.margin2020 = +e.margin2020;
        props.votes = +e.votes;
      }
    }
    return {
      nation: topojson.mesh(us, us.objects.nation),
      statemesh: topojson.mesh(us, us.objects.states, (a, b) => a !== b),
      counties: topojson.feature(us, us.objects.counties).features as Row[],
    };
  })();
  return cached;
}
