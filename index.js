var util = require('hexo-util'), keywords = require('keyword-extractor');

hexo.extend.generator.register('json-content', hexo_generator_json_content);

function hexo_generator_json_content(site) {
    var cfg = hexo.config.hasOwnProperty('jsonContent') ? hexo.config.jsonContent : { meta: true },

    minify = function (str) {
			return util.stripHTML(str).trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
    },

    getKeywords = function (str) {
      return keywords.extract(str, {
        language: cfg.keywords,
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true
      }).join(' ');
    },

    pages = cfg.hasOwnProperty('pages') ? cfg.pages : {
      raw: false,
      content: false,
      title: true,
      slug: true,
      date: true,
      updated: true,
      comments: true,
      path: true,
      link: true,
      permalink: true,
      excerpt: true,
      text: true,
      keywords: true
    },

    posts = cfg.hasOwnProperty('posts') ? cfg.posts : {
      raw: false,
      content: false,
      title: true,
      slug: true,
      date: true,
      updated: true,
      comments: true,
      path: true,
      link: true,
      permalink: true,
      excerpt: true,
      text: true,
      categories: true,
      tags: true,
      keywords: true
    },

    json = cfg.meta ? {
      meta: {
        title: hexo.config.title,
        subtitle: hexo.config.subtitle,
        description: hexo.config.description,
        author: hexo.config.author,
        url: hexo.config.url,
      }
    } : {},
    content;

  if (pages) {
    content = site.pages.map(function (page) {
      return {
        title: pages.title ? page.title : null,
        slug: pages.slug ? page.slug : null,
        date: pages.date ? page.date : null,
        updated: pages.updated ? page.updated : null,
        comments: pages.comments ? page.comments : null,
        path: pages.path ? page.path : null,
        link: pages.link ? page.link : null,
        permalink: pages.permalink ? page.permalink : null,
        excerpt: pages.excerpt ? minify(page.excerpt) : null,
        keywords: cfg.keywords && pages.keywords ? getKeywords(minify(page.excerpt)) : null,
        text: pages.text ? minify(page.content) : null,
        raw: pages.raw ? page.raw : null,
        content: pages.content ? page.content : null
      };
    });

    if (posts || cfg.meta)
        json.pages = content;
    else
        json = content;
  }

  if (posts) {
    content = site.posts.sort('-date').filter(function (post) {
      return post.published;
    }).map(function (post) {
      return {
        title: posts.title ? post.title : null,
        slug: posts.slug ? post.slug : null,
        date: posts.date ? post.date : null,
        updated: posts.updated ? post.updated : null,
        comments: posts.comments ? post.comments : null,
        path: posts.path ? post.path : null,
        link: posts.link ? post.link : null,
        permalink: posts.permalink ? post.permalink : null,
        excerpt: posts.excerpt ? minify(post.excerpt) : null,
        keywords: cfg.keywords && posts.keywords ? getKeywords(minify(post.excerpt)) : null,
        text: posts.text ? minify(post.content) : null,
        raw: posts.raw ? post.raw : null,
        content: posts.content ? post.content : null,
        categories: posts.categories ? post.categories.map(function (cat) {
          return {
            name: cat.name,
            slug: cat.slug,
            permalink: cat.permalink
          };
        }) : null,
        tags: posts.tags ? post.tags.map(function (tag) {
          return {
            name: tag.name,
            slug: tag.slug,
            permalink: tag.permalink
          };
        }) : null
      };
    });

    if (pages || cfg.meta)
        json.posts = content;
    else
        json = content;
  }

  return {
    path: 'content.json',
    data: JSON.stringify(json)
  };
}
