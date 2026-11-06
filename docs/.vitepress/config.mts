import {defineConfig} from 'vitepress';
import {nav, sidebar} from './navigation.mjs';

export default defineConfig({
    base: process.env.DOCS_BASE ?? '/',
    "title": "OpenSSH JS",
    "description": "Turn OpenSSH configuration into inspectable profiles, resolve host aliases and jump hosts, and write explicitly managed Host blocks.",
    "lang": "en-US",
    "appearance": false,
    "cleanUrls": false,
    "markdown": {
        "theme": "github-dark-high-contrast"
    },
    "head": [
        [
            "meta",
            {
                "name": "theme-color",
                "content": "#171a1d"
            }
        ]
    ],
    "themeConfig": {
        "siteTitle": "OpenSSH JS",
        "nav": nav,
        "sidebar": sidebar,
        "search": {
            "provider": "local"
        },
        "outline": [
            2,
            3
        ],
        "socialLinks": [
            {
                "icon": "github",
                "link": "https://github.com/h2ooooooo/openssh-js"
            }
        ],
    }
});
