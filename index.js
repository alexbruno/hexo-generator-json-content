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
    var pagesPropertyNames = Object.getOwnPropertyNames(pages).filter(function (item) {
      return pages[item];
    });
    content = site.pages.map(function (page) {
      var actualPage = {};
      pagesPropertyNames.forEach(function(item){
        if (item === 'excerpt') {
          actualPage[item] = minify(page.excerpt);
        } else if (item === 'text') {
          actualPage[item] = minify(page.content);
        } else if (item === 'keywords' && cfg.keywords) {
          actualPage[item] = getKeywords(minify(page.excerpt));
        } else {
          actualPage[item] = page[item];
        }
      });
      return actualPage;
    });

    if (posts || cfg.meta)
        json.pages = content;
    else
        json = content;
  }

  if (posts) {
    var postsPropertyNames = Object.getOwnPropertyNames(posts).filter(function (item) {
      return posts[item];
    });
    content = site.posts.sort('-date').filter(function (post) {
      return post.published;
    }).map(function (post) {
      var actualPost = {};
      postsPropertyNames.forEach(function(item){
        if (item === 'excerpt') {
          actualPost[item] = minify(post.excerpt);
        } else if (item === 'text') {
          actualPost[item] = minify(post.content);
        } else if (item === 'categories') {
          actualPost[item] = post.categories.map(function (cat) {
            return {
              name: cat.name,
              slug: cat.slug,
              permalink: cat.permalink
            };
          });
        } else if (item === 'tags') {
          actualPost[item] = post.tags.map(function (tag) {
            return {
              name: tag.name,
              slug: tag.slug,
              permalink: tag.permalink
            };
          });
        } else if (item === 'keywords' && cfg.keywords) {
          actualPost[item] = getKeywords(minify(post.excerpt));
        } else {
          actualPost[item] = post[item];
        }
      });
      return actualPost;
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
