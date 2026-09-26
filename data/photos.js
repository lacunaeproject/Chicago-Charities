// The home page photograph of a Chicago place. Each charity's own photo
// lives on its entry in data/orgs.js.
// Every one is from Wikimedia Commons under a free license, credited on the
// page it appears and in full under How we check. Files in img/photos/ are
// resized from the originals; the same license
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
    'David Wilson', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:20131129_04_CTA_Loop_L_@_Wabash_%26_Van_Buren_(15066617259).jpg')
};
