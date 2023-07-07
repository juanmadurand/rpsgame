import { WeaponType } from '@/types';

export const Weapons = [
  {
    type: WeaponType.ROCK,
    defeats: [WeaponType.SCISSORS],
  },
  {
    type: WeaponType.PAPER,
    defeats: [WeaponType.ROCK],
  },
  {
    type: WeaponType.SCISSORS,
    defeats: [WeaponType.PAPER],
  },
];

// Seconds
export const PLAY_TIMEOUT = 3;
