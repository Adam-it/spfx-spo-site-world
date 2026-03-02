import * as React from 'react';
import {
  Panel,
  PanelType,
  Text,
  Link,
  Stack,
  Spinner,
  SpinnerSize,
  DefaultButton,
  Icon,
  mergeStyleSets,
} from '@fluentui/react';
import { IInfoPanelProps } from './IInfoPanelProps';
import { SharePointService } from '../../services/SharePointService';
import { IBuilding } from '../../game/types/IBuilding';
import { INPC } from '../../game/types/INPC';

interface IPanelState {
  items: Array<{ Id: number; Title: string; Modified: string; Editor?: { Title: string } }>;
  loading: boolean;
}

const styles = mergeStyleSets({
  header: { padding: '12px 16px', borderBottom: '1px solid #e1dfdd' },
  buildingType: { fontSize: 11, color: '#8a8886', textTransform: 'uppercase', letterSpacing: 1 },
  itemRow: {
    padding: '8px 16px',
    borderBottom: '1px solid #f3f2f1',
    selectors: { ':hover': { background: '#f3f2f1' } },
  },
  itemTitle: { fontSize: 13, color: '#323130' },
  itemMeta: { fontSize: 11, color: '#8a8886' },
  eggBio: { padding: '16px', fontSize: 13, lineHeight: '1.6', whiteSpace: 'pre-wrap' },
  eggIcon: { fontSize: 40, textAlign: 'center', padding: '16px 0' },
  userBio: { padding: '16px', fontSize: 13 },
  userGroup: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 600,
  },
});

const GROUP_COLORS: Record<string, { bg: string; text: string }> = {
  Owners: { bg: '#fff4ce', text: '#7a5900' },
  Members: { bg: '#dce6f0', text: '#0e3d77' },
  Visitors: { bg: '#d7f0dd', text: '#1a5a24' },
};

export class InfoPanel extends React.Component<IInfoPanelProps, IPanelState> {
  private spService: SharePointService;

  constructor(props: IInfoPanelProps) {
    super(props);
    this.state = { items: [], loading: false };
    this.spService = new SharePointService(props.spHttpClient, props.siteAbsoluteUrl);
  }

  public componentDidUpdate(prevProps: IInfoPanelProps): void {
    const { target } = this.props;
    if (target !== prevProps.target) {
      if (target?.kind === 'building') {
        this.loadItems(target.data).catch(() => undefined);
      } else {
        // target just became null or switched to npc — reset list state
        this.setState({ items: [], loading: false });
      }
    }
  }

  private async loadItems(building: IBuilding): Promise<void> {
    if (building.listId === 'podcast_tower') return;
    this.setState({ loading: true, items: [] });
    try {
      const items = await this.spService.fetchListItems(building.listId);
      this.setState({ items, loading: false });
    } catch {
      this.setState({ loading: false });
    }
  }

  public render(): React.ReactElement {
    const { target, onDismiss } = this.props;
    const isOpen = target !== null;

    const headerText =
      target?.kind === 'building'
        ? `🏛 ${target.data.name}`
        : target?.kind === 'npc' && target.data.kind === 'easteregg'
        ? `🥚 ${target.data.name}`
        : target?.kind === 'npc'
        ? `👤 ${target.data.name}`
        : '';

    return (
      <Panel
        isOpen={isOpen}
        onDismiss={onDismiss}
        type={PanelType.smallFixedFar}
        headerText={headerText}
        closeButtonAriaLabel="Close"
        isLightDismiss
        styles={{
          main: { boxShadow: '-4px 0 16px rgba(0,0,0,0.15)' },
          header: { paddingTop: 12 },
        }}
      >
        {target?.kind === 'building' && this.renderBuilding(target.data)}
        {target?.kind === 'npc' && target.data.kind === 'user' && this.renderUser(target.data)}
        {target?.kind === 'npc' && target.data.kind === 'easteregg' && this.renderEgg(target.data)}
      </Panel>
    );
  }

