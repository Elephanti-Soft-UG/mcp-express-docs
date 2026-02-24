import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'MCP Express',
  tagline: 'Unleash AI Potential with Custom MCP Tools',
  favicon: 'img/favicon.ico',
  future: { v4: true },
  url: 'https://docs.mcp-express.com/',
  baseUrl: '/',
  organizationName: 'Elephanti Soft UG',
  projectName: 'mcp-express-docs',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Elephanti-Soft-UG/mcp-express-docs/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        width: 180,
        height: 180,
        alt: 'MCP Express Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        href: '/docs/category/get-started',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'documentationSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://app.mcp-express.com/login',
          label: 'Login',
          position: 'right',
        },
        {
          href: 'https://app.mcp-express.com/signup',
          label: 'Get Started for Free',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
