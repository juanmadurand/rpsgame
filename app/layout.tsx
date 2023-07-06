import './globals.css';
import { Inter } from 'next/font/google';
import Theme from './theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RPS Game',
  description: 'RPS Game - Have fun!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
