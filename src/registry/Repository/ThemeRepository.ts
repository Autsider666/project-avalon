import {BaseRepository} from "@/registry/Repository/BaseRepository";

export const themes: string[] = [
    'system',
    'dark',
    'light',
] as const;

export const ThemeRepository = new BaseRepository<{ theme: string, keywords: string[] }>(
    async () => themes.map(theme => ({theme, keywords: ['theme']})),
    {
        includeScore: true,
        includeMatches: true,
        keys: [
            'theme',
            'keywords',
        ]
    },
);