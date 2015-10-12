hexo.extend.generator.register(hexo_generator_json_content);

function hexo_generator_json_content(site) {
  var stripe = function (str) {
      return str.replace(/(<([^>]+)>)/ig, '');
    },
    minify = function (str) {
      return str.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
    },
    cfg = hexo.config.hasOwnProperty('jsonContent') ? hexo.config.jsonContent : {},
    pages = cfg.hasOwnProperty('pages') ? cfg.pages : { raw: false, content: false },
    posts = cfg.hasOwnProperty('posts') ? cfg.posts : { raw: false, content: false },
    json = {
      meta: {
        title: hexo.config.title,
        subtitle: hexo.config.subtitle,
        description: hexo.config.description,
        author: hexo.config.author,
        url: hexo.config.url,
      }
    };
  
  if (pages)
    json.pages = site.pages.map(function (page) {
      return {
        title: page.title,
        slug: page.slug,
        date: page.date,
        updated: page.updated,
        comments: page.comments,
        path: page.path,
        link: page.link,
        permalink: page.permalink,
        excerpt: stripe(page.excerpt),
        text: minify(stripe(page.content)),
        raw: pages.raw ? page.raw : null,
        content: pages.content ? page.content : null
      };
    });
  
  if (posts)
    json.posts = site.posts.sort('-date').filter(function (post) {
      return post.published;
    }).map(function (post) {
      return {
        title: post.title,
        slug: post.slug,
        date: post.date,
        updated: post.updated,
        comments: post.comments,
        path: post.path,
        link: post.link,
        permalink: post.permalink,
        excerpt: stripe(post.excerpt),
        text: minify(stripe(post.content)),
        raw: posts.raw ? post.raw : null,
        content: posts.content ? post.content : null,
        categories: post.categories.map(function (cat) {
          return {
            name: cat.name,
            slug: cat.slug,
            permalink: cat.permalink
          };
        }),
        tags: post.tags.map(function (tag) {
          return {
            name: tag.name,
            slug: tag.slug,
            permalink: tag.permalink
          };
        })
      };
    });
  
  return {
    path: 'content.json',
    data: JSON.stringify(json)
  };
}