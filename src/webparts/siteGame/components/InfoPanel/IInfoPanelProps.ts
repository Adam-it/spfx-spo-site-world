import { IInfoTarget } from '../../game/types/IInfoTarget';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IInfoPanelProps {
  target: IInfoTarget | null;
  siteAbsoluteUrl: string;
  spHttpClient: SPHttpClient;
  onDismiss: () => void;
}
