// Show up in person: public, in-person events and shifts run by charities on
// this list. Every date, time and place is the charity's own, read on its site
// or its official sign-up page. Never guess a date from last year's event; an
// annual event goes in only once this year's date is published.
// start/end: the days shown. until: the last day to keep it listed, if later.
// signup: registration is required.

export const EVENTS_CHECKED = '2026-09-25';

const CV = (id) => `https://www.cervistech.com/acts/webreg/eventdetail.php?org_id=0254&event_id=${id}`;

export const EVENTS = [
  { org: 'openlands', start: '2026-09-26', title: 'Plant trees at Wentworth Gardens', time: '8:30 a.m.–1 p.m.', place: '3770 S. Wentworth Ave., Armour Square', url: CV(3249), signup: true },
  { org: 'friends-of-the-chicago-river', start: '2026-09-26', title: 'Stewardship workday at Canal Origins Park', time: '10 a.m.–noon', place: '2701 S. Ashland Ave., McKinley Park', url: 'https://www.chicagoriver.org/events/canal-origins-park-stewardship-workday', signup: false },
  { org: 'openlands', start: '2026-09-26', title: 'Mulch the trails at Palmisano Park', time: '10 a.m.–1 p.m.', place: 'Palmisano Park, Bridgeport', url: CV(3218), signup: true },
  { org: 'openlands', start: '2026-09-28', title: 'Prune and haul brush in Humboldt Park', time: '9 a.m.–noon', place: 'Humboldt Park, north of Augusta and east of Kedzie', url: CV(3260), signup: true },
  { org: 'openlands', start: '2026-09-29', title: 'Community tree care day in North Lawndale', time: '10 a.m.–1 p.m.', place: '16th Street, North Lawndale', url: CV(3203), signup: true },
  { org: 'openlands', start: '2026-10-01', title: 'Plant trees at Abraxas Youth & Family Services', time: '8:30 a.m.–1 p.m.', place: '5701 S. Wood St., West Englewood', url: CV(3272), signup: true },
  { org: 'openlands', start: '2026-10-07', title: 'Community tree care day on California Boulevard', time: '9 a.m.–noon', place: 'California Blvd., Little Village', url: CV(2901), signup: true },
  { org: 'openlands', start: '2026-10-07', title: 'Prune street trees at Hollywood Park', time: '9 a.m.–noon', place: 'Thorndale and Jersey, North Park', url: CV(3254), signup: true },
  { org: 'cawc', start: '2026-10-10', title: 'March and Rally to End Domestic Violence', time: '10 a.m.', place: '2510 N. California Ave., Logan Square', url: 'https://www.cawc.org/march-and-rally/', signup: true },
  { org: 'urban-growers-collective', start: '2026-10-10', title: 'Harvest Fest at the South Chicago farm', time: '11 a.m.–3 p.m., free', place: '9000 S. Mackinaw Ave., South Chicago', url: 'https://www.eventbrite.com/e/harvest-fest-2026-tickets-1999700131925', signup: true },
  { org: 'openlands', start: '2026-10-11', title: 'Prune trees at Mozart Park', time: '10 a.m.–1 p.m.', place: 'Mozart Park, 2036 N. Avers Ave.', url: CV(3269), signup: true },
  { org: 'chicago-scholars', start: '2026-10-13', until: '2026-10-15', title: 'Coach students at Interview Labs', time: '5:30–7:30 p.m., also Oct. 15', place: '141 W. Jackson Blvd., the Loop', url: 'https://chicagoscholars.org/volunteer/', signup: true },
  { org: 'cradles-to-crayons-chicago', start: '2026-10-13', title: 'Giving Factory @ Night: pack kids’ essentials', time: '6–7:30 p.m.', place: '2500 W. Bradley Pl.', url: 'https://www.cradlestocrayons.org/chicago/event-calendar/', signup: true },
  { org: 'openlands', start: '2026-10-17', title: 'Prune trees at Ravenswood Manor Park', time: '9 a.m.–noon', place: '4643 N. Manor Ave., Albany Park', url: CV(3264), signup: true },
  { org: 'chicago-scholars', start: '2026-10-30', title: 'Volunteer at the College & Leadership Forum', time: 'Shifts from 6:30 a.m. to 6 p.m.', place: 'Marriott Magnificent Mile, 540 N. Michigan Ave.', url: 'https://chicagoscholars.org/volunteer/', signup: true },
  { org: 'openlands', start: '2026-10-31', title: 'Plant trees in Irving Park', time: '8:30 a.m.–1 p.m.', place: '3807 N. Avers Ave., Irving Park', url: CV(3247), signup: true },
  { org: 'breakthrough', start: '2026-11-07', title: 'Family Volunteer Day', time: '9:30–11 a.m., $25 per family', place: 'FamilyPlex, 3219 W. Carroll Ave., East Garfield Park', url: 'https://breakthrough.my.site.com/events/s/event-detail?eventId=a7wUs0000002ZeP', signup: true },
  { org: 'cradles-to-crayons-chicago', start: '2026-11-10', title: 'Giving Factory @ Night: pack kids’ essentials', time: '6–7:30 p.m.', place: '2500 W. Bradley Pl.', url: 'https://www.cradlestocrayons.org/chicago/event-calendar/', signup: true },
  { org: 'openlands', start: '2026-11-11', title: 'Community tree care day at Chicago State University', time: '9 a.m.–noon', place: 'Chicago State University, Roseland', url: CV(2900), signup: true },
  { org: 'cradles-to-crayons-chicago', start: '2026-12-08', title: 'Giving Factory @ Night: pack kids’ essentials', time: '6–7:30 p.m.', place: '2500 W. Bradley Pl.', url: 'https://www.cradlestocrayons.org/chicago/event-calendar/', signup: true },
  { org: 'la-casa-norte', start: '2026-12-10', title: 'Volunteer Impact Day', time: '10 a.m.–2 p.m.', place: 'Location shared when you sign up', url: 'https://www.lacasanorte.org/volunteer', signup: true },
  { org: 'friends-of-the-chicago-river', start: '2027-05-08', title: 'Chicago-Calumet River Day cleanup', time: 'Sign-up opens closer to the day', place: 'Dozens of sites along the rivers', url: 'https://www.chicagoriver.org/get-involved/volunteer/chicago-river-day', signup: false }
];

