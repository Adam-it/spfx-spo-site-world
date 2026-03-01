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
    id: 'm365_chilli',
    name: 'M365 Chilli',
    kind: 'easteregg',
    spriteKey: 'm365_chilli',
    title: '🌶️ Microsoft 365 Extensibility — Hot Stuff!',
    bio:
      'The Microsoft 365 platform is on 🔥! ' +
      'SPFx → Teams → Viva → Power Platform → Copilot extensions.\n\n' +
      'Everything connects. Everything extends. ' +
      'Start at aka.ms/m365dev and join the revolution.',
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
    id: 'cli_robot',
    name: 'CLI-Bot',
    kind: 'easteregg',
    spriteKey: 'cli_robot',
    title: 'CLI for Microsoft 365 🤖',
    bio:
      'Manage your Microsoft 365 tenant from the command line!\n\n' +
      'CLI for M365 is a cross-platform, open-source tool to manage ' +
      'SharePoint, Teams, Power Platform, and more — using simple shell commands.\n\n' +
      'Try: m365 login  |  m365 spo site list\n' +
      'pnp.github.io/cli-microsoft365',
  },
  {
    id: 'podcast_host',
    name: 'PnP Weekly',
    kind: 'easteregg',
    spriteKey: 'podcast_host',
    title: 'Microsoft 365 PnP Weekly Podcast 🎙️',
    bio:
      'Hosted by Vesa Juvonen & Waldek Mastykarz.\n\n' +
      'Every Monday, the latest Microsoft 365 dev news, ' +
      'community highlights, and interviews with MVPs and Microsoft engineers. ' +
      'Over 220+ episodes strong!\n\n' +
      'pnpweekly.podbean.com  |  YouTube: Microsoft 365 & Power Platform Community',
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
