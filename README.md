
#hexo-generator-json-content

Hexo (https://hexo.io/) plugin to generate a JSON file for generic use or consumption with the contents of posts and pages.

It's useful to serve compact and agile content data for microservices like AJAX site search or public API.

##Installation

```bash
npm install --save hexo-generator-json-content
```

##Usage

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
pages: [{
	title: page.title,
  slug: page.slug,
  date: page.date,
  updated: page.updated,
  comments: page.comments,
  permalink: page.permalink,
  content: page.raw //-> minified
}],
posts: [{ //-> only published posts
	title: post.title,
  slug: post.slug,
  date: post.date,
  updated: post.updated,
  comments: post.comments,
  permalink: post.permalink,
  content: post.raw //-> minified,
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

##Examples of use:

Coming soon...