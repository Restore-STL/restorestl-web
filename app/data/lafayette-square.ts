// Lafayette Square v1 authored content.
// "By the Place" and placeholder copy are authored per-neighborhood, not
// derived from canonical_data. For v1 (TICKET-092) only this one file exists;
// future neighborhoods add parallel modules.

export const lafayetteSquareContent = {
  heroTagline:
    "A neighborhood rebuilt block by block — the city's oldest park and some of the country's best-preserved Victorian architecture, in a square mile south of downtown.",
  footprintLabel: '~1.0 sq mi',
  mapEyebrow: 'Section 01 · The Shape of the Place',
  mapHeading:
    'One square mile, bounded by a parkway, an interstate, and an avenue.',
  mapAlt:
    'Illustrated map of Lafayette Square neighborhood in St. Louis, showing Lafayette Park at the center surrounded by Victorian homes, with Downtown to the north, Soulard to the east, LaSalle Park to the west, and McKinley Heights to the south.',
  statsStrip: [
    {
      num: '1851',
      label: 'Lafayette Park founded',
      note: 'Oldest urban park west of the Mississippi.',
    },
    {
      num: '1972',
      label: 'Listed on the National Register',
      note: 'First historic district in Missouri.',
    },
    {
      num: '30',
      unit: 'ac',
      label: 'Park at the center',
      note: 'Thirty acres the neighborhood grew around.',
    },
    {
      num: '~1',
      unit: 'sq mi',
      label: 'Neighborhood footprint',
      note: '63104 · south of downtown St. Louis.',
    },
  ] as const,
  placeholders: [
    {
      num: '04',
      title: 'Getting Around',
      fact:
        'Lafayette Square sits a ten-minute walk from MetroLink and is one of the most walkable historic districts in the city.',
      working:
        "We're mapping the walk, transit, and bike reality block by block for every St. Louis neighborhood.",
      microCta: 'Tell us what matters to you about getting around →',
    },
    {
      num: '05',
      title: 'Eat & Drink',
      fact:
        "The neighborhood has quietly become one of the region's best dining corridors — small-footprint chef-driven restaurants, a Saturday-morning coffee ritual, and some of the oldest taverns still operating in the city.",
      working:
        "We're documenting every venue — the new, the 40-year-old, the one only locals know.",
      microCta: "Recommend a place we shouldn't miss →",
    },
    {
      num: '06',
      title: 'Parks & Recreation',
      fact:
        'Lafayette Park, founded in 1851, is the oldest urban park west of the Mississippi — and St. Louis has more parks per capita than almost any other major American city.',
      working:
        "We're cataloging every park, trail, and green space in every St. Louis neighborhood.",
      microCta: 'Share what you love about Lafayette Park →',
    },
    {
      num: '07',
      title: 'Schools',
      fact:
        'St. Louis has a complex schooling landscape — public, charter, magnet, parochial, and private — and the right answer depends on the family.',
      working:
        "We're working through this carefully, with asset-based framing and current accreditation data.",
      microCta: 'Tell us about your school search →',
    },
    {
      num: '08',
      title: 'Community',
      fact:
        'The Lafayette Square Neighborhood Association is one of the oldest and most active in the city — the reason the neighborhood survived at all.',
      working:
        "We're documenting associations, leaders, and events for every neighborhood.",
      microCta: 'What should we know about your community? →',
    },
  ] as const,
};

export type NeighborhoodContent = typeof lafayetteSquareContent;

export function getNeighborhoodContent(slug: string): NeighborhoodContent | null {
  if (slug === 'lafayette-square') return lafayetteSquareContent;
  return null;
}
