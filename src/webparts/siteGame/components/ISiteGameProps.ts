import { SPHttpClient } from '@microsoft/sp-http';

export interface ISiteGameProps {
  description: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  spHttpClient: SPHttpClient;
  siteAbsoluteUrl: string;
  userDisplayName: string;
  showEmptyLists: boolean;
  maxBots: number;
  enableEasterEggs: boolean;
}
