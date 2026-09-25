// Site-wide metadata. Single source for the cause taxonomy, the picks, the
// FAQ and the search metadata.

export const VERIFIED_AS_OF = '2026-09-20';

/* --- deployment ---------------------------------------------------------- */
// Set CANONICAL to the real domain before launch. Search engines and AI
// retrieval both key off it, and the schema below uses it to build entity IDs.
export const SITE = {
  masthead: 'GiveChi',
  tagline: 'A vetted guide to Chicago charities and where your money actually goes',
  canonical: 'https://givechi.org/',

  // The resting <title>. On a brand-new domain it carries the search phrase,
  // because there is no brand equity yet and the title is the strongest
  // on-page signal there is. js/title.js leads it with a filter or a shared
  // list; og:site_name and the WebSite schema use the bare `masthead`.
  name: 'GiveChi · Vetted Chicago charities',

  // Used for og:title and twitter:title, which are never truncated to a
  // wordmark, so the searchable phrase goes here regardless.
  title: 'GiveChi — Vetted Chicago Charities and Where to Donate',

  // {count} is ORGS.length, filled by build.mjs. Keep it under ~155
  // characters filled, which is where search snippets cut.
  description:
    '{count} Chicago charities, vetted: what each one does, the evidence behind it, how much reaches programs, and a checked donation link. Takes no cut.',
  locale: 'en_US',
  publisher: 'GiveChi',

  // Who stands behind the site, and how it was made. Printed in the footer
  // and in How we check, and named as the author in the page's metadata.
  steward: 'Cody Heart',
  madeWith: 'Claude, an AI model made by Anthropic',

  // Where corrections go: an email address or a form URL that someone reads.
  // The owner supplies it; the colophon prints a text-only line while it is
  // null, and the build warns.
  contact: null
};

export const CAUSES = [
  /* `short` is the CHIP — a truncation of `label` long enough that a reader
     can confirm the chip they pressed is the section they landed in.
     `axis` is the skyline's group label, an annotation under a narrow
     column span with a caption beneath it and a hard width budget. Both are
     truncations of the same name at different depths, never a different
     word for it. The field exists because lengthening `short` for the chips
     once pushed two labels into their neighbours; the chart's alternating
     rows carry the current values with 93-140px to spare, and this is the
     seam to use when one of them next grows. */
  { id: 'food',        label: 'Food and basic needs',        short: 'Food',        axis: 'Food', query: 'food insecurity and hunger relief' },
  { id: 'education',   label: 'Literacy and education',      short: 'Literacy',    axis: 'Literacy', query: 'literacy, tutoring and college access' },
  // The `short` form is a TRUNCATION of `label`, never a different word for
  // the same thing. A reader has to be able to confirm that the chip they
  // pressed is the section they landed in; seven of these used to be a
  // second vocabulary sitting 274px from the first.
  { id: 'housing',     label: 'Housing and homelessness',    short: 'Housing',     axis: 'Housing', query: 'homelessness, shelter and supportive housing' },
  { id: 'legal',       label: 'Legal aid and civic accountability', short: 'Legal aid', axis: 'Legal aid', query: 'immigration defense, civil legal aid and police accountability' },
  { id: 'youth',       label: 'Violence prevention and youth', short: 'Violence prevention', axis: 'Violence', query: 'gun violence prevention and youth development' },
  { id: 'health',      label: 'Health',                      short: 'Health',      axis: 'Health', query: 'community health centers and free clinics' },
  { id: 'women',       label: 'Women and survivors',         short: 'Women and survivors', axis: 'Women', query: 'domestic violence services and women’s funds' },
  { id: 'environment', label: 'Environment and land',        short: 'Environment', axis: 'Environment', query: 'conservation, rivers and urban farming' }
];

export const EVIDENCE_TIERS = {
  'randomized-trial': {
    label: 'Randomized trial',
    rank: 3,
    brief: 'tested against a control group',
    gloss: 'Tested against a control group. The strongest evidence available for social programs.'
  },
  'independent-study': {
    label: 'Independent study',
    rank: 2,
    brief: 'evaluated by an outside researcher',
    gloss: 'Evaluated by an outside researcher. Includes studies the organization commissioned itself.'
  },
  'self-reported': {
    label: 'Self-reported',
    rank: 1,
    brief: 'counted by the organization itself',
    gloss: 'Counted by the organization itself. No outside evaluation of the program’s effect is on file here.'
  }
};

