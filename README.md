# hexo-generator-json-content

Hexo (<https://hexo.io/>) plugin to generate a JSON file for generic use or consumption with the contents of posts and pages.

It's useful to serve compact and agile content data for microservices like AJAX site search, Twitter typeahead or public API.

<!-- vscode-markdown-toc -->
* [News](#News)
* [Installation](#Installation)
* [Usage](#Usage)
* [Settings](#Settings)
	* [Defaults](#Defaults)
	* [Keywords](#Keywords)
	* [Date formats](#Dateformats)
* [Output](#Output)
	* [Sections](#Sections)
	* [Excluding fields](#Excludingfields)
	* [Drafts](#Drafts)
	* [Skip indexing](#Skipindexing)
	* [Custom file name](#Customfilename)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='News'></a>News

To know new features and bugfixes, please visit [releases index](https://github.com/alexbruno/hexo-generator-json-content/releases).

## <a name='Installation'></a>Installation

```bash
npm i -S hexo-generator-json-content
```

## <a name='Usage'></a>Usage

Hexo will run the generator _automagically_ when you run `hexo serve` or `hexo generate`. :smirk:

Using the default settings, the `content.json` file looks like the following structure:

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
  keywords: null, //-> it needs settings
  text: page.content, //-> only text minified ;)
  raw: page.raw, //-> original MD content
  content: page.content, //-> final HTML content
  author: page.author,
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
}],
posts: [{ //-> only published posts
  title: post.title,
  slug: post.slug,
  date: post.date,
  updated: post.updated,
  comments: post.comments,
  permalink: post.permalink,
  path: post.path,
  excerpt: post.excerpt, //-> only text minified ;)
  description: post.description, //-> only text minified ;)
  keywords: null, //-> it needs settings
  text: post.content, //-> only text minified ;)
  raw: post.raw, //-> original MD content
  content: post.content, //-> final HTML content
  author: post.author,
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
}],
categories: [{ //-> Posts categories index ;)
  name: category.name,
  slug: category.slug,
  permalink: category.permalink
}],
tags: [{ //-> Posts tags index ;)
  name: tag.name,
  slug: tag.slug,
  permalink: tag.permalink
}]
```

`hexo.util.stripHTML` is used to get only clean text for `excerpt` and `text` fields.

## <a name='Settings'></a>Settings

You can customize settings in `_config.yml`.

### <a name='Defaults'></a>Defaults

Default settings are:

```yaml
jsonContent:
  meta: true
  dafts: false
  file: content.json
  keywords: undefined
  dateFormat: undefined
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
    keywords: false
    text: true
    raw: false
    content: false
    author: true
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
    keywords: false
    text: true
    raw: false
    content: false
    author: true
    categories: true
    tags: true
```

### <a name='Keywords'></a>Keywords

`keywords` options extracts keywords from excerpt.

Setting the root `keywords` option will automatically reflect to `pages.keywords` and `posts.keywords`. But you can ignore one by setting it to `false` explicitly.

It is powered by [michaeldelorenzo/keyword-extractor](https://github.com/michaeldelorenzo/keyword-extractor), NPM package to create a keywords array from a string by removing stopwords.

So, the setting value should be a valid language from its [options parameters](https://github.com/michaeldelorenzo/keyword-extractor#options-parameters).

```yaml
# exemple
jsonContent:
  meta: true
  keywords: french
```

If it don't support your language, no worry! It's disabled by default.

### <a name='Dateformats'></a>Date formats

`dateFormat` option sets an output format for datetime objects `date` and `updated`.

It is powered by [moment](https://github.com/moment/moment/), so any string accepted by [format](http://momentjs.com/docs/#/displaying/format/) method can be used.

```yaml
# exemple
jsonContent:
  meta: true
  dateFormat: DD/MM/YYYY
```

If not defined, default format is the `JSON.stringify` result for `Date` objects.

## <a name='Output'></a>Output

### <a name='Sections'></a>Sections

By default, the JSON output includes `meta`, `pages` and `posts` sections. If only one of these sections is enabled by config, the json output will consist of a single array.

For example, the following config enables only `posts`, showing title, date, path, and text fields:

```yaml
# exemple
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
    author: false
```

The result JSON will look like this:

```javascript
[{ //-> only published posts
  title: post.title,
  date: post.date,
  text: post.content, //-> only text minified ;)
  path: post.path
}]
```

### <a name='Excludingfields'></a>Excluding fields

You can exclude `meta`, `pages` or `posts` contents from output JSON by setting `meta`, `pages`, or `posts` to `false`.

To exclude individual fields from `pages` or `posts` output, set its config values to `false`.

### <a name='Drafts'></a>Drafts

By default, drafts are automatically skipped from indexing.

If you want to include drafts, set `drafts: true`:

```yaml
# exemple
jsonContent:
  drafts: true
```

### <a name='Skipindexing'></a>Skip indexing

Any `post` or `page` protected with password will be automatically skipped from indexing.

You can also exclude a specific `post` or `page` by setting `hidden: true` on front-matter.

To exclude specific paths or tags, use `ignore` lists. Any path or tag which contains at least one of the listed substrings will be skipped from indexing. For example:

```yaml
# exemple
jsonContent:
  ignore:
    paths:
      - path/to/a/page
      - url/to/one/post
      - an-entire-category
      - specific.file
      - .ext # a file extension
    tags:
      - tag1
      - tag2
```

Also, you can set `hidden: false` to override all the rules mentioned above.

### <a name='Customfilename'></a>Custom file name

By default, the output file is `content.json`, but is possible to customize the file name:

```yaml
# exemple
jsonContent:
  file: custom-file-name.json
```
