export interface CategoryOption {
    readonly value: string;
    readonly label: string;

  }
  
  export const categoryOptions: readonly CategoryOption[] = [
    { value: 'machinery', label: 'Agricultural machinery,tools, Servicea and Parts'},
    { value: 'animal', label: 'Animal production' },
    { value: 'crop', label: ' Crop production'},
    { value: 'construction', label: ' Agricultural construction and agricultural buildings' },
    { value: 'renewableEnergy', label: 'Renewable energy'},
    { value: 'agritourism', label: 'Agritourism' },
    { value: 'wood', label: ' Wood and Forestry'},
    { value: 'ecoFood', label: 'Eco food'  },
    { value: 'garden', label: 'Gardening and Garden equipment,' },
    { value: 'consulting', label: 'Agricultural consulting,'},
    { value: 'farms', label: 'Farms,'},
    { value: 'waste', label: ' Waste and Cleanliness,'},
    { value: 'organizations', label: 'Agricultural organizations and agricultural education,'},
    { value: 'other', label: 'Other services for agriculture,'},
  ];