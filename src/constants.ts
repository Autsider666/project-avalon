export const SiteName: string = 'Project Avalon' as const;

export const BaseUrl: string = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : `http://localhost:${process.env.PORT}` as const;