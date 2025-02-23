export interface PkmnState {
  name: string | null;
  height: number | null;
  id: number | null;
  abilities: [
    {
      ability: {
        name: string | null;
      };
    },
  ];
  sprites: {
    other?: {
      official_artwork: {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: [
    {
      slot: number | null;
      type: {
        name: string;
      };
    },
  ];
  weight: number | null;
  moves: {
    move: {
      name: string | null;
      url: string | null;
    };
  }[];
}

export interface Evolutions {
  chain: {
    evolves_to: [
      {
        species: {
          name: string | null;
        };
        evolves_to: [
          {
            species: {
              name: string | null;
            };
          },
        ];
      },
    ];
  };
}

export interface EvoName {
  firstForm: string | null;
  secondForm: string | null;
}

export interface PkmnSpecies {
  flavor_text_entries: Array<{
    flavor_text: string | null;
  } | null> | null;
}