import { INPC } from '../types/INPC';

export type M365EasterEggDefinition = Omit<INPC,
  'x' | 'y' | 'vx' | 'vy' | 'walkTimer' | 'pauseTimer' |
  'facing' | 'animFrame' | 'animTimer' | 'speedMultiplier'
>;

export const M365_EASTER_EGG_DEFINITIONS: M365EasterEggDefinition[] = [
  {
    id: 'power_automate',
    name: 'Power Automate',
    kind: 'm365egg',
    spriteKey: 'power_automate',
    title: 'Power Automate — Automate your workflows',
    bio: 'make.powerautomate.com',
    bios: [
      // Tip 1 — What it is
      '\u26a1 "Hello, I am Power Automate!"\n\n' +
      'Power Automate (formerly Microsoft Flow) is a cloud-based service\n' +
      'that lets you create automated workflows between your favorite\n' +
      'apps and services — no code required.\n\n' +
      'Key flow types:\n' +
      '  \u2601\ufe0f  Cloud flows   \u2014 trigger on events (email, form, schedule)\n' +
      '  \ud83d\udda5\ufe0f  Desktop flows \u2014 automate legacy/desktop apps with RPA\n' +
      '  \ud83d\udcca Business process flows \u2014 guide users through a process\n\n' +
      'Use cases:\n' +
      '  \u2705 Approval workflows (SharePoint, Teams)\n' +
      '  \u2705 Automated email notifications & reminders\n' +
      '  \u2705 Sync data between SharePoint, Excel, Dataverse\n' +
      '  \u2705 Post to Teams when a list item changes\n\n' +
      '\ud83c\udf10 Get started \u2192 make.powerautomate.com\n' +
      '\ud83d\udcd6 Docs \u2192 learn.microsoft.com/power-automate',

      // Tip 2 — SharePoint integration
      '\u26a1 "Power Automate \u2661 SharePoint!"\n\n' +
      'Power Automate has deep, native integration with SharePoint:\n\n' +
      '\ud83d\udce5 Triggers (start a flow when...):\n' +
      '  \u2022 A new item is created in a list\n' +
      '  \u2022 An existing item is modified\n' +
      '  \u2022 A file is created/modified in a library\n' +
      '  \u2022 An item is deleted\n\n' +
      '\u2699\ufe0f  Actions (do things with SharePoint):\n' +
      '  \u2022 Create / update / delete list items\n' +
      '  \u2022 Get items with filter, sort, top queries (OData)\n' +
      '  \u2022 Send files, move files, copy files\n' +
      '  \u2022 Start an approval, send email, post to Teams\n\n' +
      '\ud83d\udca1 Pro tip: Use "Send an HTTP request to SharePoint" action\n' +
      'to call REST APIs not covered by built-in actions.\n\n' +
      '\ud83d\udcd6 SharePoint connector \u2192 learn.microsoft.com/connectors/sharepointonline',

      // Tip 3 — Approvals & Teams
      '\u26a1 "Approvals made easy with Power Automate + Teams!"\n\n' +
      'The Approvals connector lets you build formal review processes:\n\n' +
      '  1\ufe0f\u20e3 Trigger: item submitted in SharePoint list\n' +
      '  2\ufe0f\u20e3 Action: Start and wait for an approval\n' +
      '     \u2022 Assign to specific users or a group\n' +
      '     \u2022 Set due date, add details & attachments\n' +
      '  3\ufe0f\u20e3 Condition: if approved \u2192 update status, notify\n' +
      '           if rejected \u2192 send feedback, revert\n\n' +
      'Approvals appear directly in Microsoft Teams as\n' +
      'adaptive cards \u2014 no context switching needed.\n\n' +
      'Available approval types:\n' +
      '  \u2022 Approve / Reject (first to respond)\n' +
      '  \u2022 Approve / Reject (everyone must respond)\n' +
      '  \u2022 Custom responses\n\n' +
      '\ud83d\udcd6 Approvals guide \u2192 learn.microsoft.com/power-automate/approvals-teams',
    ],
  },
];
