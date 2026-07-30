import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['design-system'],
  webpack(config) {
    // MeetMedicoComponent's own source uses Vite's `@` alias -> its own /src,
    // and imports icons as `*.svg?react` (handled by vite-plugin-svgr there).
    // Mirror both here so the *same* source files work unmodified when
    // transpiled by Next/webpack instead of Vite.
    config.resolve.alias['@'] = path.resolve(__dirname, 'node_modules/design-system/src');

    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    if (fileLoaderRule) {
      // Only hand off to SVGR when the import uses `?react` (matches how
      // MeetMedicoComponent's own source imports icons for Vite). Plain
      // `.svg` imports (e.g. Logo.tsx's `<img src={logo}>` usage) must keep
      // falling through to Next's normal asset handling below.
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push(
      {
        test: /\.svg$/i,
        resourceQuery: /react/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/i,
        resourceQuery: { not: [/react/] },
        type: 'asset/resource',
      }
    );

    return config;
  },
};

export default nextConfig;
