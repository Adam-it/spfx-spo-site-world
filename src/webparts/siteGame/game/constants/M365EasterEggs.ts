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
  {
    id: 'power_bi',
    name: 'Power BI',
    kind: 'm365egg',
    spriteKey: 'power_bi',
    title: 'Power BI Developer Hub 📊',
    bio: 'powerbi.microsoft.com/developer',
    bios: [
      // Tip 1 – API and SDK overview
      '📊 "Power BI empowers developers!"\n\n' +
      'Use the Power BI REST APIs to embed reports, manage datasets, and automate ' +
      'workspace operations.\n\n' +
      'SDKs are available for JavaScript, .NET, and Python. ' +
      'Start with the JavaScript Client: `powerbi-client` on npm.',

      // Tip 2 – Custom visuals & dev tools
      '📊 "Visualize with custom visuals!"\n\n' +
      'Build powerful custom visuals using the Power BI visuals SDK (TypeScript/React). ' +
      'Use `pbiviz` CLI to package and deploy your visual.\n\n' +
      'Debug in Power BI Desktop by enabling developer mode. ' +
      'See docs at aka.ms/pbi-custom-visuals.',

      // Tip 3 – Embedding & authentication
      '📊 "Embed reports anywhere."\n\n' +
      'There are two common patterns: user owns data (OAuth) and app owns data (service principal). ' +
      'Use `powerbicli` or REST for automation.\n\n' +
      'Embed securely in SPFx with the `@microsoft/powerbi-client-react` package. '
    ],
  },
  {
    id: 'power_pages',
    name: 'Power Pages',
    kind: 'm365egg',
    spriteKey: 'power_pages',
    title: 'Power Pages — Build low/no-code business websites',
    bio: 'https://powerpages.microsoft.com',
    bios: [
      '🧱 "Hello there! I am Power Pages — your no-code web builder."\n\n' +
      'Create secure, responsive business websites using just a browser. ' +
      'Choose from templates, drag‑and‑drop components, and connect to Dataverse.\n\n' +
      '🌐 Start building: https://powerpages.microsoft.com',

      '🛠 "Need a form or list?"\n\n' +
      'Add Dataverse forms, lists, and custom code with ease. ' +
      'Configure authentication, roles, and web APIs directly in the designer.\n\n' +
      '📘 Learn more: https://learn.microsoft.com/power-pages',

      '🔒 "Security and compliance are built in!"\n\n' +
      'Leverage Dataverse security, HTTPS, and Microsoft identity. ' +
      'Apply business rules, validation, and custom logic with Power FX.\n\n' +
      '📄 See docs: https://aka.ms/PowerPagesDocs',
    ],
  },
  {
    id: 'ms_lists',
    name: 'Microsoft Lists',
    kind: 'm365egg',
    spriteKey: 'ms_lists',
    title: '\u2713 Microsoft Lists \u2014 One app to track it all',
    bio: 'https://www.microsoft.com/en-us/microsoft-365/microsoft-lists',
    bios: [
      // Tip 1 – One app to track it all
      '✓ "One app to track it all!"\n\n' +
      'Create, share, and track lists with anyone. Start quickly with ' +
      'ready-made templates for issues, assets, events, and more.\n\n' +
      '  ✅ Track and manage lists wherever you\'re working\n' +
      '  ✅ See recent and favorite lists\n' +
      '  ✅ Easily share lists with others\n\n' +
      'Microsoft Lists works seamlessly across Microsoft 365 — ' +
      'SharePoint, Teams, or on the web.\n\n' +
      '🌐 https://www.microsoft.com/en-us/microsoft-365/microsoft-lists',

      // Tip 2 – Customize and collaborate in Teams
      '✓ "Customize and collaborate in Teams!"\n\n' +
      'Work together in real time with conversation and lists side by side. ' +
      'Add Lists as tabs to any Teams channel.\n\n' +
      '  📅 Calendar — Track deadlines and schedules\n' +
      '  📋 Grid — Classic spreadsheet-style view\n' +
      '  🎨 Gallery — Visual card layout with images\n\n' +
      'Highlight important details with conditional formatting and rules. ' +
      'Color-code rows, send notifications, and apply automated formatting.\n\n' +
      'All without writing code — point, click, and customize!\n\n' +
      '👥 https://support.microsoft.com/en-us/microsoft-lists',

      // Tip 3 – Automate with Power Platform
      '✓ "Automate with Power Platform!"\n\n' +
      'Build custom apps using lists as the data source.\n\n' +
      '🔹 Power Apps — Extend forms with custom mobile & web apps\n' +
      '⚡ Power Automate — Trigger workflows when items change\n\n' +
      'Common automation scenarios:\n' +
      '  ✅ Send notifications when tasks are assigned\n' +
      '  ✅ Request approvals for high-priority items\n' +
      '  ✅ Copy data to Excel, Dataverse, or other systems\n' +
      '  ✅ Schedule recurring reminders and reports\n\n' +
      '⚡ https://support.microsoft.com/en-us/office/automate-a-list-7a3ba7f0-55ea-4a38-80e1-b0a0279109b5',
    ],
  },
];
