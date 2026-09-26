// The roster. Verified 2026-09-20, re-checked 2026-09-25, against IRS Form 990 data (via ProPublica),
// Charity Navigator profiles, and each organization's own site and audited statements.
//
// giftExample, volunteerUrl and recurring come from the charity’s own site (checked 2026-09-25);
// a gift example is only ever the charity’s own published figure, never computed here.
// photo is a free-licensed picture of the charity’s own work (img/orgs/<id>-640|1280.webp,
// cropped to 16:9), credited on the page and under How we check; null where none exists.
//
// Do not add entries from memory. Every addition needs: EIN and subsection code from
// IRS data, a donation URL confirmed to load a real payment form, Charity Navigator
// status including beacon count, and an impact figure with its period and provenance.

export const ORGS = [

  /* ---------------------------------------------------------------- food --- */

  {
    id: 'greater-chicago-food-depository',
    name: 'Greater Chicago Food Depository',
    aka: ['Chicago’s food bank'],
    ein: '36-2971864',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.chicagosfoodbank.org/',
    donateUrl: 'https://www.chicagosfoodbank.org/get-involved/give/',
    donateNote: 'Official giving hub — choose one-time or monthly.',
    giftExample: { amount: 25, provides: 'helps feed 25 families', source: 'https://www.chicagosfoodbank.org/get-involved/give/' },
    volunteerUrl: 'https://www.chicagosfoodbank.org/get-involved/volunteer/',
    recurring: true,
    photo: { w: 1280, h: 720, caption: 'Walkers at the start of the Food Depository’s Hunger Walk, 2017', alt: 'A crowd of walkers in orange shirts gathers beneath the Hunger Walk start arch in a park.', artist: 'Greater Chicago Food Depository', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', source: 'https://commons.wikimedia.org/wiki/File:BLP_7881.jpg' },
    founded: 1979,
    primaryCause: 'food',
    causes: ['food'],
    serviceArea: 'Chicago and Cook County',
    neighborhoods: [],
    scale: 'Countywide',
    does: 'Sources, warehouses and distributes food through more than 850 partner pantries, kitchens and shelters, and helps people enroll in SNAP.',
    short: 'Supplies food to 850+ pantries, kitchens and shelters',
    // First sentence ships alone in shared giving lists: make it the reason to give, with the organization as the subject or the object.
    whyItMatters: 'Most Chicago food pantries get their food from the Depository. A gift here moves through the whole county’s pantry network, which makes it the closest thing to infrastructure in local hunger relief. The scale cuts both ways: it is the least personal gift on this list and the one that reaches the most addresses.',
    evidence: {
      claim: '99 million meals provided across all food programs',
      period: 'FY2026',
      strength: 'self-reported',
      source: 'https://www.chicagosfoodbank.org/'
    },
    vetting: {
      cnScore: 100, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2025',
      cnUrl: 'https://www.charitynavigator.org/ein/362971864',
      programExpenseRatio: 91.8, ratioBasis: 'three-year average', ratioYears: 'FY2023–FY2025'
    },
    financials: { fiscalYear: 'FY2025', revenue: 241580413, expenses: 243247145, result: -1666732 },
    flags: [
      { kind: 'deficit', note: 'Small operating deficits in FY2022, FY2023 and FY2025, against $216M in assets.', source: 'https://projects.propublica.org/nonprofits/organizations/362971864' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'nourishing-hope',
    name: 'Nourishing Hope',
    aka: ['Lakeview Pantry'],
    ein: '36-2734184',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://nourishinghopechi.org/',
    donateUrl: 'https://nourishinghopechi.org/ways-to-give/',
    donateNote: 'Their /donate/ page carries no payment form. This is the ways-to-give page; the monthly form at nourishinghope-monthly.funraise.org does work.',
    giftExample: { amount: 1, provides: 'helps provide 3 meals', source: 'https://nourishinghopechi.org/host-food-drive/' },
    volunteerUrl: 'https://nourishinghopechi.org/volunteer/',
    recurring: true,
    photo: null,
    founded: 1970,
    primaryCause: 'food',
    causes: ['food', 'health'],
    serviceArea: 'Lakeview, Humboldt Park and West Town, with citywide delivery',
    neighborhoods: ['Lakeview', 'Humboldt Park', 'West Town'],
    scale: 'Citywide',
    does: 'Runs food pantries and home grocery delivery, and pairs them with in-house mental health counseling and case management.',
    short: 'Food pantries and grocery delivery, plus counseling',
    whyItMatters: 'Nourishing Hope puts therapists and caseworkers behind the same door as the groceries, because hunger rarely arrives alone. It is one of the few pantries run on that assumption. In Lakeview since 1970, it knows which neighbors stopped showing up.',
    evidence: {
      claim: 'More than 6 million pounds of food, 50,000 neighbors reached',
      period: 'FY2025',
      strength: 'self-reported',
      source: 'https://nourishinghopechi.org/reports-and-financials/'
    },
    vetting: {
      cnScore: 100, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2025',
      cnUrl: 'https://www.charitynavigator.org/ein/362734184',
      programExpenseRatio: 85.8, ratioBasis: 'three-year average', ratioYears: 'FY2023–FY2025'
    },
    financials: { fiscalYear: 'FY2025', revenue: 19635067, expenses: 20025120, result: -390053 },
    flags: [
      { kind: 'link', note: 'Their own donate page routes to a landing page with no amount form. Give through ways-to-give or the monthly form.', source: 'https://nourishinghopechi.org/ways-to-give/' },
      { kind: 'deficit', note: 'FY2025 deficit of $390,000 on a $20M budget.', source: 'https://projects.propublica.org/nonprofits/organizations/362734184' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'care-for-real',
    name: 'Care for Real',
    aka: ['CfR'],
    ein: '27-1962360',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://careforreal.org/',
    donateUrl: 'https://careforreal.org/get-involved/donate/',
    donateNote: null,
    giftExample: null,
    volunteerUrl: 'https://careforreal.org/get-involved/volunteer/',
    recurring: true,
    photo: null,
    founded: 1970,
    foundedNote: 'Founded in 1970 by an interfaith group of Edgewater clergy; incorporated as an independent 501(c)(3) in 2010.',
    primaryCause: 'food',
    causes: ['food'],
    serviceArea: 'Edgewater and Rogers Park — ZIPs 60640, 60660, 60626, 60659, 60645',
    neighborhoods: ['Edgewater', 'Rogers Park'],
    scale: 'Neighborhood',
    does: 'Operates food pantries four days a week alongside a clothing closet, a pet pantry and home delivery for homebound neighbors.',
    short: 'Food pantries, clothing and home delivery',
    whyItMatters: 'Ninety-three cents of every dollar reaches programs, the highest of any four-star organization in this guide, and it has run surpluses while expanding. It serves five far-North-Side ZIP codes and nothing else, which is why it can keep a pet pantry and a clothing closet open alongside the food: the kinds of things a citywide operation cuts first.',
    evidence: {
      claim: '2,046,297 pounds of food distributed',
      period: 'most recent fiscal year',
      strength: 'self-reported',
      source: 'https://www.guidestar.org/profile/27-1962360'
    },
    vetting: {
      cnScore: 92, cnStars: 4, beaconsComplete: 2, beaconsTotal: 4,
      cnFiscalYear: 'FY2025',
      cnUrl: 'https://www.charitynavigator.org/ein/271962360',
      programExpenseRatio: 93.3, ratioBasis: 'three-year average', ratioYears: 'FY2023–FY2025'
    },
    financials: { fiscalYear: 'FY2025', revenue: 8374038, expenses: 7111107, result: 1262931 },
    flags: [],
    verified: '2026-09-25'
  },

  {
    id: 'beyond-hunger',
    name: 'Beyond Hunger',
    aka: ['Oak Park River Forest Food Pantry'],
    ein: '27-2018997',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.gobeyondhunger.org/',
    donateUrl: 'https://www.gobeyondhunger.org/donate',
    donateNote: null,
    giftExample: { amount: 45, provides: 'a month helps a family pick up a month’s worth of healthy groceries', source: 'https://www.gobeyondhunger.org/monthly-giving' },
    volunteerUrl: 'https://www.gobeyondhunger.org/volunteer',
    recurring: true,
    photo: null,
    founded: 1978,
    primaryCause: 'food',
    causes: ['food'],
    serviceArea: '13 ZIP codes across Oak Park, River Forest, Forest Park, Berwyn, other near-west suburbs and Chicago’s Austin and Galewood',
    neighborhoods: ['Oak Park', 'River Forest', 'Forest Park', 'Berwyn', 'Austin'],
    scale: 'Regional',
    does: 'Runs a food pantry with home delivery, SNAP application assistance and nutrition education across thirteen ZIP codes.',
    short: 'Food pantry and home delivery in 13 ZIP codes',
    whyItMatters: 'Beyond Hunger covers thirteen ZIP codes across Oak Park, River Forest, Forest Park, Berwyn and Chicago’s West Side, where need shows up as a quiet line at a church door and is easy to miss. Its finances are the strongest in this category. When SNAP benefits were in doubt in late 2025, it served a record number of households in a single weekend.',
    evidence: {
      claim: '1,200 people served in a single weekend, the most households in its 47-year history, as reported by the Wednesday Journal',
      period: 'November 2025',
      strength: 'self-reported',
      source: 'https://www.oakpark.com/2025/11/04/beyond-hunger-sets-record-for-households-served-amid-snap-benefit-uncertainty/'
    },
    vetting: {
      cnScore: 96, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/272018997',
      programExpenseRatio: 85.7, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 6921928, expenses: 5046775, result: 1875153 },
    flags: [],
    verified: '2026-09-25'
  },

  {
    id: 'common-pantry',
    name: 'Common Pantry',
    aka: [],
    ein: '23-7136034',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.commonpantry.org/',
    donateUrl: 'https://www.commonpantry.org/donations/',
    donateNote: null,
    giftExample: null,
    volunteerUrl: 'https://www.commonpantry.org/volunteer/',
    recurring: true,
    photo: { w: 1280, h: 720, caption: 'Volunteers at work in Common Pantry, 2019', alt: 'Volunteers in green shirts stock and sort food on the shelves of Common Pantry.', artist: 'Preston Keres, USDA', license: 'Public domain', licenseUrl: null, source: 'https://commons.wikimedia.org/wiki/File:20190425-PJK-AMS-0917_TONED.jpg' },
    founded: 1967,
    primaryCause: 'food',
    causes: ['food'],
    serviceArea: 'North Center and Lincoln Square, North Side',
    neighborhoods: ['North Center', 'Lincoln Square'],
    scale: 'Neighborhood',
    does: 'Runs a client-choice food pantry with groceries, produce and hot meals, plus social services case management.',
    short: 'Client-choice food pantry with hot meals',
    whyItMatters: 'The oldest food pantry in this guide, and a client-choice one: people pick their own groceries off the shelf, the way anyone shops. That leaves the decisions about a household’s food with the household. Assets grew from $483,000 to $4.3 million in five years without a deficit.',
    evidence: {
      claim: '950,990 pounds of food; 1,081 households served per month on average',
      period: '2025',
      strength: 'self-reported',
      source: 'https://www.commonpantry.org/'
    },
    vetting: {
      cnScore: 94, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/237136034',
      programExpenseRatio: 87.1, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2024', revenue: 3452339, expenses: 2462910, result: 989429 },
    flags: [],
    verified: '2026-09-25'
  },

  {
    id: 'cradles-to-crayons-chicago',
    name: 'Cradles to Crayons',
    aka: ['Cradles to Crayons Chicago'],
    ein: '04-3584367',
    entity: 'public-charity',
    deductible: true,
    entityNote: 'A national 501(c)(3) headquartered in Newton, Massachusetts, with a Chicago site. There is no separate Chicago entity, and every financial figure here is national.',
    homepage: 'https://www.cradlestocrayons.org/chicago/',
    donateUrl: 'https://www.cradlestocrayons.org/chicago/donate-now/',
    donateNote: 'The Chicago-designated giving page.',
    giftExample: { amount: 33, provides: 'serves one child head-to-toe', source: 'https://www.cradlestocrayons.org/' },
    volunteerUrl: 'https://www.cradlestocrayons.org/chicago/take-action/volunteer/',
    recurring: true,
    photo: null,
    founded: 2002,
    foundedNote: 'Founded 2002 in Boston; the Chicago site opened in October 2016.',
    primaryCause: 'food',
    causes: ['food', 'youth'],
    serviceArea: 'Chicagoland, through more than 70 drop-off sites',
    neighborhoods: [],
    scale: 'Regional',
    does: 'Collects new and used children’s clothing and essentials, sorts them at a warehouse, and distributes packages through social service partners.',
    short: 'Clothing and essentials for children, through social services',
    whyItMatters: 'Children outgrow coats faster than families can replace them, and there is no public program for that. Cradles to Crayons collects and redistributes the specific things a kid needs to show up at school looking like everyone else.',
    evidence: {
      claim: '803,071 packages distributed nationally, including 101,715 winter coats and 184,759 backpacks',
      period: 'FY2023, national',
      strength: 'self-reported',
      source: 'https://www.cradlestocrayons.org/chicago/'
    },
    vetting: {
      cnScore: 96, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2025',
      cnUrl: 'https://www.charitynavigator.org/ein/043584367',
      programExpenseRatio: 89.3, ratioBasis: 'three-year average', ratioYears: 'FY2023–FY2025'
    },
    financials: { fiscalYear: 'FY2025', revenue: 48850142, expenses: 50463522, result: -1613380 },
    flags: [
      { kind: 'entity', note: 'The Chicago site is part of the national organization, and all financial and rating data is national.', source: 'https://projects.propublica.org/nonprofits/organizations/43584367' },
      { kind: 'deficit', note: 'Two consecutive deficits: $0.99M in FY2024 and $1.61M in FY2025.', source: 'https://projects.propublica.org/nonprofits/organizations/43584367' },
      { kind: 'data-quality', note: 'No Chicago-only impact figure is published.', source: null }
    ],
    verified: '2026-09-25'
  },

  /* ----------------------------------------------------------- education --- */

  {
    id: 'literacy-chicago',
    name: 'Literacy Chicago',
    aka: [],
    ein: '36-2663174',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.literacychicago.org/',
    donateUrl: 'https://givebutter.com/supportliteracychicago',
    donateNote: 'Their /donate/ page loads this Givebutter form by script. This link goes to the campaign directly.',
    giftExample: { amount: 25, provides: 'provides reading and learning materials for five adult learners', source: 'https://literacychicago.org/donate/' },
    volunteerUrl: 'https://literacychicago.org/volunteer-with-literacy-chicago/',
    recurring: true,
    photo: null,
    founded: 1968,
    primaryCause: 'education',
    causes: ['education'],
    serviceArea: 'Chicagoland and Cook County',
    neighborhoods: [],
    scale: 'Regional',
    does: 'Teaches free adult literacy, ESL, GED preparation, citizenship preparation and digital literacy through classes and one-to-one tutoring.',
    short: 'Free adult literacy, ESL and GED classes',
    whyItMatters: 'Adult literacy draws less attention than any cause in this guide and is among the most consequential: reading a lease or a prescription label affects a whole household. Literacy Chicago has taught reading, English, GED prep and citizenship since 1968. Ninety percent of its money is government grants, which makes private gifts the part of the budget nobody can cut in a budget fight.',
    evidence: {
      claim: 'More than 100,000 lives impacted — a cumulative figure with no period attached; no annual number is published',
      period: 'cumulative, undated',
      strength: 'self-reported',
      source: 'https://www.literacychicago.org/'
    },
    vetting: {
      cnScore: 95, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2025',
      cnUrl: 'https://www.charitynavigator.org/ein/362663174',
      programExpenseRatio: 76.7, ratioBasis: 'three-year average', ratioYears: 'FY2022, FY2024, FY2025'
    },
    financials: { fiscalYear: 'FY2025', revenue: 897204, expenses: 705684, result: 191520 },
    flags: [
      { kind: 'link', note: 'Their donate page loads its Givebutter form by script. This link goes to the same campaign directly.', source: 'https://givebutter.com/supportliteracychicago' },
      { kind: 'data-quality', note: 'Publishes no annual learners-served figure, and the IRS ruling date on file is June 2024 despite a 1968 founding — a pattern that usually indicates reinstatement after a lapse.', source: 'https://projects.propublica.org/nonprofits/organizations/362663174' },
      { kind: 'funding-risk', note: '90% of revenue is government grants ($805,772 of $897,204).', source: 'https://projects.propublica.org/nonprofits/organizations/362663174' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'open-books',
    name: 'Open Books',
    aka: [],
    ein: '20-4830666',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.open-books.org/',
    donateUrl: 'https://openbooks.app.neoncrm.com/forms/website-donation',
    donateNote: null,
    giftExample: { amount: 30, provides: 'can buy up to 10 books for Chicago children', source: 'https://www.open-books.org/givebooks/' },
    volunteerUrl: 'https://www.open-books.org/volunteer/',
    recurring: true,
    photo: null,
    founded: 2006,
    primaryCause: 'education',
    causes: ['education'],
    serviceArea: 'South and West Sides; bookstores in Pilsen and the West Loop, a free program site in North Lawndale, plus a mobile store',
    neighborhoods: ['Pilsen', 'West Loop', 'North Lawndale'],
    scale: 'Citywide',
    does: 'Sells donated books through community bookstores and uses the proceeds to run K–12 literacy programming and give books away.',
    short: 'Bookstores that fund K–12 literacy programs',
    whyItMatters: 'A used-bookstore chain that funds its own literacy programming, which is an elegant model and a fragile one. It closed its Logan Square store in March citing financial trouble, and former staff have criticized how the terminations were handled. It is here because the South and West Side programs are real and the books reach kids — give with the uncertainty in view.',
    evidence: {
      claim: 'More than 46,981 students served and 1,370,944 books distributed',
      period: 'cumulative since 2006',
      strength: 'self-reported',
      source: 'https://www.open-books.org/impact/'
    },
    vetting: {
      cnScore: 96, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/204830666',
      programExpenseRatio: 82.0, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 3049522, expenses: 3451702, result: -402180 },
    flags: [
      { kind: 'deficit', note: 'A $402,000 deficit in FY2025 as revenue fell about 22%, to $3.05M; net assets dropped from $2.54M to $2.14M. It then closed its Logan Square store on 1 March 2026, citing financial challenges.', source: 'https://projects.propublica.org/nonprofits/organizations/204830666' },
      { kind: 'labor', note: 'Former Logan Square employees publicly criticized management over sudden terminations in March 2026.', source: 'https://blockclubchicago.org/2026/03/26/former-logan-square-open-books-employees-criticize-management-for-sudden-terminations/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'bernies-book-bank',
    name: 'Bernie’s Book Bank',
    aka: [],
    ein: '27-0914453',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.berniesbookbank.org/',
    donateUrl: 'https://www.berniesbookbank.org/donate/',
    donateNote: null,
    giftExample: { amount: 20, provides: 'provides 8 books a year to a child', source: 'https://www.berniesbookbank.org/our-impact/' },
    volunteerUrl: 'https://www.berniesbookbank.org/volunteer/',
    recurring: true,
    photo: null,
    founded: 2009,
    primaryCause: 'education',
    causes: ['education'],
    serviceArea: 'Chicagoland, Greater Milwaukee and the Florida Suncoast; headquartered in Lake Bluff',
    neighborhoods: [],
    scale: 'Multi-region',
    does: 'Sources and distributes free children’s books so that children from birth through sixth grade build home libraries.',
    short: 'Free books for kids, birth to sixth grade',
    whyItMatters: 'The only organization in this guide whose core claim rests on a five-year randomized controlled trial — children who received books gained about a quarter to a third of a typical school year’s reading growth, and those who stayed all five years gained half to two-thirds, at twenty dollars a child. That is a rate of return almost nothing else on this page can document. The catch is geographic: it is headquartered in Lake Bluff and serves three metro regions, so a Chicago dollar is not spent only in Chicago.',
    evidence: {
      claim: 'A five-year randomized controlled trial with Milwaukee Public Schools (2018–23), directed by Dr. Geoffrey Borman and funded by the Arnold Foundation, found statistically significant reading gains — about 25–32% of a typical school year’s growth across all students, and 52–65% among those who stayed in the same schools for all five years, at $20 per child per year',
      period: '2018–2023',
      strength: 'randomized-trial',
      source: 'https://www.berniesbookbank.org/our-impact/'
    },
    vetting: {
      cnScore: 95, cnStars: 4, beaconsComplete: 3, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/270914453',
      programExpenseRatio: 76.9, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 9463630, expenses: 6013621, result: 3450009 },
    flags: [
      { kind: 'entity', note: 'Headquartered in Lake County, outside Chicago, with chapters in Milwaukee and Florida.', source: 'https://www.berniesbookbank.org/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'chicago-public-library-foundation',
    name: 'Chicago Public Library Foundation',
    aka: ['CPLF'],
    ein: '36-3480353',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://cplfoundation.org/',
    donateUrl: 'https://secure3.convio.net/cplf/site/Donation2?mfc_pref=T&df_id=4861&4861.donation=form1',
    donateNote: 'The same form their homepage Donate button opens.',
    giftExample: null,
    volunteerUrl: null,
    recurring: true,
    photo: null,
    founded: 1986,
    primaryCause: 'education',
    causes: ['education'],
    serviceArea: 'Chicago — all 81 Chicago Public Library branches',
    neighborhoods: [],
    scale: 'Citywide',
    does: 'Raises private money for Chicago Public Library programs that tax dollars do not cover, including in-branch tutoring and digital access help.',
    short: 'Funds library programs taxes do not cover',
    whyItMatters: 'The library is the last free indoor public space in most neighborhoods. Tax dollars cover the building; the Foundation pays for the tutor inside it, and for the Digital Navigators who helped 24,000 Chicagoans get online last year. It also has the lowest program-expense ratio in this guide at 62 percent, which is a real mark against it and the reason for its three-star rating.',
    evidence: {
      claim: 'More than 33,000 free tutoring sessions through Teacher in the Library; more than 24,000 Chicagoans assisted by Digital Navigators',
      period: 'FY2025',
      strength: 'self-reported',
      source: 'https://empowereverychicagoan.org/'
    },
    vetting: {
      cnScore: 86, cnStars: 3, beaconsComplete: 3, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/363480353',
      programExpenseRatio: 62.3, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2024', revenue: 4556792, expenses: 5913603, result: -1356811 },
    flags: [
      { kind: 'deficit', note: 'FY2024 deficit of $1.36M, absorbed by $38.5M in net assets. Four consecutive deficits from FY2016 through FY2019.', source: 'https://projects.propublica.org/nonprofits/organizations/363480353' },
      { kind: 'data-quality', note: 'At 62%, the program-expense ratio is below Charity Navigator’s 70% threshold and is what holds the rating to three stars.', source: 'https://www.charitynavigator.org/ein/363480353' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'one-million-degrees',
    name: 'One Million Degrees',
    aka: ['Illinois Education Foundation'],
    ein: '42-1710230',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://onemilliondegrees.org/',
    donateUrl: 'https://onemilliondegrees.org/donate/',
    donateNote: null,
    giftExample: { amount: 100, provides: 'covers books for one course', source: 'https://onemilliondegrees.org/donate/' },
    volunteerUrl: 'https://onemilliondegrees.org/volunteer/',
    recurring: true,
    photo: null,
    founded: 2006,
    primaryCause: 'education',
    causes: ['education'],
    serviceArea: 'All seven City Colleges of Chicago campuses',
    neighborhoods: [],
    scale: 'Citywide',
    does: 'Provides academic coaching, financial support and professional mentoring to low-income community college students across City Colleges of Chicago.',
    short: 'Coaching and money for community college students',
    whyItMatters: 'Community college completion is where the American education promise breaks — most students who enroll never finish. One Million Degrees put its model through a randomized trial and the students it reached were meaningfully more likely to graduate. Note that its own homepage quotes a 73 percent figure applying to a narrow subgroup; the trial’s real numbers are smaller and still good.',
    evidence: {
      claim: 'A randomized trial by the University of Chicago Inclusive Economy Lab (three cohorts, 2016–18; 4,897 applicants, 2,573 offered places, 895 participated) found those offered the program 9% more likely to earn an associate degree within three years, and 18% more likely among those who enrolled. An eight-year follow-up in 2026 found participants 16% more likely to earn any degree',
      period: '2016–2018 cohorts',
      strength: 'randomized-trial',
      source: 'https://harris.uchicago.edu/news-events/news/uchicago-inclusive-economy-lab-finds-community-college-support-program'
    },
    vetting: {
      cnScore: 92, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/421710230',
      programExpenseRatio: 63.1, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 8447741, expenses: 10113398, result: -1665657 },
    flags: [
      { kind: 'data-quality', note: 'Their homepage’s “73% more likely to graduate” does not appear in the trial’s published results. The trial found its largest effects for students who applied while still in high school.', source: 'https://onemilliondegrees.org/' },
      { kind: 'deficit', note: 'Deficits of $1.39M in FY2024 and $1.67M in FY2025, following a FY2023 surplus of $19.2M — consistent with a planned spend-down during scale-up, with $22.9M in net assets. In April 2026 City Colleges announced a five-year expansion with more than $20M initial funding.', source: 'https://colleges.ccc.edu/2026/04/28/city-colleges-of-chicago-announces-five-year-expansion-of-partnership-with-one-million-degrees-to-scale-wraparound-support-to-reach-over-3000-students-annually/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'chicago-scholars',
    name: 'Chicago Scholars',
    aka: [],
    ein: '36-4117530',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.chicagoscholars.org/',
    donateUrl: 'https://chicagoscholars.donorsupport.co/page/DONATE',
    donateNote: 'Their published short link is a tracking stub; this is the durable campaign page.',
    giftExample: null,
    volunteerUrl: 'https://chicagoscholars.org/volunteer/',
    recurring: true,
    photo: null,
    founded: 1996,
    primaryCause: 'education',
    causes: ['education'],
    serviceArea: 'Chicago city limits; students from all 77 community areas',
    neighborhoods: [],
    scale: 'Citywide',
    does: 'Selects, trains and mentors first-generation Chicago high school students through college admission, graduation and into a first job.',
    short: 'Mentors first-generation students to college and career',
    whyItMatters: 'Chicago Scholars stays with first-generation students through college and into a first job, past the easier step of getting admitted. In a University of Chicago study, its Scholars finished college at a rate 10 points higher than matched CPS peers. It has also run three consecutive deficits totaling about $4.6 million, with no public explanation.',
    evidence: {
      claim: 'A University of Chicago Inclusive Economy Lab matched-comparison study of 3,569 Scholars found 55% graduated college within six years of high school, against 45% of matched CPS peers — 10 points higher, and 13 points higher for bachelor’s degrees. Its often-quoted 76% is the program’s own figure',
      period: '2009–2019 cohorts',
      strength: 'independent-study',
      source: 'https://urbanlabs.uchicago.edu/attachments/d2697652421158d63cd5660055720d719893a707/store/e537ad891b3dbbf9c938db216e8be4ce6977159c400d7f8e8db2bbf9c8fe/Chicago+Scholars+PSM+Report_vFINAL.pdf'
    },
    vetting: {
      cnScore: 93, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/364117530',
      programExpenseRatio: 71.8, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 4996476, expenses: 7572048, result: -2575572 },
    flags: [
      { kind: 'deficit', note: 'Three consecutive deficits: $987,000 in FY2023, $1.06M in FY2024 and $2.58M in FY2025, about $4.62M combined; net assets fell to $8.15M. Also consecutive in FY2019 and FY2020. No adverse news coverage was found; this comes from Form 990 data.', source: 'https://projects.propublica.org/nonprofits/organizations/364117530' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'after-school-matters',
    name: 'After School Matters',
    aka: ['ASM'],
    ein: '36-4409182',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.afterschoolmatters.org/',
    donateUrl: 'https://afterschoolmatters.org/donate/',
    donateNote: null,
    giftExample: { amount: 25, provides: 'a month provides one teen’s stipend for a pre-apprenticeship program', source: 'https://afterschoolmatters.org/teen-momentum-monthly/' },
    volunteerUrl: 'https://afterschoolmatters.org/volunteer-with-us/',
    recurring: true,
    photo: null,
    founded: 1991,
    foundedNote: 'Began as Gallery 37, a City of Chicago program; incorporated separately later.',
    primaryCause: 'education',
    causes: ['education', 'youth', 'jobs'],
    serviceArea: 'More than 350 program sites across Chicago',
    neighborhoods: [],
    scale: 'Citywide',
    does: 'Runs paid after-school and summer apprenticeships for teens at Chicago high schools in arts, STEM, sports and communications.',
    short: 'Paid after-school apprenticeships for high school teens',
    whyItMatters: 'Teenagers get paid to do the work — arts, STEM, sports, media — which reframes the whole thing from enrichment to employment. Seventeen thousand of them last year across 350 sites, at the highest program-expense ratio in this category. Its exposure is political: City and CPS money funds most of it, and both are under strain.',
    evidence: {
      claim: 'More than 17,000 teens served across 1,645 programs',
      period: 'FY2025',
      strength: 'self-reported',
      source: 'https://afterschoolmatters.org/our-impact-and-research/'
    },
    vetting: {
      cnScore: 100, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/364409182',
      programExpenseRatio: 83.2, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 48377490, expenses: 40876917, result: 7500573 },
    flags: [
      { kind: 'funding-risk', note: 'Heavily dependent on City of Chicago and CPS funding, both under 2026 budget strain. No cut specific to this organization was found.', source: null },
      { kind: 'data-quality', note: 'Their homepage says “nearly 20,000 teens annually” while the FY2025 impact page says more than 17,000. The FY2025 figure is the one tied to a year.', source: 'https://afterschoolmatters.org/our-impact-and-research/' }
    ],
    verified: '2026-09-25'
  },

  /* ------------------------------------------------------------- housing --- */

  {
    id: 'all-chicago',
    name: 'All Chicago Making Homelessness History',
    aka: ['All Chicago'],
    ein: '36-4272272',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://allchicago.org/',
    donateUrl: 'https://allchicago.org/donate',
    donateNote: 'A gateway page with several giving options. Avoid their donor portal link, which opens a login page with no give form.',
    giftExample: null,
    volunteerUrl: null,
    recurring: true,
    photo: null,
    founded: 2015,
    foundedNote: 'Formed in May 2015 from the merger of the Chicago Alliance to End Homelessness and the Emergency Fund, whose roots go back to 1973.',
    primaryCause: 'housing',
    causes: ['housing'],
    serviceArea: 'Chicago — lead agency for the Chicago Continuum of Care',
    neighborhoods: [],
    scale: 'Citywide',
    does: 'Coordinates Chicago’s homelessness response system and its data, and distributes emergency financial assistance to keep households housed.',
    short: 'Coordinates the homelessness response and emergency aid',
    whyItMatters: 'This is the coordinating layer for Chicago’s entire homelessness response, and its emergency fund pays the rent gap that turns a bad month into an eviction. Ninety-seven percent of spending reaches programs, the highest ratio in the housing section, and 99 percent of the households it assists are still housed three months later. It is also the pass-through for federal Continuum of Care money, which makes it the most exposed organization in this guide to the proposed HUD cuts.',
    evidence: {
      claim: '1,924 households served through emergency financial assistance, $5.88M distributed, 99% in stable housing after 90 days',
      period: '2025',
      strength: 'self-reported',
      source: 'https://allchicago.org/'
    },
    vetting: {
      cnScore: 89, cnStars: 3, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/364272272',
      programExpenseRatio: 96.8, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2024', revenue: 54915318, expenses: 54624829, result: 290489 },
    flags: [
      { kind: 'funding-risk', note: 'As the Continuum of Care lead agency it is the pass-through for federal homelessness funding, and HUD is weighing more than $60M in cuts that put an estimated 3,247 Chicagoans at risk. The FY2026 funding rules have since gone back and forth in court.', source: 'https://chicagohomeless.org/nofo26/' },
      { kind: 'deficit', note: 'FY2023 deficit of $1.3M, back to a small surplus in FY2024. Revenue swings between $54.9M and $115.5M year to year because government rental assistance passes through the books.', source: 'https://projects.propublica.org/nonprofits/organizations/364272272' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'chicago-coalition-to-end-homelessness',
    name: 'Chicago Coalition to End Homelessness',
    aka: ['Chicago Coalition for the Homeless', 'CCH'],
    ein: '36-3292607',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://chicagohomeless.org/',
    donateUrl: 'https://act.chicagohomeless.org/a/donate',
    donateNote: null,
    giftExample: null,
    volunteerUrl: null,
    recurring: true,
    photo: null,
    founded: 1980,
    primaryCause: 'housing',
    causes: ['housing', 'legal'],
    serviceArea: 'Chicago and statewide Illinois',
    neighborhoods: [],
    scale: 'Statewide',
    does: 'Organizes, lobbies and litigates on homelessness policy, and runs a legal aid project for people who are homeless. It runs no shelters or housing.',
    short: 'Homelessness policy, organizing and legal aid',
    whyItMatters: 'The coalition writes the bills, sues, and forces the counts that shelters and city agencies then argue over. If you think Chicago’s homelessness numbers are undercounted, this is the group that has made that case, publishing its own estimate that counts people doubled up with others. Surpluses every year for five years, which is unusual for an advocacy shop.',
    evidence: {
      claim: 'Law Project closed 404 cases for 343 clients, 48% of them aged 24 or under; $91,000 in emergency grants to 182 households',
      period: '2025',
      strength: 'self-reported',
      source: 'https://chicagohomeless.org/looking-back-at-the-last-year-highlights-from-2025/'
    },
    vetting: {
      cnScore: 97, cnStars: 4, beaconsComplete: 2, beaconsTotal: 4,
      cnFiscalYear: 'FY2025',
      cnUrl: 'https://www.charitynavigator.org/ein/363292607',
      programExpenseRatio: 86.2, ratioBasis: 'three-year average', ratioYears: 'FY2023–FY2025'
    },
    financials: { fiscalYear: 'FY2025', revenue: 6791042, expenses: 6664232, result: 126810 },
    flags: [
      { kind: 'entity', note: 'Renamed in 2024 from Chicago Coalition for the Homeless.', source: 'https://chicagohomeless.org/about/history-of-cch/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'la-casa-norte',
    name: 'La Casa Norte',
    aka: [],
    ein: '36-4041525',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.lacasanorte.org/',
    donateUrl: 'https://www.lacasanorte.org/donate',
    donateNote: null,
    giftExample: null,
    volunteerUrl: 'https://www.lacasanorte.org/volunteer',
    recurring: true,
    photo: null,
    founded: 2002,
    foundedNote: 'The organization dates its operations to 2002; its IRS ruling date is 1997, unexplained.',
    primaryCause: 'housing',
    causes: ['housing', 'youth'],
    serviceArea: 'Humboldt Park, Logan Square, Back of the Yards and Brighton Park',
    neighborhoods: ['Humboldt Park', 'Logan Square', 'Back of the Yards', 'Brighton Park'],
    scale: 'Multi-neighborhood',
    does: 'Runs youth drop-in centers, emergency shelter and housing from short-term through permanent supportive, for young people and families who are homeless.',
    short: 'Shelter and housing for homeless youth and families',
    whyItMatters: 'Youth homelessness is mostly hidden: young people tend to couch-surf, which keeps them out of the counts. La Casa Norte built drop-in centers, shelter and permanent housing around that reality across four West and South Side neighborhoods. Charity Navigator has a profile for it but no rating, so you are giving without that particular check available.',
    evidence: {
      claim: 'More than 24,000 clients served, up from 5,000 in 2019',
      period: '2025',
      strength: 'self-reported',
      source: 'https://www.lacasanorte.org/faq'
    },
    vetting: {
      cnScore: null, cnStars: null, beaconsComplete: 0, beaconsTotal: 4,
      cnFiscalYear: null,
      cnUrl: 'https://www.charitynavigator.org/ein/364041525',
      programExpenseRatio: null, ratioBasis: null, ratioYears: null
    },
    financials: { fiscalYear: 'FY2024', revenue: 10569794, expenses: 21044609, result: -10474815 },
    flags: [
      { kind: 'funding-risk', note: '66% of 2025 revenue ($6.07M of $9.23M) came from government grants.', source: 'https://app.fac.gov/dissemination/report/pdf/2025-12-GSAFAC-0000428860' },
      { kind: 'entity', note: 'Listed by Charity Navigator but unrated, so no score, star rating or program-expense ratio exists for it.', source: 'https://www.charitynavigator.org/ein/364041525' },
      { kind: 'deficit', note: 'Its FY2024 Form 990 shows a $10.47M deficit and negative net assets of $789,000. The audited consolidated statements explain it as the unwinding of a New Markets Tax Credit financing, in which $12.5M of notes were forgiven: consolidated results were a $5.27M surplus in 2024 and a $403,000 deficit in 2025, with $15.3M in net assets and a clean audit. Earlier deficits were small: $263,000 in FY2022 and $33,000 in FY2023.', source: 'https://projects.propublica.org/nonprofits/organizations/364041525' },
      { kind: 'data-quality', note: 'Their headline figure is not defined, and a fivefold rise in six years suggests a broad counting definition, so it cannot be compared to other organizations’ counts.', source: 'https://www.lacasanorte.org/faq' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'the-night-ministry',
    name: 'The Night Ministry',
    aka: [],
    ein: '36-3145764',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.thenightministry.org/',
    donateUrl: 'https://thenightministry.org/give/',
    donateNote: null,
    giftExample: null,
    volunteerUrl: 'https://thenightministry.org/support/',
    recurring: true,
    photo: null,
    founded: 1976,
    primaryCause: 'housing',
    causes: ['housing', 'health'],
    serviceArea: 'Chicago — citywide overnight street outreach and mobile health',
    neighborhoods: [],
    scale: 'Citywide',
    does: 'Runs overnight street outreach, mobile street medicine and youth shelter and housing for people who are unhoused.',
    short: 'Overnight outreach, street medicine and youth shelter',
    whyItMatters: 'Two things nobody else does at this hour: a bus that finds people where they already are, and a nurse on it. Street medicine is the only form of healthcare that reaches someone who will not, or cannot, walk into a clinic. It ran a small deficit in FY2025 after years of surpluses, and its program-expense ratio is the thinnest in this category.',
    evidence: {
      claim: '4,569 individuals received resources; 45,921 meals distributed; 2,902 health assessments',
      period: 'stated as “the past year” — no fiscal year given',
      strength: 'self-reported',
      source: 'https://www.thenightministry.org/'
    },
    vetting: {
      cnScore: 95, cnStars: 4, beaconsComplete: 2, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/363145764',
      programExpenseRatio: 71.0, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 10607790, expenses: 10844388, result: -236598 },
    flags: [
      { kind: 'deficit', note: 'A $237,000 deficit in FY2025, as revenue fell from $12.06M in FY2023 to $10.61M.', source: 'https://projects.propublica.org/nonprofits/organizations/363145764' },
      { kind: 'data-quality', note: 'Impact figures are given as “the past year” with no fiscal year attached.', source: 'https://www.thenightministry.org/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'deborahs-place',
    name: 'Deborah’s Place',
    aka: [],
    ein: '36-3382973',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.deborahsplace.org/',
    donateUrl: 'https://www.deborahsplace.org/donate-2/',
    donateNote: null,
    giftExample: { amount: 100, provides: 'can buy CTA transit cards for 20 women to get to work, school or medical appointments', source: 'https://www.deborahsplace.org/donate-2/' },
    volunteerUrl: 'https://www.deborahsplace.org/volunteer/',
    recurring: true,
    photo: null,
    founded: 1985,
    primaryCause: 'housing',
    causes: ['housing', 'women'],
    serviceArea: 'Chicago — two program sites plus more than 200 housing units citywide',
    neighborhoods: [],
    scale: 'Citywide',
    does: 'Chicago’s largest provider of permanent supportive housing for unaccompanied women who are homeless, plus interim housing and support services.',
    short: 'Supportive housing for women who are homeless',
    whyItMatters: 'The only organization in this guide built specifically for women who are homeless alone: without children, and so outside most of the family shelter system. Ninety-two percent of residents stay housed. Charity Navigator scores it 98 with three of its four beacons assessed, the best result among the four organizations here checked that far. Its CEO has said publicly that the proposed 30 percent federal cap on permanent-housing funds would force evictions at two of its buildings, which is what the funding fight looks like at the level of a named address.',
    evidence: {
      claim: '688 women served, 92% of residents maintained stable housing; City Bureau independently describes it as serving nearly 700 a year',
      period: 'FY2025',
      strength: 'self-reported',
      source: 'https://www.deborahsplace.org/'
    },
    vetting: {
      cnScore: 98, cnStars: 4, beaconsComplete: 3, beaconsTotal: 4,
      cnFiscalYear: 'FY2025',
      cnUrl: 'https://www.charitynavigator.org/ein/363382973',
      programExpenseRatio: 77.0, ratioBasis: 'three-year average', ratioYears: 'FY2023–FY2025'
    },
    financials: { fiscalYear: 'FY2025', revenue: 7685834, expenses: 6811760, result: 874074 },
    flags: [
      { kind: 'funding-risk', note: 'Its CEO has said on the record that a proposed federal 30% cap on HUD permanent-housing funds would force evictions at two of its buildings, including The Conservatory Apartments, home to 34 women.', source: 'https://www.citybureau.org/newswire/2026/8/27/perfect-storm-federal-cuts-threaten-gold-standard-of-homeless-services-in-chicago' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'breakthrough',
    name: 'Breakthrough',
    aka: ['Breakthrough Urban Ministries'],
    ein: '36-3810926',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://breakthrough.org/',
    donateUrl: 'https://breakthrough.org/donate-to-breakthrough/',
    donateNote: 'Their /give link redirects to an unverifiable page. This is the ways-to-give page; the working form sits at breakthrough.my.salesforce-sites.com.',
    giftExample: { amount: 25, provides: 'sponsors a day of breakfast, lunch and dinner for people experiencing homelessness', source: 'https://gifts.breakthrough.org/products/feed-a-friend' },
    volunteerUrl: 'https://breakthrough.org/volunteer/',
    recurring: true,
    photo: null,
    founded: 1992,
    primaryCause: 'housing',
    causes: ['housing', 'youth', 'food'],
    serviceArea: 'East Garfield Park — a defined stretch of roughly 40 blocks',
    neighborhoods: ['East Garfield Park'],
    scale: 'Neighborhood',
    does: 'Runs men’s and women’s shelters, transitional and family housing, a fresh food market, youth education, behavioral health and violence prevention in one neighborhood.',
    short: 'Shelter, housing and services in one neighborhood',
    whyItMatters: 'Everything in one forty-block stretch of East Garfield Park: shelters, housing, a fresh-food market, schools programming, behavioral health. The bet is that concentration beats coverage — that fixing one neighborhood thoroughly does more than touching twenty lightly. Its claim of a 26 percent drop in local shootings has no published study behind it, so judge it on the model and set that number aside.',
    evidence: {
      claim: '1,727 individuals served through housing programs; 1,291 students in education and youth development',
      period: 'most recent year reported',
      strength: 'self-reported',
      source: 'https://breakthrough.org/'
    },
    vetting: {
      cnScore: 90, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2025',
      cnUrl: 'https://www.charitynavigator.org/ein/363810926',
      programExpenseRatio: 89.3, ratioBasis: 'three-year average', ratioYears: 'FY2023–FY2025'
    },
    financials: { fiscalYear: 'FY2025', revenue: 19132325, expenses: 13968539, result: 5163786 },
    flags: [
      { kind: 'link', note: 'Their /give link redirects to a Salesforce page that could not be verified. Use the ways-to-give page.', source: 'https://breakthrough.org/donate-to-breakthrough/' },
      { kind: 'data-quality', note: 'Their claim of a 26% two-year reduction in East Garfield Park shooting victimizations has no locatable underlying study.', source: 'https://breakthrough.org/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'franciscan-outreach',
    name: 'Franciscan Outreach',
    aka: [],
    ein: '36-2928835',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://franoutreach.org/',
    donateUrl: 'https://wl.donorperfect.net/weblink/weblink.aspx?name=E358209&id=6',
    donateNote: 'Their published link redirects; this is the final working form.',
    giftExample: { amount: 500, provides: 'sponsors a shelter bed for a year', source: 'https://franoutreach.org/sponsor-a-bed/' },
    volunteerUrl: 'https://franoutreach.org/volunteering/',
    recurring: true,
    photo: null,
    founded: 1963,
    foundedNote: 'Founded 1963; incorporated as a nonprofit in 1976.',
    primaryCause: 'housing',
    causes: ['housing', 'food'],
    serviceArea: 'North Lawndale, East Garfield Park and Pilsen',
    neighborhoods: ['North Lawndale', 'East Garfield Park', 'Pilsen'],
    scale: 'Multi-neighborhood',
    does: 'Operates interim shelters on the West and Southwest Sides, with meal service and case management aimed at moving guests into permanent housing.',
    short: 'Interim shelters, meals and case management',
    whyItMatters: 'Interim shelters on the West and Southwest Sides, with 263,000 meals and 99,000 shelter nights in 2023. This is the unglamorous end of the system, the beds that exist so nobody sleeps outside tonight, before anyone gets to talk about permanent housing. No consecutive deficits in five years.',
    evidence: {
      claim: '2,755 guests supported, 263,093 meals served, 99,188 shelter nights',
      period: '2023',
      strength: 'self-reported',
      source: 'https://friars.us/article/2024/02/29/all-are-welcome-at-franciscan-outreach-in-chicago'
    },
    vetting: {
      cnScore: 90, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/362928835',
      programExpenseRatio: 79.2, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2024', revenue: 7037782, expenses: 6732742, result: 305040 },
    flags: [
      { kind: 'audit', note: 'Its federal single audits for FY2024 and FY2025 both report a material weakness in internal controls.', source: 'https://projects.propublica.org/nonprofits/organizations/362928835' },
      { kind: 'data-quality', note: 'Their published impact figures come from a Franciscan province outlet, an affiliated source.', source: 'https://friars.us/article/2024/02/29/all-are-welcome-at-franciscan-outreach-in-chicago' }
    ],
    verified: '2026-09-25'
  },

  /* --------------------------------------------------------------- legal --- */

  {
    id: 'national-immigrant-justice-center',
    name: 'National Immigrant Justice Center',
    aka: ['NIJC'],
    ein: '93-3878636',
    entity: 'public-charity',
    deductible: true,
    entityNote: 'Separated from Heartland Alliance in April 2024 and now operates as an independent 501(c)(3) with a new EIN. Any record pointing at a Heartland Alliance EIN is out of date.',
    homepage: 'https://immigrantjustice.org/',
    donateUrl: 'https://immigrantjustice.salsalabs.org/donate-26/index.html',
    donateNote: 'Their /donate link redirects to this form.',
    giftExample: { amount: 50, provides: 'provides a legal consultation by phone', source: 'https://immigrantjustice.org/' },
    volunteerUrl: 'https://immigrantjustice.org/ways-to-help/be-a-pro-bono-attorney/',
    recurring: true,
    photo: { w: 1280, h: 720, caption: 'Claudia Valenzuela of NIJC’s Detention Project at a rally against family separation, 2018', alt: 'A woman speaks into a microphone at an outdoor rally, with people holding protest signs behind her.', artist: 'Charles Edward Miller', license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Claudia_Valenzuela_Detention_Project_Director_National_Immigrant_Justice_Center_Stop_Separating_Immigrant_Families_Press_Conference_and_Rally_Chicago_Illinois_6-5-18_1932_(40823546870).jpg' },
    founded: 1984,
    foundedNote: 'Founded 1984 as a Heartland Alliance program; independent since April 2024.',
    primaryCause: 'legal',
    causes: ['legal'],
    serviceArea: 'Chicago headquarters, serving clients nationally',
    neighborhoods: [],
    scale: 'National',
    does: 'Provides direct legal representation to immigrants, refugees and asylum seekers, including detained people and unaccompanied children, alongside policy advocacy and impact litigation.',
    short: 'Legal representation for immigrants and asylum seekers',
    whyItMatters: 'Deportation is the only major American legal process where you can lose everything without a lawyer, because there is no right to appointed counsel. NIJC provides one at scale — more than 10,000 people last year, multiplied by 2,600 pro bono attorneys. It spun out of Heartland Alliance in 2024, which is why Charity Navigator has not rated it; the blank score reflects only the entity’s age.',
    evidence: {
      claim: 'More than 10,100 people reached through legal services, 1,971 new cases opened, 2,202 people granted legal relief, with 2,600 pro bono volunteers donating 66,000 hours',
      period: 'FY2025',
      strength: 'self-reported',
      source: 'https://immigrantjustice.org/blog/fy2025-nijc-impact-report/'
    },
    vetting: {
      cnScore: null, cnStars: null, beaconsComplete: 0, beaconsTotal: 4,
      cnFiscalYear: null,
      cnUrl: 'https://www.charitynavigator.org/ein/933878636',
      programExpenseRatio: null, ratioBasis: null, ratioYears: null
    },
    financials: { fiscalYear: 'FY2025', revenue: 22135576, expenses: 16263505, result: 5872071 },
    flags: [
      { kind: 'entity', note: 'Unrated only because the entity is new. Two Form 990s are on file, for FY2024 and FY2025. Its former parent, Heartland Alliance, announced in 2024 that it would spin off all four divisions and decide its own future afterward, citing a severe cash flow problem — do not give to Heartland Alliance expecting it to reach NIJC.', source: 'https://chicago.suntimes.com/business/2024/04/04/heartland-alliance-to-spin-off-divisions-separate-entities-nonprofit-healthcare-migrant-services' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'the-resurrection-project',
    name: 'The Resurrection Project',
    aka: ['TRP'],
    ein: '36-3576073',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://resurrectionproject.org/',
    donateUrl: 'https://pro.gofundme.com/give/391084',
    donateNote: 'Their own /donate/ page loads its form by script. This is the working checkout.',
    giftExample: null,
    volunteerUrl: 'https://www.trpimmigrantjustice.org/volunteer',
    recurring: true,
    photo: null,
    founded: 1990,
    primaryCause: 'legal',
    causes: ['legal', 'housing'],
    serviceArea: 'Pilsen and surrounding neighborhoods, with some programming statewide',
    neighborhoods: ['Pilsen'],
    scale: 'Neighborhood',
    does: 'Develops and manages affordable housing, and provides immigration legal services, financial wellness counseling and homeownership support.',
    short: 'Affordable housing and immigration legal services',
    whyItMatters: 'The Resurrection Project has bought and built affordable housing in Pilsen since 1990, and adds immigration legal services and homeownership counseling. The unusual part is that all of it sits in one organization, so a family is not handed off between four. Nearly 98 percent of spending reaches programs. It also ran two consecutive deficits of roughly $5.8 million combined in 2021 and 2022, and at two stars it shares the lowest rating in this guide with Institute for Nonviolence Chicago.',
    evidence: {
      claim: '$1.05 billion in community wealth created or preserved',
      period: 'cumulative since 1990',
      strength: 'self-reported',
      source: 'https://resurrectionproject.org/'
    },
    vetting: {
      cnScore: 72, cnStars: 2, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/363576073',
      programExpenseRatio: 97.9, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2024', revenue: 45532789, expenses: 44788674, result: 744115 },
    flags: [
      { kind: 'link', note: 'Their own /donate/ page shows only a button that loads the form by script. This checkout is the working one.', source: 'https://pro.gofundme.com/give/391084' },
      { kind: 'deficit', note: 'Two consecutive deficits: $2.08M in FY2021 and $3.76M in FY2022. Recovered to a $744,000 surplus in FY2024, but Charity Navigator’s financial health sub-score is 0.50 and the overall rating is two stars, tied for the lowest here.', source: 'https://www.charitynavigator.org/ein/363576073' },
      { kind: 'funding-risk', note: 'Signed an April 2026 letter opposing the Justice Department’s dismantling of the Recognition and Accreditation program, which allows non-attorney immigration representation — a risk to how it delivers legal services.', source: 'https://www.wbez.org/immigration/2026/04/30/illinois-advocacy-groups-department-justice-gutting-legal-aid-services-low-income-immigrants' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'legal-aid-chicago',
    name: 'Legal Aid Chicago',
    aka: ['LAF', 'Legal Assistance Foundation of Metropolitan Chicago'],
    ein: '36-2754650',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://legalaidchicago.org/',
    donateUrl: 'https://legalaidchicago.org/donate/',
    donateNote: null,
    giftExample: null,
    volunteerUrl: 'https://legalaidchicago.org/get-involved/volunteer-opportunities/',
    recurring: true,
    photo: null,
    founded: 1966,
    primaryCause: 'legal',
    causes: ['legal', 'housing'],
    serviceArea: 'Chicago and suburban Cook County',
    neighborhoods: [],
    scale: 'Countywide',
    does: 'Provides free civil legal representation to people in poverty — eviction defense, healthcare and public benefits, consumer debt, employment, immigration and domestic violence protection.',
    short: 'Free civil legal help for people in poverty',
    whyItMatters: 'Eviction court moves faster than tenants can learn the rules, and most landlords arrive with counsel while most tenants do not. Legal Aid Chicago is the largest free civil legal provider in Cook County — 13,700 matters last year at a 93 percent success rate. Their reported $31.8 million in client financial impact is the rare nonprofit figure that translates directly into rent not owed and benefits not lost.',
    evidence: {
      claim: 'More than 13,700 legal matters handled and $31,785,000 in total client financial impact, at a success rate above 93%, with 206 attorneys and staff',
      period: '2025',
      strength: 'self-reported',
      source: 'https://legalaidchicago.org/'
    },
    vetting: {
      cnScore: 91, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/362754650',
      programExpenseRatio: 81.1, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2024', revenue: 30608311, expenses: 25748577, result: 4859734 },
    flags: [
      { kind: 'entity', note: 'Renamed in 2019 from LAF, previously the Legal Assistance Foundation of Metropolitan Chicago. Same entity and EIN throughout.', source: 'http://www.lawndalenews.com/2019/06/laf-changes-name-to-legal-aid-chicago/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'invisible-institute',
    name: 'Invisible Institute',
    aka: [],
    ein: '47-3551981',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://invisible.institute/',
    donateUrl: 'https://invisible.institute/donate',
    donateNote: null,
    giftExample: null,
    volunteerUrl: null,
    recurring: true,
    photo: { w: 1280, h: 720, caption: 'The Invisible Institute’s storefront newsroom, 2022', alt: 'A white door marked Coffee and Newsroom in the brick storefront of the Invisible Institute.', artist: 'Gabriela Tumani, News21', license: 'CC BY 3.0 US', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/us/', source: 'https://commons.wikimedia.org/wiki/File:Invisible_Institute.jpg' },
    founded: 2014,
    foundedNote: 'Incorporated after the 2014 Kalven v. Chicago ruling that forced disclosure of police misconduct files.',
    primaryCause: 'legal',
    causes: ['legal'],
    serviceArea: 'Chicago South Side; statewide through Illinois Police Data and nationally through the National Police Index',
    neighborhoods: ['Woodlawn'],
    scale: 'Citywide',
    does: 'Produces investigative journalism on police accountability and builds public databases of police misconduct records.',
    short: 'Police accountability journalism and public records',
    whyItMatters: 'Three Pulitzer Prizes in four years, from a team of about a dozen people on the South Side, for reporting on police misconduct and missing persons cases nobody else was doing. It credits its 2016 Code of Silence investigation with the overturning of more than 212 Cook County convictions. This is journalism as public infrastructure, and it exists only because a court forced those records into daylight in the first place.',
    evidence: {
      claim: 'Three Pulitzer Prizes in four years — 2024 Local Reporting for Missing in Chicago with City Bureau, 2024 Audio Reporting for You Didn’t See Nothin’, and 2021 National Reporting for Mauled with The Marshall Project, AL.com and IndyStar. More than 212 Cook County convictions were overturned following its 2016 Code of Silence investigation',
      period: '2021–2024',
      strength: 'self-reported',
      source: 'https://chicago.suntimes.com/news/2024/05/06/city-bureau-invisible-institute-win-pulitzer-prize-for-series-on-missing-persons-cases-in-chicago'
    },
    vetting: {
      cnScore: 97, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/473551981',
      programExpenseRatio: 71.7, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 3086331, expenses: 1988176, result: 1098155 },
    flags: [],
    verified: '2026-09-25'
  },

  {
    id: 'chicago-votes-education-fund',
    name: 'Chicago Votes Education Fund',
    aka: ['Chicago Votes'],
    ein: '46-0545127',
    entity: 'public-charity',
    deductible: true,
    entityNote: 'Chicago Votes runs two entities. This is the tax-deductible 501(c)(3). The site most people land on, chicagovotes.com, funds the 501(c)(4) Action Fund, where gifts are not deductible.',
    homepage: 'https://chicagovotesedfund.com/',
    donateUrl: 'https://chicagovotesedfund.com/donate/',
    donateNote: 'Use the bare domain — the www variant fails TLS.',
    giftExample: null,
    volunteerUrl: null,
    recurring: true,
    photo: null,
    founded: null,
    foundedNote: 'Neither site states a founding year. Its first Form 990 covers tax year 2012.',
    primaryCause: 'legal',
    causes: ['legal'],
    serviceArea: 'Chicago and Cook County, with legislative work statewide',
    neighborhoods: [],
    scale: 'Statewide',
    does: 'Registers and educates young and incarcerated voters, and lobbies for Illinois election law reform.',
    short: 'Registers young and incarcerated voters',
    whyItMatters: 'They made Cook County Jail the first jail-based polling place in the country, then registered more than 11,000 people inside it. The argument is simple: losing your liberty before trial does not cost you your vote, and until 2019 it effectively did.',
    evidence: {
      claim: 'More than 11,000 new voters registered in Cook County Jail since September 2017; their 2019 bill SB 2090 made the jail the first jail-based polling place in the United States',
      period: '2017–2025',
      strength: 'self-reported',
      source: 'https://chicagovotes.com/unlock-civics/'
    },
    vetting: {
      cnScore: 92, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/460545127',
      programExpenseRatio: 77.8, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2024', revenue: 2174240, expenses: 1460661, result: 713579 },
    flags: [
      { kind: 'entity', note: 'Two entities share the name. The 501(c)(4) Chicago Votes Action Fund (EIN 46-3873520) is not tax-deductible and is not listed in this guide as a charity.', source: 'https://chicagovotes.com/donate/' },
      { kind: 'deficit', note: 'Two consecutive deficits: $770,000 in FY2022 and $218,000 in FY2023, recovered to a $714,000 surplus in FY2024.', source: 'https://projects.propublica.org/nonprofits/organizations/460545127' }
    ],
    verified: '2026-09-25'
  },

  /* --------------------------------------------------------------- youth --- */

  {
    id: 'chicago-cred',
    name: 'Chicago CRED',
    aka: ['Creating Real Economic Destiny'],
    ein: '81-3130448',
    entity: 'private-operating-foundation',
    deductible: true,
    entityNote: 'A 501(c)(3) private operating foundation filing Form 990-PF. Deduction limits differ from a public charity’s, so check with a tax adviser if that matters to you. Charity Navigator does not rate private foundations.',
    homepage: 'https://www.chicagocred.org/',
    donateUrl: 'https://secure.givelively.org/donate/chicago-cred-inc',
    donateNote: null,
    giftExample: null,
    volunteerUrl: null,
    recurring: null,
    photo: null,
    founded: 2016,
    foundedNote: 'Founded in 2016 by Emerson Collective with Arne Duncan.',
    primaryCause: 'youth',
    causes: ['youth', 'jobs'],
    serviceArea: 'Roseland, North Lawndale, West Garfield Park and Englewood',
    neighborhoods: ['Roseland', 'North Lawndale', 'West Garfield Park', 'Englewood'],
    scale: 'Multi-neighborhood',
    does: 'Provides 18 to 24 months of paid street outreach engagement, cognitive behavioral therapy, education and job training to men and women at highest risk of shooting or being shot.',
    short: 'Outreach, therapy and jobs for those at highest risk',
    whyItMatters: 'Some of the strongest evidence in Chicago gun violence work short of a randomized trial: men who finished the full two-year program were 73 percent less likely to be arrested for a violent crime, in a Northwestern study published in PNAS. It pays participants while they are in it, which is the part that makes the rest possible. It also ran a $10.2 million deficit in FY2024.',
    evidence: {
      claim: 'Participants who completed the full 24-month program were more than 73% less likely to be arrested for a violent crime in the two years following enrollment, though their rate of being shot was statistically unchanged. Bayesian survival analysis of 324 participants against roughly 2,500 comparison men, led by Andrew Papachristos at Northwestern, published in PNAS on 6 November 2023. The design is quasi-experimental, one tier below a randomized trial',
      period: 'participants enrolled 2016–2021',
      strength: 'independent-study',
      source: 'https://news.northwestern.edu/stories/2023/11/chicago-community-violence-intervention-program-shown-to-reduce-gun-violence'
    },
    vetting: {
      cnScore: null, cnStars: null, beaconsComplete: 0, beaconsTotal: 4,
      cnFiscalYear: null,
      cnUrl: 'https://www.charitynavigator.org/ein/813130448',
      programExpenseRatio: null, ratioBasis: null, ratioYears: null
    },
    financials: { fiscalYear: 'FY2024', revenue: 26073803, expenses: 36314414, result: -10240611 },
    flags: [
      { kind: 'entity', note: 'A private operating foundation. Gifts go to Chicago Cred Inc. under its own EIN, with no fiscal sponsor, and Emerson Collective does not receive them.', source: 'https://projects.propublica.org/nonprofits/organizations/813130448' },
      { kind: 'deficit', note: 'FY2024 deficit of $10.24M, on record-high expenses against sharply lower revenue. Consecutive deficits in FY2021 and FY2022, then a large FY2023 surplus.', source: 'https://projects.propublica.org/nonprofits/organizations/813130448' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'institute-for-nonviolence-chicago',
    name: 'Institute for Nonviolence Chicago',
    aka: ['INVC'],
    ein: '81-1098722',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.nonviolencechicago.org/',
    donateUrl: 'https://www.nonviolencechicago.org/donate',
    donateNote: 'The payment widget loads by script and could not be confirmed by fetch — worth a click before you rely on it.',
    giftExample: null,
    volunteerUrl: 'https://www.nonviolencechicago.org/get-involved',
    recurring: true,
    photo: null,
    // The note says the payment form could not be confirmed; the row says so too.
    donateConfirmed: false,
    founded: 2016,
    foundedNote: 'Founded in 2016 by Teny Gross, after the murder of Laquan McDonald.',
    primaryCause: 'youth',
    causes: ['youth'],
    serviceArea: 'Austin, West Garfield Park, Back of the Yards and parts of Brighton Park',
    neighborhoods: ['Austin', 'West Garfield Park', 'Back of the Yards', 'Brighton Park'],
    scale: 'Multi-neighborhood',
    does: 'Runs street outreach, violence interruption and conflict mediation, with victim support, reentry, workforce readiness and behavioral health services.',
    short: 'Street outreach and violence interruption',
    whyItMatters: 'Violence interruption is the work of knowing who is about to shoot whom and getting there first, which requires people the street trusts more than it trusts police. INVC does that in four neighborhoods and spends 93 percent of its money on programs. Its outcome numbers are its own, published without a method, and note that 99.7 percent of revenue is contributions — a fragile way to fund anything.',
    evidence: {
      claim: 'Shootings down 17% in Austin and West Garfield Park and 42% in Back of the Yards; 1,307 participants and 197 mediations',
      period: '2025',
      strength: 'self-reported',
      source: 'https://www.nonviolencechicago.org/our-impact'
    },
    vetting: {
      cnScore: 72, cnStars: 2, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/811098722',
      programExpenseRatio: 92.9, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 15883895, expenses: 15749475, result: 134420 },
    flags: [
      { kind: 'data-quality', note: 'Their homepage figures (reductions of 72%, 48% and 74%; 4,070 participants) are cumulative since 2016, self-reported and published without a method. The 2025 figures above come from their impact page.', source: 'https://www.nonviolencechicago.org/our-impact' },
      { kind: 'funding-risk', note: 'Contributions are 99.7% of revenue, which is severe funder concentration.', source: 'https://projects.propublica.org/nonprofits/organizations/811098722' },
      { kind: 'deficit', note: 'Three consecutive deficits FY2022 through FY2024, all small, returning to surplus in FY2025.', source: 'https://projects.propublica.org/nonprofits/organizations/811098722' },
      { kind: 'entity', note: 'Receives subgrants from Metropolitan Family Services, also listed in this guide. Giving to both funds some of the same outreach twice.', source: 'https://www.metrofamily.org/cp4p/cp4p-info/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'youth-guidance',
    name: 'Youth Guidance',
    aka: ['Becoming A Man', 'BAM'],
    ein: '36-2167032',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.youth-guidance.org/',
    donateUrl: 'https://give.youth-guidance.org/give/609306',
    donateNote: 'The Chicago-designated campaign. Other cities have separate ones.',
    giftExample: null,
    volunteerUrl: null,
    recurring: true,
    photo: { w: 1280, h: 720, caption: 'Youth Guidance’s Project Prepare at the Bud Billiken Parade, 2015', alt: 'Marchers hold up a green Project Prepare, Youth Guidance sign and a WOW sign at the Bud Billiken Parade.', artist: 'Daniel X. O’Neil', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Project_Prepare_Youth_Guidance_at_the_Bud_Billiken_Parade_2015_(20242903040).jpg' },
    founded: 1924,
    foundedNote: 'Founded in 1924 as the Church Mission of Help.',
    primaryCause: 'youth',
    causes: ['youth', 'education'],
    serviceArea: 'Chicago headquarters, plus seven other cities',
    neighborhoods: [],
    scale: 'Multi-region',
    does: 'Places counselors and clinicians inside public schools to run group cognitive behavioral programs — Becoming A Man for boys, Working on Womanhood for girls.',
    short: 'School counseling programs, including Becoming A Man',
    whyItMatters: 'Becoming A Man has the best evidence of anything in this guide: four randomized controlled trials that pool to a reduction of up to 37 percent in violent-crime arrests, at a benefit-cost ratio between two and ten to one. It works by putting counselors inside schools during the school day, so the kids who need it most do not have to opt in. The hard part is three consecutive and worsening deficits totaling about $17.7 million, followed by a city funding cut in late 2025 — the largest financial question in this guide.',
    evidence: {
      claim: 'Four randomized controlled trials by the University of Chicago Crime Lab. The first (2008–09) found violent crime arrests down 45% and on-time graduation up 19% (Heller et al., Quarterly Journal of Economics; NBER working paper 21178); the second (2013–15) found 50%; the third and fourth showed the challenges of expanding it. Pooled across all four, up to a 37% reduction in violent crime arrests, with a benefit-cost ratio between 2:1 and 10:1',
      period: 'four studies, 2008–09 onward',
      strength: 'randomized-trial',
      source: 'https://crimelab.uchicago.edu/projects/becoming-a-man-bam/'
    },
    vetting: {
      cnScore: 95, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2025',
      cnUrl: 'https://www.charitynavigator.org/ein/362167032',
      programExpenseRatio: 82.0, ratioBasis: 'three-year average', ratioYears: 'FY2023–FY2025'
    },
    financials: { fiscalYear: 'FY2025', revenue: 44260936, expenses: 54716820, result: -10455884 },
    flags: [
      { kind: 'funding-risk', note: 'In November 2025 the city cut mentoring funding from $9.5M to $4.6M and made school-based group counseling such as Becoming A Man and Working on Womanhood ineligible for city funds, affecting about 1,400 students at 33 schools from January 2026.', source: 'https://chicago.suntimes.com/city-hall/2025/11/20/mayor-brandon-johnson-corporate-head-tax-youth-program-cuts-become-a-man-working-on-womanhood' },
      { kind: 'deficit', note: 'Three consecutive and worsening deficits — $655,000 in FY2023, $6.61M in FY2024 and $10.46M in FY2025, roughly $17.7M cumulative. Revenue fell from $58.99M in FY2022 to $44.26M in FY2025 while expenses peaked at $56.1M in FY2024. No reporting of layoffs or leadership change was found and the cause is not public.', source: 'https://projects.propublica.org/nonprofits/organizations/362167032' },
      { kind: 'entity', note: 'Operates in eight cities. The donation link above designates Chicago.', source: 'https://www.youth-guidance.org/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'cara-collective',
    name: 'Cara Collective',
    aka: ['Cara Program', 'Cara Chicago', 'Cleanslate'],
    ein: '36-4268095',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://caracollective.org/',
    donateUrl: 'https://caracollective.org/donate/',
    donateNote: 'No online payment form could be confirmed on this page. Giving by phone at 312-798-3331 works.',
    giftExample: { amount: 20, provides: 'buys a one-week CTA pass to keep a job seeker on the move', source: 'https://caracollective.org/donate/' },
    volunteerUrl: 'https://caracollective.org/volunteer/',
    recurring: true,
    photo: null,
    donateConfirmed: false,
    founded: 1991,
    primaryCause: 'jobs',
    causes: ['jobs'],
    serviceArea: 'Chicago; its employer-partnership arm operates nationally',
    neighborhoods: [],
    scale: 'Citywide',
    does: 'Provides job readiness training, transitional employment through its own staffing business, and permanent placement with retention coaching for people facing barriers to work.',
    short: 'Job training and placement for people facing barriers',
    whyItMatters: 'A staffing business and a job-training program inside one organization, so participants work for real wages before they interview anywhere else. Seventy-five percent are still with the same employer a year later, and retention is the number that shows a placement held. Surpluses in most recent years, and reserves of about 1.3 years of expenses.',
    evidence: {
      claim: '18,526 jobs placed since 1991, with a 75% one-year same-employer retention rate and $16.1M in total annual participant earnings',
      period: 'as of FY2026',
      strength: 'self-reported',
      source: 'https://caracollective.org/'
    },
    vetting: {
      cnScore: 100, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2025',
      cnUrl: 'https://www.charitynavigator.org/ein/364268095',
      programExpenseRatio: 75.1, ratioBasis: 'three-year average', ratioYears: 'FY2023–FY2025'
    },
    financials: { fiscalYear: 'FY2025', revenue: 20870682, expenses: 16565889, result: 4304793 },
    flags: [
      { kind: 'link', note: 'No giving-platform script was detected on their donate page and its own Donate button points back at itself. Use the phone number if the page does not work.', source: 'https://caracollective.org/donate/' },
      { kind: 'entity', note: 'Renamed from Cara Program, which remains the IRS legal name. Now an umbrella over Cara, Cleanslate and Cara Plus.', source: 'https://caracollective.org/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'metropolitan-family-services',
    name: 'Metropolitan Family Services',
    aka: ['MFS', 'Communities Partnering 4 Peace', 'CP4P'],
    ein: '36-2167940',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.metrofamily.org/',
    donateUrl: 'https://www.metrofamily.org/donate/',
    donateNote: null,
    giftExample: null,
    volunteerUrl: 'https://www.metrofamily.org/get-involved/volunteer/',
    recurring: true,
    photo: null,
    founded: 1857,
    primaryCause: 'youth',
    causes: ['youth', 'legal', 'health'],
    serviceArea: 'Chicago, DuPage County, Evanston and Skokie and the southwest suburbs; its violence intervention network covers 27 Chicago community areas',
    neighborhoods: ['Austin', 'Humboldt Park', 'East Garfield Park', 'West Garfield Park', 'North Lawndale', 'Little Village', 'Back of the Yards', 'Englewood', 'Roseland', 'South Shore', 'South Chicago', 'Auburn Gresham', 'Chatham', 'Chicago Lawn', 'Woodlawn'],
    scale: 'Regional',
    does: 'Delivers education, economic stability, mental health and legal services across the Chicago region, and coordinates the Communities Partnering 4 Peace violence intervention network.',
    short: 'Family services and violence intervention region-wide',
    whyItMatters: 'A hundred and sixty-nine years old, $180 million a year, and the coordinator of violence intervention across 27 Chicago community areas. A gift here funds a whole system of programs, which brings reach and also distance from any one of them.',
    evidence: {
      claim: 'More than 200,000 families and individuals served annually with more than 1,100 staff; 81% of those served are working poor or lower-middle class. No outcome metrics specific to the violence intervention network are published',
      period: 'annual, most recent reported',
      strength: 'self-reported',
      source: 'https://www.metrofamily.org/about-us/'
    },
    vetting: {
      cnScore: 100, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/362167940',
      programExpenseRatio: 87.7, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 180243830, expenses: 177850691, result: 2393139 },
    flags: [
      { kind: 'entity', note: 'Its violence intervention network subgrants to Institute for Nonviolence Chicago and Breakthrough, both listed separately here, as well as New Life Centers, UCAN and Project H.O.O.D. Giving to both funds some of the same outreach twice.', source: 'https://www.metrofamily.org/cp4p/cp4p-info/' },
      { kind: 'data-quality', note: 'No outcome measures are published for the violence intervention network itself. The widely quoted 73% figure from the 2023 PNAS study belongs to Chicago CRED, a different organization.', source: 'https://www.metrofamily.org/cp4p/cp4p-info/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'chicago-childrens-advocacy-center',
    name: 'Chicago Children’s Advocacy Center',
    aka: ['ChicagoCAC'],
    ein: '36-4251865',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.chicagocac.org/',
    donateUrl: 'https://www.chicagocac.org/donate/',
    donateNote: null,
    giftExample: null,
    volunteerUrl: 'https://www.chicagocac.org/get-involved/volunteer/',
    recurring: true,
    photo: null,
    founded: 2001,
    primaryCause: 'youth',
    causes: ['youth', 'health'],
    serviceArea: 'City of Chicago — its main center, plus CAN Hope in East Garfield Park for adult survivors, opened October 2025',
    neighborhoods: [],
    scale: 'Citywide',
    does: 'Co-locates child protection investigators, police, family advocates, medical experts and mental health clinicians in one building so abused children are interviewed and treated once, in one place.',
    short: 'One place where abused children get help',
    whyItMatters: 'Before this existed, a child who had been abused told the story to an investigator, then a detective, then a doctor, then a prosecutor. ChicagoCAC put all of them in one building so the child tells it once. Twenty-two hundred children a year. It ran five consecutive deficits through FY2024 before a sharp reversal, and the reversal’s cause is not public.',
    evidence: {
      claim: 'More than 2,200 children served per year, and more than 50,000 since opening in 2001',
      period: 'annual, most recent reported',
      strength: 'self-reported',
      source: 'https://www.chicagocac.org/'
    },
    vetting: {
      cnScore: 93, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/364251865',
      programExpenseRatio: 77.1, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 12363348, expenses: 10486537, result: 1876811 },
    flags: [
      { kind: 'deficit', note: 'Five consecutive deficits from FY2020 through FY2024, about $2.27M cumulative on a roughly $8M budget, then a sharp reversal to a $1.88M surplus in FY2025 on a revenue jump. The cause of the reversal is not public, so do not assume it recurs.', source: 'https://projects.propublica.org/nonprofits/organizations/364251865' }
    ],
    verified: '2026-09-25'
  },

  /* -------------------------------------------------------------- health --- */

  {
    id: 'howard-brown-health',
    name: 'Howard Brown Health',
    aka: ['Howard Brown Health Center'],
    ein: '36-2894128',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://howardbrown.org/',
    donateUrl: 'https://donate.howardbrown.org/campaign/550045/donate',
    donateNote: null,
    giftExample: null,
    volunteerUrl: 'https://howardbrown.org/get-involved/volunteer/',
    recurring: true,
    photo: { w: 1280, h: 720, caption: 'Howard Brown Health’s float in the Chicago Pride Parade, 2007', alt: 'People wave from a flower-covered Howard Brown Health float in the Pride Parade.', artist: 'Richie Diesterheft', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Howard_Brown_Health_Clinic_Float_(623153499).jpg' },
    founded: 1974,
    primaryCause: 'health',
    causes: ['health'],
    serviceArea: 'Chicago — seven clinics on the North, West and South Sides',
    neighborhoods: ['Uptown', 'Lakeview', 'Rogers Park', 'Englewood', 'Hyde Park'],
    scale: 'Citywide',
    does: 'A federally qualified health center providing primary medical, dental, behavioral health and HIV care, with a focus on LGBTQ+ patients, regardless of ability to pay.',
    short: 'Health center focused on LGBTQ+ patients',
    whyItMatters: 'Half a century of providing care to LGBTQ+ Chicagoans, much of it during years when nobody else would, now serving 47,000 patients across seven clinics regardless of ability to pay. The record also includes two rounds of layoffs, a three-day strike, a labor board finding of unfair labor practices, and a $1.1 million settlement with 55 laid-off workers. Both of those things are true, and a donor should see the second before deciding the first outweighs it.',
    evidence: {
      claim: '46,961 patients served',
      period: 'FY2023',
      strength: 'self-reported',
      source: 'https://howardbrown.org/'
    },
    vetting: {
      cnScore: 96, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/362894128',
      programExpenseRatio: 87.9, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 217487912, expenses: 206296710, result: 11191202 },
    flags: [
      { kind: 'labor', note: 'December 2022: 65 positions cut, citing a $12M shortfall. January 2023: roughly 440 employees struck for three days. July 2023: the National Labor Relations Board found unfair labor practices. May 2024: a contract was ratified after the CEO resigned, and two clinics closed. July 2024: 43 more layoffs, about 7% of staff, which the interim CEO described as the third consecutive year of an operating shortfall. November 2024: a $1.108M NLRB settlement covering 55 laid-off workers. A new CEO was named in February 2025 and no labor actions have been found since.', source: 'https://chicago.suntimes.com/health/2024/11/22/howard-brown-nlrb-settlement-layoffs-workers-back-pay' },
      { kind: 'deficit', note: 'FY2024 deficit of about $4.9M after three to four years of management-described operating shortfalls, then an $11.2M surplus in FY2025, with $130.6M in net assets. No going-concern warning. Down from 11 locations in 2019 to seven.', source: 'https://projects.propublica.org/nonprofits/organizations/362894128' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'erie-family-health-centers',
    name: 'Erie Family Health Centers',
    aka: [],
    ein: '36-3088628',
    entity: 'public-charity',
    deductible: true,
    entityNote: 'A separately incorporated Erie Family Health Foundation also exists (EIN 81-4172423). This entry and its donation link point at the Centers.',
    homepage: 'https://www.eriefamilyhealth.org/',
    donateUrl: 'https://www.eriefamilyhealth.org/donate/',
    donateNote: null,
    giftExample: null,
    volunteerUrl: null,
    recurring: true,
    photo: null,
    founded: 1957,
    primaryCause: 'health',
    causes: ['health'],
    serviceArea: '14 health centers from Chicago’s West Side to Waukegan, across Cook and Lake counties',
    neighborhoods: ['West Town', 'Humboldt Park', 'North Lawndale'],
    scale: 'Regional',
    does: 'A federally qualified health center network providing primary medical, dental and behavioral healthcare regardless of ability to pay, including five school-based clinics.',
    short: 'Community health centers, regardless of ability to pay',
    whyItMatters: 'Fourteen clinics from the West Side to Waukegan, 95,000 patients, 90 percent of them low-income, and no deficit year since 2019. Federally qualified health centers are the safety net for people without insurance.',
    evidence: {
      claim: 'More than 95,000 patients annually across 14 sites; 71% of patients Hispanic and 90% low-income',
      period: 'annual, most recent reported',
      strength: 'self-reported',
      source: 'https://www.eriefamilyhealth.org/'
    },
    vetting: {
      cnScore: 95, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/363088628',
      programExpenseRatio: 86.2, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 132295957, expenses: 122117456, result: 10178501 },
    flags: [
      { kind: 'incident', note: 'A breach of its network from 10 December 2025 to 27 January 2026 exposed patient data including Social Security numbers and medical records. Notices went to up to 570,000 people from May 2026.', source: 'https://www.hipaajournal.com/erie-family-health-centers-data-breach/' },
      { kind: 'entity', note: 'Do not confuse with the separately incorporated Erie Family Health Foundation.', source: 'https://projects.propublica.org/nonprofits/organizations/363088628' }
    ],
    verified: '2026-09-25'
  },

  /* --------------------------------------------------------------- women --- */

  {
    id: 'chicago-foundation-for-women',
    name: 'Chicago Foundation for Women',
    aka: ['CFW'],
    ein: '36-3348160',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.cfw.org/',
    donateUrl: 'https://www.cfw.org/donate/',
    donateNote: null,
    giftExample: null,
    volunteerUrl: null,
    recurring: true,
    photo: null,
    founded: 1985,
    primaryCause: 'women',
    causes: ['women'],
    serviceArea: 'The Chicago region, with giving circles across the North Side, South Side, West Side and western suburbs',
    neighborhoods: [],
    scale: 'Regional',
    does: 'Raises money and regrants it to Chicago-area organizations working on economic security, freedom from violence, health and reproductive justice for women, girls and gender-expansive people.',
    short: 'Grants to groups serving women and girls',
    whyItMatters: 'A regrantor, which means it does the diligence on small organizations you would never find yourself and moves money to them — $55 million across 5,500 grants since 1985. The tradeoff is a layer of remove between your gift and the work. Its single-year program ratio dropped from 88 to 77 percent in FY2024, a real drop, and one to watch.',
    evidence: {
      claim: 'More than $55 million invested through more than 5,500 grants',
      period: 'cumulative since 1985',
      strength: 'self-reported',
      source: 'https://www.cfw.org/about/'
    },
    vetting: {
      cnScore: 100, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/363348160',
      programExpenseRatio: 85.2, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 3266968, expenses: 6513632, result: -3246664 },
    flags: [
      { kind: 'deficit', note: 'A $3.25M deficit in FY2025 as revenue fell 52%, to $3.27M. Net assets held at about $24.1M, so it can absorb this, but it is a large gap.', source: 'https://projects.propublica.org/nonprofits/organizations/363348160' },
      { kind: 'data-quality', note: 'The single-year program-expense ratio fell to 76.7% in FY2024 from 87.9% in FY2023 — a real move behind the three-year average. No recent single-year grantmaking total is published.', source: 'https://www.charitynavigator.org/ein/363348160' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'apna-ghar',
    name: 'Apna Ghar',
    aka: ['Our Home'],
    ein: '36-3698770',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://apnaghar.org/',
    donateUrl: 'https://apnaghar.networkforgood.com/projects/31230-apna-ghar-donation-page',
    donateNote: null,
    giftExample: { amount: 100, provides: 'underwrites an hour of supervised visitation', source: 'https://apnaghar.org/maximize-your-impact/' },
    volunteerUrl: null,
    recurring: true,
    photo: null,
    founded: 1989,
    foundedNote: 'Founded 1989 by five Asian American activists, incorporated 1990, IRS ruling 1995 — all three dates differ.',
    primaryCause: 'women',
    causes: ['women', 'legal'],
    serviceArea: 'Uptown main office, plus Skokie and a South Side office; clients from more than 50 countries, services in more than 20 languages',
    neighborhoods: ['Uptown', 'Skokie'],
    scale: 'Regional',
    does: 'Runs a 24-hour crisis line, emergency and transitional housing, counseling, and legal and medical advocacy for immigrant survivors of gender-based violence.',
    short: 'Crisis support for immigrant survivors of violence',
    whyItMatters: 'A domestic violence shelter is only usable if you can be understood inside it. Apna Ghar operates in more than twenty languages for survivors from fifty-plus countries, which is why it exists separately from the larger providers. It publishes no annual report and no yearly service figures, so the operating record here is thinner than anywhere else in this guide, and half its revenue is government money.',
    evidence: {
      claim: 'More than 100,000 survivors and community members served and more than 50,000 hotline calls — cumulative counters over 30-plus years. No annual service figure is published anywhere',
      period: 'cumulative, undated',
      strength: 'self-reported',
      source: 'https://apnaghar.org/'
    },
    vetting: {
      cnScore: 97, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/363698770',
      programExpenseRatio: 78.9, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 5919637, expenses: 5129981, result: 789656 },
    flags: [
      { kind: 'data-quality', note: 'Publishes no annual report and no yearly service figures; the audited statements contain no program statistics. Treat any per-year number as unverified.', source: 'https://apnaghar.org/' },
      { kind: 'funding-risk', note: '52.3% of revenue is government funding, a concentration risk their own auditor flags.', source: 'https://apnaghar.org/wp-content/uploads/2025/08/Apna-Ghar-Inc.-FY-24-Audited-Financial-Statements-2.pdf' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'cawc',
    name: 'Connections for Abused Women and their Children',
    aka: ['CAWC', 'Chicago Abused Women Coalition'],
    ein: '36-2950380',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.cawc.org/',
    donateUrl: 'https://www.cawc.org/donate/',
    donateNote: null,
    giftExample: { amount: 25, provides: 'provides a week’s worth of diapers for a parent arriving at Greenhouse Shelter', source: 'https://www.cawc.org/wishlist/' },
    volunteerUrl: 'https://www.cawc.org/volunteer/',
    recurring: true,
    photo: null,
    founded: 1977,
    primaryCause: 'women',
    causes: ['women', 'housing'],
    serviceArea: 'Chicago — the Greenhouse Shelter, Humboldt Park outreach, crisis intervention at Stroger and Northwestern Memorial, and services at Haymarket Center',
    neighborhoods: ['Humboldt Park'],
    scale: 'Citywide',
    does: 'Runs a 24-hour hotline, emergency shelter, counseling, and hospital- and court-based advocacy for survivors of domestic violence and their children.',
    short: 'Hotline, shelter and advocacy for domestic violence survivors',
    whyItMatters: 'Nineteen thousand nights of safe refuge, plus advocates based at Stroger and Northwestern Memorial hospitals — the place where an injury is often the first disclosure. Its After Hours Court Program filed 1,216 orders of protection, the legal protection that makes it safer to leave. Its program-expense ratio has slid to about 64 percent, below the usual benchmark, and its own website still cites a budget less than half its actual size.',
    evidence: {
      claim: '1,334 adults and children received counseling and support; more than 19,000 nights of safe refuge; 4,085 community members reached through training; 1,216 orders of protection filed through the After Hours Court Program',
      period: '2024',
      strength: 'self-reported',
      source: 'https://www.cawc.org/about/'
    },
    vetting: {
      cnScore: 95, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/362950380',
      programExpenseRatio: 72.5, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 4223023, expenses: 5271988, result: -1048965 },
    flags: [
      { kind: 'deficit', note: 'A $1.05M deficit in FY2025 as revenue fell to $4.22M from $5.38M the year before.', source: 'https://projects.propublica.org/nonprofits/organizations/362950380' },
      { kind: 'data-quality', note: 'The single-year program-expense ratio fell from 79% in FY2022 to 67.7% in FY2024 and about 64% in FY2025, below the usual 70% benchmark. Its homepage also states an operating budget of about $2.1M, roughly 40% of actual FY2025 expenses of $5.27M.', source: 'https://www.cawc.org/wp-content/uploads/2026/06/CAWC-Annual-Report-FY-24-25_FINAL.pdf' },
      { kind: 'entity', note: 'Renamed in 2008 from Chicago Abused Women Coalition, keeping the acronym.', source: 'https://www.cawc.org/' }
    ],
    verified: '2026-09-25'
  },

  /* --------------------------------------------------------- environment --- */

  {
    id: 'friends-of-the-chicago-river',
    name: 'Friends of the Chicago River',
    aka: ['Friends'],
    ein: '36-3559764',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.chicagoriver.org/',
    donateUrl: 'https://wl.donorperfect.net/weblink/weblink.aspx?name=E145588&id=139',
    donateNote: 'Their published link redirects; this is the final working form.',
    giftExample: null,
    volunteerUrl: 'https://www.chicagoriver.org/get-involved/volunteer',
    recurring: true,
    photo: { w: 1280, h: 720, caption: 'Friends of the Chicago River canoes on the North Branch at River Park, 2019', alt: 'Aluminum canoes marked Friends of the Chicago River pulled up on the bank of the North Branch.', artist: 'Raed Mansour', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Friends_of_the_Chicago_River_Canoes,_North_Branch_Chicago_River,_River_Park,_Chicago_(48622275851).jpg' },
    founded: 1979,
    primaryCause: 'environment',
    causes: ['environment'],
    serviceArea: 'The 156-mile Chicago-Calumet river system and its watershed',
    neighborhoods: [],
    scale: 'Regional',
    does: 'The only organization dedicated solely to the Chicago-Calumet river system, running volunteer cleanups, habitat restoration, water quality advocacy and public education.',
    short: 'Cleanups and restoration for the Chicago River',
    whyItMatters: 'The river was an industrial sewer within living memory and is now healthier than at any time in 150 years, which happened because a small organization has refused to let it go since 1979. Three thousand volunteers at 92 sites in a single day in May 2025. It also ran four consecutive deficits before barely clearing even in FY2025 — the smallest financial cushion of anything in this guide.',
    evidence: {
      claim: 'Roughly 3,000 volunteers at a record 92 sites for the 33rd annual Chicago River Day, May 2025, as reported by CBS News Chicago',
      period: 'May 2025',
      strength: 'self-reported',
      source: 'https://www.cbsnews.com/chicago/news/chicago-river-day-litter-cleanup-2025'
    },
    vetting: {
      cnScore: 93, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2025',
      cnUrl: 'https://www.charitynavigator.org/ein/363559764',
      programExpenseRatio: 80.5, ratioBasis: 'three-year average', ratioYears: 'FY2023–FY2025'
    },
    financials: { fiscalYear: 'FY2025', revenue: 2530514, expenses: 2508550, result: 21964 },
    flags: [
      { kind: 'deficit', note: 'Four consecutive deficit years, FY2021 through FY2024 — $24,000, $306,000, $41,000 and $348,000 — before recovering to a $21,964 surplus in FY2025. The smallest financial cushion in this guide.', source: 'https://projects.propublica.org/nonprofits/organizations/363559764' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'openlands',
    name: 'Openlands',
    aka: [],
    ein: '36-2649603',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://openlands.org/',
    donateUrl: 'https://form-renderer-app.donorperfect.io/give/openlands/online-donation-form',
    donateNote: 'Both of their donate paths load by script. This is the only one whose host is unambiguously a payment service — click-test it first.',
    giftExample: null,
    volunteerUrl: 'https://openlands.org/volunteer/',
    recurring: true,
    photo: null,
    donateConfirmed: false,
    founded: 1963,
    primaryCause: 'environment',
    causes: ['environment'],
    serviceArea: 'The greater Chicago region and northeastern Illinois, extending into Indiana and Wisconsin',
    neighborhoods: [],
    scale: 'Regional',
    does: 'Acquires and protects open space, restores natural areas, plants and stewards urban trees, and builds green schoolyards across the Chicago region.',
    short: 'Protects open space and plants urban trees',
    whyItMatters: 'Land conservation in a metro area means buying the thing before someone else builds on it, which is expensive, unglamorous and permanent. Openlands has protected more than 71,000 acres since 1963 and transferred 161 of them to a federal wildlife refuge last year. The 2023 deficit on its books comes from a gift: it gave away a 72-acre preserve and $1.36 million on purpose.',
    evidence: {
      claim: '161 acres transferred to the U.S. Fish and Wildlife Service for Hackmatack National Wildlife Refuge; 41 schools with green schoolyards; more than 1,300 acres under restoration at Midewin. Its Land Trust Alliance accreditation is an independent third-party credential',
      period: 'FY2025',
      strength: 'self-reported',
      source: 'https://openlands.org/accountabilty-impact/annual-report-2025/'
    },
    vetting: {
      cnScore: 96, cnStars: 4, beaconsComplete: 3, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/362649603',
      programExpenseRatio: 82.9, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2025', revenue: 11496900, expenses: 7659942, result: 3836958 },
    flags: [
      { kind: 'link', note: 'Both donate paths are script-driven and neither could be confirmed to render a payment field. Click-test before relying on it.', source: 'https://openlands.org/' },
      { kind: 'deficit', note: 'The apparent FY2023 deficit of $2.82M reflects the deliberate donation of the 71.55-acre Openlands Lakeshore Preserve plus about $1.36M to the Lake County Forest Preserves, completed 30 August 2023.', source: 'https://openlands.org/2023/08/31/openlands-completes-the-transfer-to-donate-the-of-openlands-lakeshore-preserve-to-the-lake-county-forest-preserves/' }
    ],
    verified: '2026-09-25'
  },

  {
    id: 'urban-growers-collective',
    name: 'Urban Growers Collective',
    aka: ['UGC'],
    ein: '82-3336616',
    entity: 'public-charity',
    deductible: true,
    entityNote: null,
    homepage: 'https://www.urbangrowerscollective.org/',
    donateUrl: 'https://www.urbangrowerscollective.org/make-a-donation',
    donateNote: 'This page links out to a Keela donation form that loads by script.',
    giftExample: null,
    volunteerUrl: 'https://www.urbangrowerscollective.org/tour-and-volunteer',
    recurring: true,
    photo: null,
    founded: 2017,
    foundedNote: 'Founded 2017 by Erika Allen and Laurell Sims. Sims stepped down in February 2024; Allen is now sole CEO.',
    primaryCause: 'environment',
    causes: ['environment', 'food', 'youth', 'jobs'],
    serviceArea: 'South and West Sides — eight urban farms across 11 acres, a 30-acre farm in Chicago Heights and nine acres at the Green Era Campus',
    neighborhoods: ['South Chicago', 'Bronzeville', 'Washington Park', 'Chicago Heights'],
    scale: 'Multi-neighborhood',
    does: 'Operates urban farms that grow and distribute fresh produce, runs paid youth employment and farmer training, and operates the Fresh Moves Mobile Market.',
    short: 'Urban farms, youth jobs and a mobile market',
    whyItMatters: 'Eight farms on the South and West Sides, which is a food access project and a jobs project at once — 205 teenagers were paid to grow food last year. The produce figure is modest next to a food bank’s, and the project measures itself by who controls the growing. Revenue dipped after pandemic relief ended and has since recovered, but the program ratio has drifted below the usual benchmark.',
    evidence: {
      claim: 'More than 28,000 pounds of produce harvested and distributed; 205 Chicago youth aged 14 to 19 employed through Youth Corps; 10 urban agriculture interns',
      period: '2025',
      strength: 'self-reported',
      source: 'https://www.urbangrowerscollective.org/'
    },
    vetting: {
      cnScore: 91, cnStars: 4, beaconsComplete: 1, beaconsTotal: 4,
      cnFiscalYear: 'FY2024',
      cnUrl: 'https://www.charitynavigator.org/ein/823336616',
      programExpenseRatio: 72.6, ratioBasis: 'three-year average', ratioYears: 'FY2022–FY2024'
    },
    financials: { fiscalYear: 'FY2024', revenue: 4700891, expenses: 4324050, result: 376841 },
    flags: [
      { kind: 'deficit', note: 'A $1.12M deficit in FY2023 after revenue fell 36% from a pandemic-relief peak of $4.43M in FY2021, recovered to a $377,000 surplus in FY2024.', source: 'https://projects.propublica.org/nonprofits/organizations/823336616' },
      { kind: 'data-quality', note: 'Their Our Story page says “over 23,000 lbs each year”, a figure their impact page dates to the 2023 season; 2025 was 28,000 pounds. The dated figure is used here. The single-year program ratio was 69.1% in FY2024, below the usual benchmark.', source: 'https://www.urbangrowerscollective.org/' }
    ],
    verified: '2026-09-25'
  }

];
