# hexo-generator-json-content

Hexo (https://hexo.io/) plugin to generate a JSON file for generic use or consumption with the contents of posts and pages.

It's useful to serve compact and agile content data for microservices like AJAX site search, Twitter typeahead, or public API.

## Installation

```bash
npm i -S hexo-generator-json-content
```

## Usage

Hexo will run the generator *automagically* when you run `hexo serve` or `hexo generate`.
:)

Using the default settings, the `content.json` file will have the following structure:

```javascript
meta: {
	title: hexo.config.title,
	subtitle: hexo.config.subtitle,
	description: hexo.config.description,
	author: hexo.config.author,
	url: hexo.config.url
},
pages: [{ //-> all pages (optional, configurable)
  title: page.title,
  slug: page.slug,
  date: page.date,
  updated: page.updated,
  comments: page.comments,
  permalink: page.permalink,
  path: page.path,
  excerpt: page.excerpt //-> only text ;-)
  text: page.content, //-> only text minified ;-)
  raw: page.raw, //-> original MD (optional, configurable)
  content: page.content //-> final HTML (optional, configurable)
}],
posts: [{ //-> only published posts (optional, configurable)
	title: post.title,
  slug: post.slug,
  date: post.date,
  updated: post.updated,
  comments: post.comments,
  permalink: post.permalink,
  path: post.path,
  excerpt: post.excerpt, //-> only text ;-)
  text: post.content, //-> only text minified ;-)
  raw: post.raw, //-> original MD (optional, configurable)
  content: post.content, //-> final HTML (optional, configurable)
  categories: [{
    name: category.name,
    slug: category.slug,
    permalink: category.permalink
  }],
  tags: [{
    name: tag.name,
    slug: tag.slug,
    permalink: tag.permalink
  }]
}]
```

## Configuration

You can configure some options in `_config.yml` to generate `content.json`.

Default options are as follows:

```yaml
jsonContent:
  meta: true
  pages:
    raw: false
    content: false
    title: true
    slug: true
    date: true
    updated: true
    comments: true
    path: true
    link: true
    permalink: true
    excerpt: true
    text: true
    stopwords: true
  posts:
    raw: false
    content: false
    title: true
    slug: true
    date: true
    updated: true
    comments: true
    path: true
    link: true
    permalink: true
    excerpt: true
    text: true
    categories: true
    tags: true
    stopwords: true
```

The `raw` option includes original MARKDOWN string and `content` option includes final HTML string.

You can also exclude meta, pages, or posts contents from `content.json` by setting `meta`, `pages`, or `posts` to `false`.

`meta` enables or disables including the `meta` section of the json
`pages` enables or disables including the `pages` section of the json
`posts` enables or disables including the `posts` section of the json

To exclude individual fields from output, set their config values to `false`.

## Output Formats

By default, the json output will include the `meta`, `pages`, and `posts` sections. If only 1 section is enabled by config, the json output will consist of a single array.

For example, the following config enables only `posts`, showing the title, date, path, and text fields:

```yaml
jsonContent:
  meta: false
  pages: false
  posts:
    title: true
    date: true
    path: true
    text: true
    raw: false
    content: false
    slug: false
    updated: false
    comments: false
    link: false
    permalink: false
    excerpt: false
    categories: false
    tags: false
    stopwords: false
```

The result content.json will include the following format:

```javascript
[{ //-> only published posts (optional, configurable)
  title: post.title,
  date: post.date,
  text: post.content, //-> text will consist of keywords only, with stopwords removed
  path: post.path
}]
```

## Excluding stopwords

Stopwords can be excluded from the `text` and `excerpt` fields by setting the config value for `stopwords` to `false`. In this case, the text will be stripped down to space-delimited keywords.

## Examples of use

Coming soon...