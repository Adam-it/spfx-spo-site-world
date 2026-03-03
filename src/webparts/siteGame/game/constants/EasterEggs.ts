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
    title: 'PnPjs — The SharePoint & Graph JS Library 🐇',
    bio: 'pnp.github.io/pnpjs',
    bios: [
      // Tip 1 – What it is & SPFx setup
      '🐇 "Hello, I am PnPjs!"\n\n' +
      'PnPjs is a collection of fluent, open-source TypeScript libraries that make ' +
      'Microsoft 365 REST API and Microsoft Graph calls a joy.\n\n' +
      'In SPFx you get zero-config auth — just pass the web part context:\n\n' +
      '  import { spfi, SPFx } from "@pnp/sp";\n' +
      '  const sp = spfi().using(SPFx(this.context));\n\n' +
      'No tokens. No fetch wiring. It just works.\n\n' +
      '📖 Getting started → pnp.github.io/pnpjs',

      // Tip 2 – Fluent query API & performance
      '🐇 "Did you know? PnPjs has a fluent query API!"\n\n' +
      'Read SharePoint data with readable, chainable calls:\n\n' +
      '  const items = await sp.web\n' +
      '    .lists.getByTitle("Documents")\n' +
      '    .items\n' +
      '    .select("Title", "Id", "Modified")\n' +
      '    .orderBy("Modified", false)\n' +
      '    .top(50)();\n\n' +
      'PnPjs v3 also supports request batching and in-memory caching ' +
      'via Behaviors — dramatically reducing round-trips to SharePoint.\n\n' +
      '⚡ Performance tips → pnp.github.io/pnpjs/concepts/batching',

      // Tip 3 – Microsoft Graph & ecosystem
      '🐇 "PnPjs goes beyond SharePoint!"\n\n' +
      '"@pnp/graph" gives you the same fluent API for Microsoft Graph:\n\n' +
      '  import { graphfi, SPFx } from "@pnp/graph";\n' +
      '  import "@pnp/graph/users";\n' +
      '  const me = await graph.me();\n\n' +
      '✅ Works in SPFx, Node.js, Azure Functions & browser apps\n' +
      '✅ Tree-shakable — only bundle what you use\n' +
      '✅ TypeScript-first with full typings\n' +
      '✅ 100% open-source (MIT) — 1,500+ community contributors\n\n' +
      '🌐 Full docs → pnp.github.io/pnpjs',
    ],
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
      'Organizer of PnP weekly calls, SPFx samples, and hundreds of community calls. '
  },
  {
    id: 'warrior_horse_1',
    name: 'Shadowmane',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio: 'aka.ms/m365pnp',
    bios: [
      // What the PnP community is
      '🐴 "I am Shadowmane, guardian of the community!" \n\nThe Microsoft 365 & Power Platform Community (PnP) is a worldwide,\n' +
      'open-source effort coordinated by Microsoft engineers and volunteer\n' +
      'MVPs & community members.\n\n' +
      '"PnP" = Patterns and Practices — real-world reusable solutions,\n' +
      'not just documentation.\n\n' +
      '📦 What the community ships:\n' +
      '  · SPFx web part & extension samples\n' +
      '  · Script samples (PowerShell, CLI, Graph)\n' +
      '  · Adaptive Card templates\n' +
      '  · Power Platform solutions\n' +
      '  · List & column formatting samples\n\n' +
      '🌐 Home base → pnp.github.io\n' +
      '⭐ Quick link → aka.ms/m365pnp',

      // PnP community calls
      '🐴 "Did you know PnP runs FREE weekly calls?" \n\n Every week the community runs open, recorded video calls:\n\n' +
      '  📅 Microsoft 365 Platform call — Tuesdays\n' +
      '  📅 SharePoint Framework (SPFx) call — bi-weekly Thursdays\n' +
      '  📅 Power Platform call — bi-weekly Wednesdays\n' +
      '  📅 Microsoft Teams call — monthly\n\n' +
      'Each call features live demos, open Q&A and community news.\n' +
      'All recordings are free on YouTube — no registration needed.\n\n' +
      '▶️ Recordings & schedule → aka.ms/m365pnp-calls\n' +
      '🌐 Community hub → pnp.github.io',

      // How to get involved
      '🐴 "The herd welcomes new riders!" Contributing to PnP is easier than you think:\n\n' +
      '  1️⃣ Browse existing samples for inspiration\n' +
      '  2️⃣ Fork the repo on GitHub\n' +
      '  3️⃣ Add your sample / fix a bug\n' +
      '  4️⃣ Submit a Pull Request\n' +
      '  5️⃣ Get recognized in the weekly call! 🎉\n\n' +
      'No contribution is too small — docs, bug fixes and translations count.\n\n' +
      '🤝 Start here → pnp.github.io\n' +
      '💻 All repos → github.com/pnp',
    ],
  },
  {
    id: 'warrior_horse_2',
    name: 'Ironhoof',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio: 'pnp.github.io/List-Formatting',
    bios: [
      // What List Formatting is
      '🐴 "Ironhoof guards the beauty of your lists!" \n\n List Formatting lets you transform the look of SharePoint list\n' +
      'columns, rows and views using pure JSON — no code, no SPFx needed.\n\n' +
      'There are two types:\n' +
      '  🔹 Column Formatting — style individual cells\n' +
      '  🔹 View Formatting — style entire rows or the whole view\n\n' +
      'You write JSON in the column/view settings and SharePoint renders\n' +
      'icons, colors, progress bars, buttons, pills — anything you imagine.\n\n' +
      '📖 Official docs → learn.microsoft.com/sharepoint/dev/declarative-customization/column-formatting\n' +
      '🎨 400+ samples → pnp.github.io/List-Formatting',

      // Column formatting basics
      '🐴 "A quick column formatting tip from Ironhoof!" \n\n The simplest column format adds a color based on a value:\n\n' +
      '  {\n' +
      '    "$schema": ".../column-formatting.schema.json",\n' +
      '    "elmType": "div",\n' +
      '    "style": {\n' +
      '      "color": "=if([$Status]=\'Done\',\'green\',\'red\')"\n' +
      '    },\n' +
      '    "txtContent": "[$Status]"\n' +
      '  }\n\n' +
      'Key expressions: if(), @currentField, [$FieldName], @me, @now\n' +
      'Use operators: ==, !=, >, <, &&, ||\n\n' +
      '🎨 Sample library → pnp.github.io/List-Formatting',

      // Useful sample: data bars
      '🐴 "Ever seen a progress bar inside a SharePoint list cell?" \n\n The Data Bar column format renders a visual fill based on a number:\n\n' +
      '  · Great for % complete, scores, budgets\n' +
      '  · Completely JSON-driven — no custom code\n' +
      '  · Color shifts green→amber→red automatically\n\n' +
      'Find it in the PnP List Formatting sample gallery under\n' +
      '"data-bar" or search for "number" samples.\n\n' +
      'You can apply any sample in < 30 seconds:\n' +
      '  Column settings → Format this column → Paste JSON → Save\n\n' +
      '📊 Browse number samples → pnp.github.io/List-Formatting',
    ],
  },
  {
    id: 'warrior_horse_3',
    name: 'Cloudmist',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio: 'pnp.github.io/List-Formatting',
    bios: [
      // Conditional icon formatting
      '🐴 "Cloudmist loves a colourful status column!" \n\n Replace dull text values with coloured icons using column formatting:\n\n' +
      '  "iconName": "=if([$Priority]==\'High\',\'ErrorBadge\',\n' +
      '              if([$Priority]==\'Medium\',\'Warning\',\'CheckMark\'))"\n\n' +
      'Fluent UI icon names work directly in iconName.\n' +
      'Add "color" to make them red / amber / green.\n\n' +
      '💡 Pro tip: open the Fluent UI icon browser at\n' +
      '   developer.microsoft.com/fluentui to find icon names.\n\n' +
      '🎨 Status/icon samples → pnp.github.io/List-Formatting',

      // Person column formatting
      '🐴 "Did you know you can format Person columns too?"\n\n Person column formatting lets you show profile photos, presence,\n' +
      'hyperlinked names and even department — all from JSON.\n\n' +
      'Key properties available on a Person field:\n' +
      '  [$AssignedTo.title]     — display name\n' +
      '  [$AssignedTo.email]     — email address\n' +
      '  [$AssignedTo.picture]   — profile photo URL\n' +
      '  [$AssignedTo.department]— department\n\n' +
      'Combine with an <img> elmType to show the photo inline.\n\n' +
      '👤 Person field samples → pnp.github.io/List-Formatting',

      // Hover card / action buttons
      '🐴 "Add action buttons right inside your list rows!"\n\n Column formatting supports customRowAction to add clickable buttons\n' +
      'that trigger Power Automate flows, open URLs, or send emails — \n' +
      'without leaving the list view.\n\n' +
      'Example use-cases:\n' +
      '  ✅ "Approve" button → triggers an approval flow\n' +
      '  📧 "Notify" button → opens an email draft\n' +
      '  🔗 "Open" button → navigates to related item\n\n' +
      'All driven by JSON — no SPFx, no deployment.\n\n' +
      '⚡ Action button samples → pnp.github.io/List-Formatting',
    ],
  },
  {
    id: 'warrior_horse_4',
    name: 'Ferndale',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio: 'pnp.github.io/List-Formatting',
    bios: [
      // View formatting intro
      '🐴 "Ferndale patrols the view formatting frontier!"\n\n View Formatting styles entire rows — not just individual cells.\n\n' +
      'Use it to:\n' +
      '  🟥 Highlight overdue rows red\n' +
      '  🟩 Stripe alternate rows for readability\n' +
      '  🏷️ Add a callout badge to high-priority items\n' +
      '  🃏 Render items as cards in a custom layout\n\n' +
      'View Formatting JSON goes in:\n' +
      '  View → Format current view → Advanced mode\n\n' +
      '📐 View formatting samples → pnp.github.io/List-Formatting',

      // Group header formatting
      '🐴 "Group headers can look amazing too!"\n\n When you group a SharePoint view, you can format the group header\n' +
      'row separately with groupProps in your view format JSON.\n\n' +
      'Ideas:\n' +
      '  · Show item count as a coloured pill\n' +
      '  · Add a progress bar showing % complete within the group\n' +
      '  · Display an icon that changes based on group value\n\n' +
      'This makes grouped project trackers, kanban tables and\n' +
      'dashboards look truly professional — still zero code.\n\n' +
      '🗂️ Group header samples → pnp.github.io/List-Formatting',

      // Row formatting conditional highlight
      '🐴 "Highlight what matters — colour your whole row!"\n\n Conditional row formatting makes critical items impossible to miss:\n\n' +
      '  {\n' +
      '    "$schema": ".../view-formatting.schema.json",\n' +
      '    "additionalRowClass":\n' +
      '      "=if([$DueDate] < @now, \'sp-field-severity--severeWarning\', \'\')"\n' +
      '  }\n\n' +
      'Built-in severity classes: --good, --low, --warning,\n' +
      '--severeWarning, --blocked\n\n' +
      '🎨 Row highlight samples → pnp.github.io/List-Formatting',
    ],
  },
  {
    id: 'warrior_horse_5',
    name: 'Copperbell',
    kind: 'easteregg',
    spriteKey: 'warrior_horse',
    title: '⚔️ PnP Community Warriors',
    bio: 'aka.ms/m365pnp',
    bios: [
      // PnP PowerShell
      '🐴 "Copperbell rings for PnP PowerShell!" \n\n PnP PowerShell is a cross-platform PowerShell module with 500+\n' +
      'cmdlets covering SharePoint, Teams, Planner, Power Platform and more.\n\n' +
      'Quick examples:\n' +
      '  Connect-PnPOnline -Url https://tenant.sharepoint.com -Interactive\n' +
      '  Get-PnPList\n' +
      '  Add-PnPField -List "Tasks" -DisplayName "Risk" -Type Choice\n' +
      '  Apply-PnPProvisioningTemplate -Path template.xml\n\n' +
      'Works on Windows, macOS and Linux.\n' +
      'Install: Install-Module PnP.PowerShell\n\n' +
      '📘 Full docs → pnp.github.io/powershell\n' +
      '🌐 Community → aka.ms/m365pnp',

      // CLI for Microsoft 365
      '🐴 "CLI for Microsoft 365 — manage M365 from any shell!" \n\n The CLI for Microsoft 365 is a cross-platform command-line tool\n' +
      'that lets you manage Microsoft 365 from bash, zsh, PowerShell\n' +
      'or even Azure DevOps pipelines.\n\n' +
      'Quick examples:\n' +
      '  m365 login\n' +
      '  m365 spo site list\n' +
      '  m365 spo list add --title "Projects" --baseTemplate GenericList\n' +
      '  m365 flow list --environmentName Default\n\n' +
      'Great for automation, CI/CD and scripted provisioning.\n\n' +
      '⚙️ Docs & install → pnp.github.io/cli-microsoft365\n' +
      '🌐 Community → aka.ms/m365pnp',

      // Sample Solution Gallery
      '🐴 "The PnP Sample Solution Gallery — your cheat code!"\n\n Before writing any code, check the PnP Sample Solution Gallery.\n' +
      'It contains thousands of ready-to-use samples:\n\n' +
      '  🔷 SPFx web parts & extensions\n' +
      '  🔷 List & column formatting JSON\n' +
      '  🔷 Power Automate flow templates\n' +
      '  🔷 PowerShell & Graph scripts\n' +
      '  🔷 Adaptive Card designs\n\n' +
      'Filter by product, author, technology — find something in seconds.\n\n' +
      '🗂️ Sample gallery → adoption.microsoft.com/sample-solution-gallery\n' +
      '🌐 Community → aka.ms/m365pnp',
    ],
  },
  {
    id: 'cli_m365',
    name: 'CLI M365',
    kind: 'easteregg',
    spriteKey: 'm365_chilli',
    title: '> CLI for Microsoft 365 — Manage M365 from any shell',
    bio: 'pnp.github.io/cli-microsoft365',
    bios: [
      // Tip 1 — What it is & how to install
      '> CLI for Microsoft 365\n\n' +
      'A free, open-source, cross-platform CLI built on Node.js that lets you ' +
      'manage your whole Microsoft 365 tenant from any terminal — ' +
      'bash, zsh, fish, PowerShell or CMD.\n\n' +
      'Install once, use everywhere:\n' +
      '  npm i -g @pnp/cli-microsoft365\n\n' +
      'Sign in (interactive browser pop-up):\n' +
      '  m365 login\n\n' +
      'Or certificate / secret auth for automation:\n' +
      '  m365 login --authType certificate --certificateFile cert.pem\n\n' +
      'Works on Windows, macOS & Linux. Zero extra tooling required.\n\n' +
      '\u2139\ufe0f  Install guide  \u2192 pnp.github.io/cli-microsoft365/user-guide/installing-cli\n' +
      '\ud83c\udf10 Full docs      \u2192 pnp.github.io/cli-microsoft365',

      // Tip 2 — Key commands across workloads
      '> m365 --help  (a few favourites)\n\n' +
      'SharePoint Online:\n' +
      '  m365 spo site list\n' +
      '  m365 spo site add --alias dev --title "Dev Portal"\n' +
      '  m365 spo list add --title "Projects" --baseTemplate GenericList \\\n' +
      '        --webUrl https://tenant.sharepoint.com/sites/dev\n' +
      '  m365 spo file get --webUrl <url> --url /Shared%20Documents/spec.pdf\n\n' +
      'Microsoft Teams:\n' +
      '  m365 teams team list\n' +
      '  m365 teams channel add --teamId <id> --name "Dev Chat"\n\n' +
      'Entra ID (Azure AD):\n' +
      '  m365 entra app list\n' +
      '  m365 entra app set --appId <id> --uris https://myapp.com\n\n' +
      'Pipe JSON to jq for scripting:\n' +
      '  m365 spo site list --output json | jq \'.[].Url\'\n\n' +
      '\u2699\ufe0f  Command reference \u2192 pnp.github.io/cli-microsoft365/cmd/spo/site/site-list',

      // Tip 3 — MCP server
      '> CLI for Microsoft 365 MCP Server\n\n' +
      'The CLI for Microsoft 365 MCP Server is a standalone Model Context\n' +
      'Protocol server that exposes the full power of the CLI to AI assistants\n' +
      'like GitHub Copilot, Claude and Cursor.\n\n' +
      'Configure it in VS Code (.vscode/mcp.json or settings.json):\n' +
      '  {\n' +
      '    "servers": {\n' +
      '      "cli-m365": {\n' +
      '        "type": "stdio",\n' +
      '        "command": "npx",\n' +
      '        "args": ["-y", "@pnp/cli-microsoft365-mcp"]\n' +
      '      }\n' +
      '    }\n' +
      '  }\n\n' +
      'Once connected, your AI can list SPO sites, create Teams channels,\n' +
      'manage Entra apps and much more \u2014 all through natural language prompts.\n\n' +
      '\ud83e\udd16 Full guide \u2192 pnp.github.io/cli-microsoft365/user-guide/using-cli-mcp-server',
    ],
  },
  {
    id: 'campfire_dev',
    name: 'Community Campfire',
    kind: 'easteregg',
    spriteKey: 'campfire',
    title: '🔥 Microsoft 365 & Power Platform Community (PnP)',
    bio:
      'Welcome to the campfire — heart of the PnP community!\n\n' +
      'The Microsoft 365 & Power Platform Community (PnP) is a global open-source ' +
      'initiative coordinated by Microsoft engineers and volunteer MVPs & community members. ' +
      '"PnP" stands for Patterns and Practices — sharing real-world, reusable solutions.\n\n' +
      '🛠 Open-source tools: PnPjs · CLI for Microsoft 365 · PnP PowerShell · ' +
      'PnP Core SDK · PnP Modern Search · PnP Provisioning Engine\n\n' +
      '📦 1,500+ contributors · thousands of code samples · ' +
      'SPFx web parts, script samples, Adaptive Cards, Power Platform solutions\n\n' +
      '📞 Free community calls every week — SPFx, Teams dev, Power Platform, ' +
      'Microsoft 365 Platform and more. All recordings free on YouTube.\n\n' +
      '🌐 pnp.github.io\n' +
      '⭐ aka.ms/m365pnp\n' +
      '💻 github.com/pnp',
  },
];
