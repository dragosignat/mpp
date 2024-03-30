import { test, expect } from '@playwright/experimental-ct-react';
import App  from '../App';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount }) => {
  const app = await mount(<App />);
  const page = app.page;
  await page.waitForSelector('text=Dashboard');
});