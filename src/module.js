import defaults from './modules/defaults'
import { isIgnored, ignoreSettings } from './modules/ignore'
import { getProps, has, reduceContent, reduceCategs } from './modules/utils'

const { config } = hexo
const defs = { meta: true }
const opts = config.jsonContent || {}
const json = { ...defs, ...opts }
const pages = has(json, 'pages') ? json.pages : defaults.pages
const posts = has(json, 'posts') ? json.posts : defaults.posts
const ignore = ignoreSettings(json)
const categs = {
  categories: [],
  tags: [],
}

let output = json.meta
  ? {
      meta: {
        title: config.title,
        subtitle: config.subtitle,
        description: config.description,
        author: config.author,
        url: config.url,
        root: config.root,
      },
    }
  : {}

hexo.extend.generator.register('json-content', (site) => {
  if (pages) {
    const pagesProps = getProps(pages)
    const pagesValid = site.pages.filter((page) => !isIgnored(page, ignore))
    const pagesContent = pagesValid.map((page) =>
      reduceContent(pagesProps, page, json),
    )

    if (posts || json.meta) {
      output = Object.assign(output, { pages: pagesContent })

      const { pagesCategs, pagesTags } = reduceCategs(pagesContent)

      categs.categories.push(...pagesCategs)
      categs.tags.push(...pagesTags)
    } else {
      output = pagesContent
    }
  }

  if (posts) {
    const postsProps = getProps(posts)
    const postsSorted = site.posts.sort('-date')
    const postsValid = postsSorted.filter((post) => {
      const include = json.drafts || post.published
      return include && !isIgnored(post, ignore)
    })
    const postsContent = postsValid.map((post) =>
      reduceContent(postsProps, post, json),
    )

    if (pages || json.meta) {
      output = Object.assign(output, { posts: postsContent })

      const { postsCategs, postsTags } = reduceCategs(postsContent)

      categs.categories.push(...postsCategs)
      categs.tags.push(...postsTags)
    } else {
      output = postsContent
    }
  }

  if (pages || posts || json.meta) Object.assign(output, reduceCategs([categs]))

  return {
    path: json.file || 'content.json',
    data: JSON.stringify(output),
  }
})
