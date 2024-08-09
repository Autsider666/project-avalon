# Project Avalon

## TODO
- [createPage helper](https://saas-ui.dev/blog/nextjs-create-page-helper-with-loader-pattern)
- Custom Command Palatte
  - Implement animation from cmdk
  - Tabs below/above search to only show specific group, including number of matching results
  - Bar below results explaining "enter to select" "up/down to navigate" "esc to close" etc
- Load code in json inside src
- [Metadata per page](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [getServerContext](https://dev.to/jdgamble555/easy-context-in-react-server-components-rsc-1mdf)
- Check tRPC (https://www.pronextjs.dev/can-i-use-trpc-with-the-nextjs-app-router)
- Theme switcher besides (dark/light) mode switcher
- [Sidebar](https://github.com/salimi-my/shadcn-ui-sidebar)
- [Check middleware](https://nextjs.org/docs/pages/building-your-application/routing/middleware)
- [Preloading data for components](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#preloading-data)
- [Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

## Ideas
- [ ] Move TODO and Ideas to mdx files?
- [ ] Add "Expand up/down" options to the [CodeBlock](src/components/CodeBlock.tsx)
- [ ] Create a section with general tips/tricks, like:
  - [How to handle gitignore](https://git-scm.com/docs/gitignore#_description)
  - Setting up eslint
- [ ] Check [React Live](https://github.com/FormidableLabs/react-live) and [Sandpack](https://github.com/codesandbox/sandpack) for in-browser code experimentation using EX components
- [ ] State management
  - [Zustand](https://docs.pmnd.rs/zustand/guides/nextjs)
  - [Jotai](https://jotai.org/docs/guides/nextjs)
    - [works with tRPC](https://jotai.org/docs/extensions/trpc)
    - [works with Zustand](https://jotai.org/docs/extensions/zustand)
- [ ] Dependency injection
  - https://github.com/vercel/next.js/discussions/46805#discussioncomment-8261261
  - https://javascript.plainenglish.io/next-101-ioc-implementation-with-inversify-29ce548aad3b
  - https://www.youtube.com/watch?v=9Z9uaFEIXt0

## Misc
- [Check Vercel templates for inspiration](https://alejandrocelaya.blog/2023/11/05/build-a-search-page-for-your-astro-static-blog-with-fuse-js/)