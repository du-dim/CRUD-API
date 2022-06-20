import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./src/__tests/**'],
    exclude: ['.src/_data.json']
  }
});