export const FLAG_LABELS = {
  deficit: 'Finances',
  labor: 'Labor record',
  'funding-risk': 'Funding risk',
  entity: 'Entity',
  link: 'Giving link',
  'data-quality': 'Reported figures'
};

export const BEACON_CAVEAT =
  'A Charity Navigator score is built from up to four separate assessments, called beacons. ' +
  'Almost every organization here has completed only one of them — Accountability & Finance, ' +
  'which measures financial disclosure and governance. It says nothing about whether the programs work. ' +
  'A 100/100 means the books are clean and public, and no more than that.';

/* --- the sixty-second picks ---------------------------------------------- */
//
// Each pick is a single stated rule applied to the data, not a score and not
// an opinion. The rule and the number that satisfies it are both printed on
// the tile, so a reader can reject the rule rather than having to trust us.
// No organization is picked twice; later rules skip anything already taken.

const hasDeficit = (o) => o.flags.some((f) => f.kind === 'deficit');

/* The row's formats, so a pick's figure reads exactly as its row does: one
   decimal for a ratio, and build.mjs money() for spending ($54.7M, never
   "$55M"). Kept in step with money() in build.mjs. */
const pct = (r) => `${Number(r).toFixed(1)}%`;
function money(n) {
  const abs = Math.abs(n);
  if (abs >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(n / 1e6).toFixed(abs >= 1e8 ? 0 : 1)}M`;
  if (abs >= 1e3) return `$${Math.round(n / 1e3)}K`;
  return `$${n}`;
}

/* 19 F5: a tile decided by a tie-break says so. `tied` lists the others
   that meet the rule's first test equally, `tieOn` names that test and
   `decider` the value that settled it; build.mjs writes the sentence. */

export const PICK_RULES = [
  {
    id: 'evidence',
    label: 'Strongest evidence',
    rule: 'Has a randomized controlled trial behind it. Ties go to the one with the fewest notes.',
    tied: (orgs, o) => orgs.filter((x) => x !== o && x.evidence.strength === 'randomized-trial'),
    tieOn: () => 'have a trial',
    decider: () => 'having the fewest notes',
    pick: (orgs) =>
      orgs
        .filter((o) => o.evidence.strength === 'randomized-trial')
        .sort((a, b) => a.flags.length - b.flags.length)[0],
    figure: () => 'Randomized trial',
    value: () => 'RCT',
    unit: () => 'randomized controlled trial'
  },
  {
    id: 'efficiency',
    label: 'Most of your dollar reaches programs',
    rule: 'Highest program-expense ratio among four-star organizations carrying no deficit note.',
    pick: (orgs) =>
      orgs
        .filter((o) => o.vetting.cnStars === 4 && !hasDeficit(o) && o.vetting.programExpenseRatio)
        .sort((a, b) => b.vetting.programExpenseRatio - a.vetting.programExpenseRatio)[0],
    figure: (o) => `${pct(o.vetting.programExpenseRatio)} to programs`,
    value: (o) => pct(o.vetting.programExpenseRatio),
    unit: () => 'of expenses reach programs'
  },
  {
    id: 'reach',
    label: 'Largest operation',
    rule: 'Highest annual expenses: the widest reach any one gift here buys. Size measures reach only.',
    pick: (orgs) =>
      orgs
        .filter((o) => o.financials && o.financials.expenses)
        .sort((a, b) => b.financials.expenses - a.financials.expenses)[0],
    figure: (o) => `${money(o.financials.expenses)} a year`,
    value: (o) => money(o.financials.expenses),
    unit: () => 'spent a year'
  },
  {
    id: 'steady',
    label: 'Steadiest finances',
    rule: 'No deficit note on the record, then the highest Charity Navigator score. Ties go to the higher program-expense ratio.',
    tied: (orgs, o) => orgs.filter((x) => x !== o && !hasDeficit(x) && x.vetting.cnScore === o.vetting.cnScore),
    tieOn: (o) => `score ${o.vetting.cnScore}`,
    decider: (o) => `its ${pct(o.vetting.programExpenseRatio)} program ratio`,
    pick: (orgs) =>
      orgs
        .filter((o) => !hasDeficit(o) && o.vetting.cnScore !== null)
        .sort(
          (a, b) =>
            b.vetting.cnScore - a.vetting.cnScore ||
            b.vetting.programExpenseRatio - a.vetting.programExpenseRatio
        )[0],
    figure: (o) => `${o.vetting.cnScore} / 100, no deficits`,
    value: (o) => `${o.vetting.cnScore}`,
    unit: () => 'out of 100, and no deficit'
  },
  {
    id: 'scrutiny',
    label: 'Most independently checked',
    rule: 'Most Charity Navigator beacons completed, which is the closest thing here to outside scrutiny. Ties go to the higher Charity Navigator score.',
    tied: (orgs, o) => orgs.filter((x) => x !== o && x.vetting.cnScore !== null && x.vetting.beaconsComplete === o.vetting.beaconsComplete),
    tieOn: (o) => `have ${o.vetting.beaconsComplete} of 4 beacons`,
    decider: (o) => `its ${o.vetting.cnScore} / 100 score`,
    pick: (orgs) =>
      orgs
        .filter((o) => o.vetting.cnScore !== null)
        .sort(
          (a, b) =>
            b.vetting.beaconsComplete - a.vetting.beaconsComplete ||
            b.vetting.cnScore - a.vetting.cnScore
        )[0],
    figure: (o) => `${o.vetting.beaconsComplete} of 4 beacons assessed`,
    value: (o) => `${o.vetting.beaconsComplete} of 4`,
    unit: () => 'beacons independently assessed'
  }
];

/* --- FAQ ----------------------------------------------------------------- */
//
// Written answer-first: the first sentence of each answer is the answer.
// That is what both featured snippets and AI retrieval lift, and it is also
// just the better way to write.

export const FAQ = [
  {
    id: 'how-we-vetted',
    q: 'How were these organizations checked?',
    a: 'Each one was checked on {{verified}} against its IRS Form 990, its Charity Navigator record and its own reports, and every donation link was opened to confirm it works. A Chicago charity missing from this list has not been judged.'
  },
  {
    q: 'What do the evidence tags mean?',
    a: 'Randomized trial: the program was tested against a control group, the strongest proof that it works. Independent study: an outside researcher evaluated it. Self-reported: the organization counts its own results.'
  },
  {
    q: 'How much of my donation reaches programs?',
    a: 'Between 62 and 98 percent here, shown for every charity as a three-year average. It shows how spending is classified, and the evidence tag shows whether the programs work.'
  },
  {
    q: 'Are donations tax deductible?',
    a: 'For 37 of the 39, yes, if you itemize. Chicago CRED is a private operating foundation with different deduction limits, and gifts to Chicago Votes are deductible only through its Education Fund, which this page links. Each entry lists its EIN.'
  },
  {
    q: 'Why is there no overall ranking?',
    a: 'Financial ratios, ratings and program evidence measure different things, and one combined score would invent precision. The picker ranks by one priority at a time, and you choose which.'
  },
  {
    q: 'How current is this information?',
    a: 'Checked on {{verified}}. Financial figures come from each organization’s latest readable filing: FY2025 for {{fy2025}}, FY2024 for {{fy2024}} and FY2023 for {{fy2023}}.'
  }
];

export const SOURCES = [
  { label: 'IRS Form 990 filings', via: 'ProPublica Nonprofit Explorer', url: 'https://projects.propublica.org/nonprofits/' },
  { label: 'Charity ratings and program ratios', via: 'Charity Navigator', url: 'https://www.charitynavigator.org/' },
  { label: 'Audited financial statements and impact reporting', via: 'each organization’s own site', url: null },
  { label: 'Local news reporting', via: 'cited on the entries that use it', url: null }
];