export const STANDING = [
  { org: 'greater-chicago-food-depository', what: 'repack food for pantries; Saturday family days for ages 5 and up', when: 'Tuesday–Saturday', place: 'The Food Depository’s warehouse, Southwest Side', url: 'https://volunteers.chicagosfoodbank.org/' },
  { org: 'care-for-real', what: 'pack food and work the warehouse', when: 'Monday–Saturday, mornings and afternoons', place: 'Edgewater and Rogers Park', url: 'https://careforreal.org/get-involved/volunteer/' },
  { org: 'common-pantry', what: 'help neighbors shop the pantry', when: 'Tuesday–Thursday afternoons and evenings; ages 14 and up', place: '3908 N. Lincoln Ave., North Center', url: 'https://www.commonpantry.org/volunteer/' },
  { org: 'cradles-to-crayons-chicago', what: 'pack clothing and essentials in the Giving Factory; ages 5 and up', when: 'Tuesday–Saturday, 9:30–11:30 a.m. and 1–3 p.m.', place: '2500 W. Bradley Pl.', url: 'https://www.cradlestocrayons.org/chicago/take-action/volunteer/in-the-giving-factory/' },
  { org: 'beyond-hunger', what: 'pantry, repacking and home delivery shifts', when: 'Weekdays, evenings and weekends', place: 'Oak Park and Austin', url: 'https://www.gobeyondhunger.org/volunteer' },
  { org: 'nourishing-hope', what: 'market, hub and home-delivery shifts, after an orientation', when: 'Shifts posted on sign-up', place: 'Lakeview and West Town', url: 'https://nourishinghopechi.org/volunteer/' },
  { org: 'breakthrough', what: 'the Fresh Market pantry, Teen Night, mentoring and after-school help, after an application', when: 'Pantry Wednesday–Saturday; Teen Night Thursday; after-school weekdays', place: 'East Garfield Park', url: 'https://breakthrough.my.site.com/volunteer/s/application' },
  { org: 'urban-growers-collective', what: 'farm tour and volunteer hours; Budding Growers for families', when: 'Saturdays 1–4 p.m., mid-April through October', place: '9000 S. Mackinaw Ave., South Chicago', url: 'https://www.urbangrowerscollective.org/tour-and-volunteer' },
  { org: 'the-resurrection-project', what: 'weekly immigration legal-help workshops; training provided', when: 'Weekly', place: 'Pilsen and nearby', url: 'https://www.trpimmigrantjustice.org/volunteer' }
];
