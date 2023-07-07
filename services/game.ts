import { Weapons } from '@/config';
import { connectDatabase } from '@/lib/mongodb';
import { Match, MatchResult, PlayGameResult, Weapon } from '@/types';

/**
 * It uses Math.random to return a random weapon
 * @returns {string} the chosen weapon
 */
function getComputerWeapon(): Weapon {
  return Weapons[Math.floor(Math.random() * Weapons.length)];
}

/**
 * Receives the chosen weapon by the user and pc and outputs a match result
 * @returns {MatchResult} The result of the match
 */
function getResult(userWeapon: Weapon, pcWeapon: Weapon): MatchResult {
  if (!userWeapon) {
    throw new Error('Invalid weapon');
  }

  if (pcWeapon.defeats.includes(userWeapon.type)) {
    return MatchResult.LOSE;
  }

  if (userWeapon.defeats.includes(pcWeapon.type)) {
    return MatchResult.WIN;
  }

  return MatchResult.DRAW;
}

async function insertGame(player: string, result: MatchResult, weaponType?: string) {
  const newMatch: Match = {
    player,
    weapon: weaponType || null,
    created_at: new Date(),
    result,
  };
  const db = await connectDatabase();
  await db.collection('games').insertOne(newMatch);
}

export async function timeoutGame(player: string): Promise<MatchResult> {
  await insertGame(player, MatchResult.LOSE);

  return MatchResult.LOSE;
}

export async function playGame(player: string, userWeapon: Weapon): Promise<PlayGameResult> {
  const pcWeapon = getComputerWeapon();
  const result = getResult(userWeapon, pcWeapon);
  await insertGame(player, result, userWeapon.type);

  return { result, userWeaponType: userWeapon.type, pcWeaponType: pcWeapon.type };
}
