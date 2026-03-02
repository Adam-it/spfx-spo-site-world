export enum BuildingType {
  LIBRARY = 'LIBRARY',
  WAREHOUSE = 'WAREHOUSE',
  POST_OFFICE = 'POST_OFFICE',
  MUSEUM = 'MUSEUM',
  TOWN_HALL = 'TOWN_HALL',
  CLOCK_TOWER = 'CLOCK_TOWER',
  BULLETIN_BOARD = 'BULLETIN_BOARD',
  ART_GALLERY = 'ART_GALLERY',
  GENERAL_STORE = 'GENERAL_STORE',
  NEWSPAPER_OFFICE = 'NEWSPAPER_OFFICE',
  CRAFT_WORKSHOP = 'CRAFT_WORKSHOP',
}

// SharePoint BaseTemplate IDs
export const SP_BASE_TEMPLATE_MAP: Record<number, BuildingType | 'DOC_LIB_RANDOM'> = {
  107: BuildingType.TOWN_HALL,        // Tasks
  106: BuildingType.CLOCK_TOWER,      // Calendar
  104: BuildingType.BULLETIN_BOARD,   // Announcements
  109: BuildingType.ART_GALLERY,      // Picture Library
  100: BuildingType.GENERAL_STORE,    // Custom List
  850: BuildingType.NEWSPAPER_OFFICE, // Site Pages
  101: 'DOC_LIB_RANDOM',             // Document Library (picks one of 4)
};

export const DOC_LIB_VARIANTS: BuildingType[] = [
  BuildingType.LIBRARY,
  BuildingType.WAREHOUSE,
  BuildingType.POST_OFFICE,
  BuildingType.MUSEUM,
];

export const BUILDING_CONFIG: Record<BuildingType, {
  label: string;
  icon: string;
  baseColor: string;
  roofColor: string;
  doorColor: string;
  description: string;
}> = {
  [BuildingType.LIBRARY]: {
    label: 'Library',
    icon: '📚',
    baseColor: '#8b6914',
    roofColor: '#6b510f',
    doorColor: '#5c3a0a',
    description: 'Document Library',
  },
  [BuildingType.WAREHOUSE]: {
    label: 'Warehouse',
    icon: '🏭',
    baseColor: '#7a7a6e',
    roofColor: '#5c5c52',
    doorColor: '#3a3a30',
    description: 'Storage Warehouse',
  },
  [BuildingType.POST_OFFICE]: {
    label: 'Post Office',
    icon: '📮',
    baseColor: '#8b3a3a',
    roofColor: '#6b2020',
    doorColor: '#4a1010',
    description: 'Post Office',
  },
  [BuildingType.MUSEUM]: {
    label: 'Museum',
    icon: '🏛',
    baseColor: '#8b8b6e',
    roofColor: '#6b6b50',
    doorColor: '#4a4a30',
    description: 'Museum',
  },
  [BuildingType.TOWN_HALL]: {
    label: 'Town Hall',
    icon: '🏰',
    baseColor: '#7a6b8b',
    roofColor: '#5c4e6b',
    doorColor: '#3c2e4b',
    description: 'Task List — Town Hall',
  },
  [BuildingType.CLOCK_TOWER]: {
    label: 'Clock Tower',
    icon: '🕐',
    baseColor: '#4e6b8b',
    roofColor: '#354e6b',
    doorColor: '#1a3050',
    description: 'Calendar',
  },
  [BuildingType.BULLETIN_BOARD]: {
    label: "Town Crier's Post",
    icon: '📣',
    baseColor: '#8b7a4e',
    roofColor: '#6b5c35',
    doorColor: '#4a3c1a',
    description: 'Announcements',
  },
  [BuildingType.ART_GALLERY]: {
    label: 'Art Gallery',
    icon: '🖼',
    baseColor: '#8b4e6b',
    roofColor: '#6b3554',
    doorColor: '#4b1534',
    description: 'Picture Library',
  },
  [BuildingType.GENERAL_STORE]: {
    label: 'General Store',
    icon: '🏪',
    baseColor: '#6b8b4e',
    roofColor: '#4e6b35',
    doorColor: '#2e4b15',
    description: 'List',
  },
  [BuildingType.NEWSPAPER_OFFICE]: {
    label: 'Newspaper Office',
    icon: '📰',
    baseColor: '#6b8b7a',
    roofColor: '#4e6b5c',
    doorColor: '#2e4b3c',
    description: 'Site Pages',
  },
  [BuildingType.CRAFT_WORKSHOP]: {
    label: 'Craft Workshop',
    icon: '🔨',
    baseColor: '#7a6b5e',
    roofColor: '#5c4e42',
    doorColor: '#3c2e22',
    description: 'Site Assets',
  },
};
