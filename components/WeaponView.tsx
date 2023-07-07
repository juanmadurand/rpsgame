import { WeaponType } from '@/types';
import Image from 'next/image';

type Props = {
  weapon: WeaponType;
};

export default function WeaponView({ weapon }: Props) {
  switch (weapon) {
    case WeaponType.ROCK:
      return <Image width={100} height={100} priority src={'/rock.svg'} alt="Rock weapon" />;

    case WeaponType.SCISSORS:
      return (
        <Image width={100} height={100} priority src={'/scissors.svg'} alt="Scissors weapon" />
      );

    case WeaponType.PAPER:
      return <Image width={100} height={100} priority src={'/paper.svg'} alt="Paper weapon" />;

    default:
      return null;
  }
}
