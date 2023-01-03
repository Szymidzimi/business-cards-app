export interface CategoryOption {
    readonly value: string;
    readonly label: string;

  }
  
  export const categoryOptions: readonly CategoryOption[] = [
    { value: 'machinery', label: 'Maszyny rolnicze, narzędzia, serwis i części'},
    { value: 'animal', label: 'Produkcja zwierzęca' },
    { value: 'crop', label: 'Produkcja roślinna'},
    { value: 'construction', label: 'Budownictwo rolnicze i budynki rolnicze' },
    { value: 'renewableEnergy', label: 'Energia odnawialna'},
    { value: 'agritourism', label: 'Agroturystyka' },
    { value: 'wood', label: 'Drewno i leśnictwo'},
    { value: 'ecoFood', label: 'Żywność eko'  },
    { value: 'garden', label: 'Ogrodnictwo i sprzęt ogrodniczy' },
    { value: 'consulting', label: 'Doradztwo rolnicze'},
    { value: 'farms', label: 'Farmy'},
    { value: 'waste', label: 'Odpady i czystość'},
    { value: 'organizations', label: 'Organizacje rolnicze i edukacja rolnicza'},
    { value: 'other', label: 'Inne usługi dla rolnictwa'},
  ];