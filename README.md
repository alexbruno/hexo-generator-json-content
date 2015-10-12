# hexo-generator-json-content

Hexo (https://hexo.io/) plugin to generate a JSON file for generic use or consumption with the contents of posts and pages.

It's useful to serve compact and agile content data for microservices like AJAX site search or public API.

## Installation

```bash
npm i -S hexo-generator-json-content
```

## Usage

Hexo will run the generator *automagically* when you run `hexo serve` or `hexo generate`.
:)

The `content.json` file will have the following structure:

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
  pages:
    raw: false
    content: false
  posts:
    raw: false
    content: false
```

The `raw` option includes original MARKDOWN string and `content` option includes final HTML string.

You can also exclude pages or posts contents from `content.json` by setting `pages` or `posts` to `false`.

## Examples of use

Coming soon...