// Photographs of Chicago places, one for the home page and one per cause.
// Every one is from Wikimedia Commons under a free license, credited on the
// page it appears and in full under How we check. Files in img/photos/ are
// resized (and "any" cropped to 3:2) from the originals; the same license
// applies to them. Replace a photo only with one whose license allows it,
// and update its credit here in the same change.

const CC = {
  'CC0':          'https://creativecommons.org/publicdomain/zero/1.0/',
  'CC BY 2.0':    'https://creativecommons.org/licenses/by/2.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'Public domain': null
};
const p = (file, h, place, alt, artist, license, source) =>
  ({ file, w: 1280, h, place, alt, artist, license, licenseUrl: CC[license], source });

export const PHOTOS = {
  home: p('hero', 960, 'The Loop ‘L’ at Wabash and Van Buren',
    'Two CTA trains meet on the elevated Loop tracks above Wabash Avenue, between downtown buildings.',
    'David Wilson', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:20131129_04_CTA_Loop_L_@_Wabash_%26_Van_Buren_(15066617259).jpg'),
  any: p('any', 853, 'The skyline from the lakefront',
    'Chicago’s downtown skyline across the water, above a band of trees along the lakefront.',
    'Alvesgaspar', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Chicago_September_2016-23.jpg'),
  food: p('food', 846, 'A farmers market in Lincoln Park',
    'Tables of pumpkins and squash under autumn trees at a farmers market, with shoppers between the stalls.',
    'rboed', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Farmers%27_Market,_Lincoln_Park,_Chicago.jpg'),
  education: p('education', 1032, 'Harold Washington Library Center, with an ‘L’ train passing',
    'The red-brick Harold Washington Library Center with its green roof ornaments, as an elevated train passes in front.',
    'Carol M. Highsmith', 'Public domain', 'https://commons.wikimedia.org/wiki/File:Harold_Washington_Library_Center,_Passing_%27El%27_Train,_Chicago,_Illinois_LCCN2011630912.tif'),
  housing: p('housing', 960, 'Two-flats in Auburn Gresham',
    'A tree-lined street of red-brick two-flat apartment buildings on the South Side.',
    'Vortex895', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Auburn_Gresham_two_flats.jpg'),
  legal: p('legal', 851, 'The Picasso in Daley Plaza, outside the Cook County courthouse',
    'The steel Picasso sculpture in Daley Plaza in front of the Richard J. Daley Center, with people on the plaza.',
    'Dan DeLuca', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Downtown-chicago-picasso-sculpture_(6360678643).jpg'),
  youth: p('youth', 853, 'The boathouse in Humboldt Park',
    'The arched Humboldt Park boathouse reflected in the lagoon, with autumn trees and a duck on the water.',
    'GazeboJake', 'CC0', 'https://commons.wikimedia.org/wiki/File:Humboldt_park_boathouse.jpg'),
  jobs: p('jobs', 853, 'The Great Hall at Union Station',
    'The vaulted Great Hall of Chicago Union Station, with its skylight, columns and wooden benches.',
    'Fyu', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Chicago_Union_Station,_Great_Hall.jpg'),
  health: p('health', 815, 'The Lakefront Trail',
    'Runners on the Lakefront Trail beside a harbor of sailboats, with a Chicago flag flying.',
    'Alanscottwalker', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Lake_front_bike2.JPG'),
  women: p('women', 857, 'Hull-House, the settlement house Jane Addams co-founded in 1889',
    'The brick Hull-House mansion on Halsted Street behind an iron fence and trees.',
    'Elisa Rolle', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Hull_House,_Chicago,_IL.jpg'),
  environment: p('environment', 720, 'The Magic Hedge at Montrose Point',
    'Wild grasses and flowers at Montrose Point Bird Sanctuary, with the skyline across the lake.',
    'Raed Mansour', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Magic_Hedge,_Montrose_Point_Bird_Sanctuary,_Chicago_(9259).jpg')
};
