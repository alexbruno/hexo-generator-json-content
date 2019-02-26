import defaults from './modules/defaults'
import { isIgnored, ignoreSettings } from './modules/ignore'
import { getProps, reduceContent } from './modules/utils'

const { config } = hexo
const json = config.jsonContent || { meta: true }

const pages = json.hasOwnProperty('pages') ? json.pages : defaults.pages

const posts = json.hasOwnProperty('posts') ? json.posts : defaults.posts

const ignore = ignoreSettings(json)

let output = json.meta ? {
  meta: {
    title: config.title,
    subtitle: config.subtitle,
    description: config.description,
    author: config.author,
    url: config.url,
    root: config.root
  }
} : {}

hexo.extend.generator.register('json-content', site => {
  if (pages) {
    const pagesNames = getProps(pages)
    const pagesValid = site.pages.filter(page => !isIgnored(page, ignore))
    const pagesContent = pagesValid.map(page => reduceContent(pagesNames, page, json))

    if (posts || json.meta) {
      output.pages = pagesContent
    } else {
      output = pagesContent
    }
  }

  if (posts) {
    const postsNames = getProps(posts)
    const postsSorted = site.posts.sort('-date')
    const postsValid = postsSorted.filter(post => post.published && !isIgnored(post, ignore))
    const postsContent = postsValid.map(post => reduceContent(postsNames, post, json))

    if (pages || json.meta) {
      output.posts = postsContent
    } else {
      output = postsContent
    }
  }

  return {
    path: json.file || 'content.json',
    data: JSON.stringify(output)
  }
})