  private renderBuilding(b: IBuilding): React.ReactElement {
    const { items, loading } = this.state;

    return (
      <Stack>
        <div className={styles.header}>
          <Text className={styles.buildingType}>{b.buildingType.replace(/_/g, ' ')}</Text>
          <Stack horizontal tokens={{ childrenGap: 16 }} style={{ marginTop: 6 }}>
            <Text variant="small">{b.itemCount} items</Text>
            {b.url && (
              <Link href={b.url} target="_blank">
                Open in SharePoint →
              </Link>
            )}
          </Stack>
        </div>

        {loading && (
          <Stack horizontalAlign="center" style={{ padding: 24 }}>
            <Spinner size={SpinnerSize.medium} label="Loading items..." />
          </Stack>
        )}

        {!loading && items.length === 0 && b.itemCount > 0 && (
          <Text style={{ padding: 16, color: '#8a8886' }}>
            Unable to load items — check your permissions.
          </Text>
        )}

        {!loading && items.length === 0 && b.itemCount === 0 && (
          <Text style={{ padding: 16, color: '#8a8886', fontStyle: 'italic' }}>
            This building is empty.
          </Text>
        )}

        {!loading &&
          items.map((item) => (
            <div key={item.Id} className={styles.itemRow}>
              <Link
                href={`${b.url}&ID=${item.Id}`}
                target="_blank"
                styles={{ root: { textDecoration: 'none' } }}
              >
                <Text className={styles.itemTitle}>{item.Title || '(No title)'}</Text>
              </Link>
              <Text className={styles.itemMeta}>
                {item.Modified
                  ? new Date(item.Modified).toLocaleDateString()
                  : ''}{' '}
                {item.Editor?.Title ? `· ${item.Editor.Title}` : ''}
              </Text>
            </div>
          ))}
      </Stack>
    );
  }

  private renderUser(npc: INPC): React.ReactElement {
    const groupName = npc.title.split(' — ')[0];
    const gc = GROUP_COLORS[groupName] || { bg: '#e8e8e8', text: '#333' };

    return (
      <Stack className={styles.userBio} tokens={{ childrenGap: 10 }}>
        {/* Avatar placeholder */}
        <Stack horizontalAlign="center">
          <Icon
            iconName="Contact"
            styles={{
              root: {
                fontSize: 64,
                color: npc.groupColor || '#555',
                width: 80,
                height: 80,
                background: '#f3f2f1',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                lineHeight: '80px',
              },
            }}
          />
        </Stack>

        <span
          className={styles.userGroup}
          style={{ background: gc.bg, color: gc.text, alignSelf: 'flex-start' }}
        >
          {groupName}
        </span>

        {npc.email && (
          <Stack horizontal tokens={{ childrenGap: 6 }}>
            <Icon iconName="Mail" />
            <Link href={`mailto:${npc.email}`}>{npc.email}</Link>
          </Stack>
        )}

        {npc.profileUrl && (
          <DefaultButton
            text="View Profile"
            iconProps={{ iconName: 'Contact' }}
            href={npc.profileUrl}
            target="_blank"
          />
        )}
      </Stack>
    );
  }

  private renderEgg(npc: INPC): React.ReactElement {
    const emojiMap: Record<string, string> = {
      pnp_rabbit: '🐇',
      vesa_npc: '🧑‍💻',
      m365_chilli: '🌶️',
      warrior_horse: '🐴',
      cli_robot: '🤖',
      podcast_host: '🎙️',
      campfire: '🔥',
    };

    return (
      <Stack>
        <div className={styles.eggIcon}>{emojiMap[npc.spriteKey] || '🥚'}</div>
        <Text
          variant="mediumPlus"
          style={{ paddingLeft: 16, paddingRight: 16, color: '#8b00c8', fontWeight: 600 }}
        >
          {npc.title}
        </Text>
        <div className={styles.eggBio}>
          <Text>{npc.bio}</Text>
        </div>
        {npc.profileUrl && (
          <Stack style={{ padding: '0 16px 16px' }}>
            <Link href={npc.profileUrl} target="_blank">
              Learn more →
            </Link>
          </Stack>
        )}
      </Stack>
    );
  }
}
