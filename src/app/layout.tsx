import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

// import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { SpeedInsights } from '@vercel/speed-insights/next';
export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;
import {DataProvider} from '.././contexts/post'
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <DataProvider>
            <ThemeProvider>{children}</ThemeProvider>
           </DataProvider> 
        </LocalizationProvider>
        <SpeedInsights/>
      </body>
    </html>
  );
}
