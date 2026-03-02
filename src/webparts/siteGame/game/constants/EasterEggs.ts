import { INPC } from '../types/INPC';

export type EasterEggDefinition = Omit<INPC,
  'x' | 'y' | 'vx' | 'vy' | 'walkTimer' | 'pauseTimer' |
  'facing' | 'animFrame' | 'animTimer' | 'speedMultiplier'
>;

export const EASTER_EGG_DEFINITIONS: EasterEggDefinition[] = [
  {
    id: 'pnp_rabbit',
    name: 'PnPjs',
    kind: 'easteregg',
    spriteKey: 'pnp_rabbit',
    title: 'PnPjs — The SharePoint JS Library 🐇',
    bio:
      '"@pnp/sp" makes SharePoint REST calls a joy in JavaScript/TypeScript. ' +
      'Hundreds of helpers, fluent API design, and an amazing open-source community. ' +
      'Try: npm install @pnp/sp  |  pnp.github.io/pnpjs',
  },
  {
    id: 'vesa_npc',
    name: 'Vesa',
    kind: 'easteregg',
    spriteKey: 'vesa_npc',
    title: 'Vesa Juvonen — Principal PM, Microsoft',
    bio:
      '"This is SharePoint unless I am totally mistaken." — Vesa Juvonen\n\n' +
      'Vesa leads the SharePoint developer platform & the PnP community initiative. ' +
      'Organizer of PnP weekly calls, SPFx samples, and hundreds of community calls. ' +
      'Follow: @vesajuvonen  |  Microsoft 365 & Power Platform Community',
  },
  {
    id: 'warrior_horse_1',
    name: 'Shadowmane',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio:
      'The galloping guardians of governance!\n\n' +
      'The Microsoft 365 & Power Platform Community (PnP) is an open-source ' +
      'initiative coordinated by Microsoft engineers and MVPs. Over 1,200 contributors, ' +
      'hundreds of samples, and free community calls every week. ' +
      'github.com/pnp  |  aka.ms/m365pnp',
  },
  {
    id: 'warrior_horse_2',
    name: 'Ironhoof',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio:
      '"Managed Metadata or bust." — Ironhoof\n\n' +
      'Sister patrol to Shadowmane. Together they defend the realm of ' +
      'proper SharePoint taxonomy, term stores, and content types. ' +
      'Join PnP: aka.ms/m365pnp-community',
  },
  {
    id: 'warrior_horse_3',
    name: 'Cloudmist',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio:
      'Cloudmist gallops wherever SPFx samples need defending.\n\n' +
      'Hundreds of open-source web part samples live at ' +
      'github.com/pnp/sp-dev-fx-webparts — free to use and contribute to. ' +
      'Join the herd: aka.ms/m365pnp',
  },
  {
    id: 'warrior_horse_4',
    name: 'Ferndale',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio:
      '"Modern pages or nothing!" — Ferndale\n\n' +
      'Ferndale patrols the northern fields, ensuring every site collection ' +
      'has proper content types and a sensible information architecture. ' +
      'aka.ms/m365pnp-community',
  },
  {
    id: 'warrior_horse_5',
    name: 'Copperbell',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio:
      'Copperbell rings whenever a new PnP community call goes live.\n\n' +
      'Bi-weekly community calls cover SPFx, Microsoft Teams dev, ' +
      'Power Platform and more. All recordings on YouTube. ' +
      'aka.ms/spdev-call',
  },
  {
    id: 'campfire_dev',
    name: 'Community Campfire',
    kind: 'easteregg',
    spriteKey: 'campfire',
    title: '🔥 SharePoint Developer Community',
    bio:
      'Gather around the fire! The SP Developer community meets bi-weekly ' +
      'on community calls to share samples, demos, and knowledge.\n\n' +
      'Sample gallery: adoption.microsoft.com/sample-solution-gallery\n' +
      'GitHub: github.com/pnp/sp-dev-fx-webparts\n' +
      'Join the call: aka.ms/spdev-call',
  },
];
