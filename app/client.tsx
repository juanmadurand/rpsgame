'use client';

import { Button } from '@mui/material';
import styles from './page.module.css';
import { logout } from '@/utils/cookies';

type Props = {
  displayName: string;
};

export default function HomeClient({ displayName }: Props) {
  return (
    <main className={styles.main}>
      username: {displayName} <br />
      <Button onClick={() => logout()}>Logout</Button>
    </main>
  );
}
