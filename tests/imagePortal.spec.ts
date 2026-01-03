import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import imagePortal from '~/components/imagePortal.vue';
import type { PkmnState } from '~/utils/types';

describe('imagePortal.vue', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    types: [
      { slot: 1, type: { name: 'grass' } },
      { slot: 2, type: { name: 'poison' } },
    ],
    abilities: [{ ability: { name: 'overgrow' } }],
    sprites: {
      other: {
        official_artwork: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        },
      },
    },
    stats: [
      { base_stat: 45, effort: 0, stat: { name: 'hp', url: '' } },
    ],
    moves: [{ move: { name: 'tackle', url: '' } }],
  } as PkmnState;

  it('renders pokemon image with correct src', () => {
    const wrapper = mount(imagePortal, {
      props: {
        pokemon: mockPokemon,
      },
    });
    const img = wrapper.find('img');
    expect(img.attributes('src')).toContain('1.png');
  });

  it('displays pokemon id and name correctly', () => {
    const wrapper = mount(imagePortal, {
      props: {
        pokemon: mockPokemon,
      },
    });
    expect(wrapper.text()).toContain('#001');
    expect(wrapper.text()).toContain('Bulbasaur');
  });

  it('renders all type badges', () => {
    const wrapper = mount(imagePortal, {
      props: {
        pokemon: mockPokemon,
      },
    });
    const badges = wrapper.findAll('span');
    expect(badges.length).toBeGreaterThanOrEqual(2);
    expect(wrapper.text()).toContain('grass');
    expect(wrapper.text()).toContain('poison');
  });

  it('handles pokemon with single type', () => {
    const singleTypePokemon = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      types: [{ slot: 1, type: { name: 'electric' } }],
      abilities: [{ ability: { name: 'static' } }],
      sprites: {
        other: {
          official_artwork: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
          },
        },
      },
      stats: [
        { base_stat: 35, effort: 0, stat: { name: 'hp', url: '' } },
      ],
      moves: [{ move: { name: 'thunderbolt', url: '' } }],
    } as PkmnState;
    const wrapper = mount(imagePortal, {
      props: {
        pokemon: singleTypePokemon,
      },
    });
    expect(wrapper.text()).toContain('electric');
  });

  it('renders with safe fallback for missing type data', () => {
    const noTypePokemon = {
      id: 100,
      name: 'voltorb',
      height: 5,
      weight: 104,
      types: [{ slot: 1, type: { name: null } }],
      abilities: [{ ability: { name: 'soundproof' } }],
      sprites: {
        other: {
          official_artwork: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/100.png',
          },
        },
      },
      stats: [
        { base_stat: 40, effort: 0, stat: { name: 'hp', url: '' } },
      ],
      moves: [{ move: { name: 'swift', url: '' } }],
    } as PkmnState;
    const wrapper = mount(imagePortal, {
      props: {
        pokemon: noTypePokemon,
      },
    });
    expect(wrapper.text()).toContain('unknown');
  });
});