// Country names in three forms: the GeoJSON name, a Finnish display name and a short code
export const COUNTRY_SET: { name: string; fi: string; code: string; value: number }[] = [
  { name: 'Finland', fi: 'Suomi', code: 'FIN', value: 92 },
  { name: 'Sweden', fi: 'Ruotsi', code: 'SWE', value: 85 },
  { name: 'Norway', fi: 'Norja', code: 'NOR', value: 88 },
  { name: 'Germany', fi: 'Saksa', code: 'DEU', value: 78 },
  { name: 'France', fi: 'Ranska', code: 'FRA', value: 71 },
  { name: 'Spain', fi: 'Espanja', code: 'ESP', value: 64 },
  { name: 'Italy', fi: 'Italia', code: 'ITA', value: 62 },
  { name: 'United Kingdom', fi: 'Britannia', code: 'GBR', value: 74 },
  { name: 'Russia', fi: 'Venäjä', code: 'RUS', value: 45 },
  { name: 'Turkey', fi: 'Turkki', code: 'TUR', value: 52 },
  { name: 'Egypt', fi: 'Egypti', code: 'EGY', value: 38 },
  { name: 'Nigeria', fi: 'Nigeria', code: 'NGA', value: 33 },
  { name: 'South Africa', fi: 'Etelä-Afrikka', code: 'ZAF', value: 49 },
  { name: 'India', fi: 'Intia', code: 'IND', value: 41 },
  { name: 'China', fi: 'Kiina', code: 'CHN', value: 58 },
  { name: 'Japan', fi: 'Japani', code: 'JPN', value: 81 },
  { name: 'Australia', fi: 'Australia', code: 'AUS', value: 83 },
  { name: 'Canada', fi: 'Kanada', code: 'CAN', value: 86 },
  { name: 'United States of America', fi: 'Yhdysvallat', code: 'USA', value: 76 },
  { name: 'Mexico', fi: 'Meksiko', code: 'MEX', value: 55 },
  { name: 'Brazil', fi: 'Brasilia', code: 'BRA', value: 47 },
  { name: 'Argentina', fi: 'Argentiina', code: 'ARG', value: 51 },
];

/** Copies the features and adds a `code` property to those in COUNTRY_SET, for nameProperty. */
export function withCodes<T extends { features: { properties: unknown }[] }>(geo: T): T {
  const byName = new Map(COUNTRY_SET.map((c) => [c.name, c.code]));
  return {
    ...geo,
    features: geo.features.map((f) => {
      const props = (f.properties ?? {}) as { name?: string };
      return { ...f, properties: { ...props, code: byName.get(props.name ?? '') ?? props.name } };
    }),
  };
}
