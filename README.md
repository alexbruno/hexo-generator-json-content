# hexo-generator-json-content

Hexo (https://hexo.io/) plugin to generate a JSON file for generic use or consumption with the contents of posts and pages.

It's useful to serve compact and agile content data for microservices like AJAX site search, Twitter typeahead or public API.

## Installation

```bash
npm i -S hexo-generator-json-content
```

## Usage

Hexo will run the generator *automagically* when you run `hexo serve` or `hexo generate`.
:smirk:

Using the default settings, the `content.json` file will have the following structure:

```javascript
meta: {
	title: hexo.config.title,
	subtitle: hexo.config.subtitle,
	description: hexo.config.description,
	author: hexo.config.author,
	url: hexo.config.url
},
pages: [{ //-> all pages
  title: page.title,
  slug: page.slug,
  date: page.date,
  updated: page.updated,
  comments: page.comments,
  permalink: page.permalink,
  path: page.path,
  excerpt: page.excerpt, //-> only text ;)
  keywords: null //-> it needs settings
  text: page.content, //-> only text minified ;)
  raw: page.raw, //-> original MD content
  content: page.content //-> final HTML content
}],
posts: [{ //-> only published posts
	title: post.title,
  slug: post.slug,
  date: post.date,
  updated: post.updated,
  comments: post.comments,
  permalink: post.permalink,
  path: post.path,
  excerpt: post.excerpt, //-> only text ;)
  keywords: null //-> it needs settings
  text: post.content, //-> only text minified ;)
  raw: post.raw, //-> original MD content
  content: post.content, //-> final HTML content
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
  keywords: false # or *keyword-extractor language options
  pages:
    title: true
    slug: true
    date: true
    updated: true
    comments: true
    path: true
    link: true
    permalink: true
    excerpt: true
    keywords: true # it needs root keywords option language
    text: true
    raw: false
    content: false
  posts:
    title: true
    slug: true
    date: true
    updated: true
    comments: true
    path: true
    link: true
    permalink: true
    excerpt: true
    keywords: true # it needs root keywords option language
    text: true
    raw: false
    content: false
    categories: true
    tags: true
```

You can exclude meta, pages or posts contents from `content.json` by setting `meta`, `pages`, or `posts` to `false`.

`meta` enables or disables including the `meta` section of the json.
`pages` enables or disables including the `pages` section of the json.
`posts` enables or disables including the `posts` section of the json.

To exclude individual fields from output, set their config values to `false`.

`keywords` options use [https://github.com/michaeldelorenzo/keyword-extractor](michaeldelorenzo/keyword-extractor) that is a NPM package for creating a keyword array from a string and excluding stop words.

If **keyword-extractor** don't supports your language, don't worry! It's disbled by default.

## Output Formats

By default, the json output includes `meta`, `pages` and `posts` sections. If only one section is enabled by config, the json output will consist of a single array.

For example, the following config enables only `posts`, showing title, date, path, and text fields:

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
```

The result `content.json` will follow this format:

```javascript
[{ //-> only published posts
  title: post.title,
  date: post.date,
  text: post.content, //-> only text minified ;)
  path: post.path
}]
```

## Examples of use

Coming soon...