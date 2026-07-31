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
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              // SVGO's preset-default includes removeViewBox, which strips
              // viewBox whenever it exactly matches the source SVG's own
              // width/height attributes (treating it as "redundant"). That
              // assumption breaks the moment a consumer resizes the icon via
              // CSS/props to anything other than its native size - without
              // viewBox, the browser can't rescale the path coordinates, so
              // the icon clips instead of scaling. vite-plugin-svgr (used by
              // MeetMedicoComponent's own dev server) doesn't strip it, so
              // this was only ever broken here, not in the real component.
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: { overrides: { removeViewBox: false } },
                  },
                ],
              },
            },
          },
        ],
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
