hexo.extend.generator.register(hexo_generator_json_content);

function hexo_generator_json_content(site) {
  var minify = function (str) {
      return str.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
    },
    json = {
      meta: {
        title: hexo.config.title,
        subtitle: hexo.config.subtitle,
        description: hexo.config.description,
        author: hexo.config.author,
        url: hexo.config.url,
      },
      
      pages: site.pages.map(function (page) {
        return {
          title: page.title,
          slug: page.slug,
          date: page.date,
          updated: page.updated,
          comments: page.comments,
          permalink: page.permalink,
          excerpt: page.excerpt,
          content: minify(page.raw)
        };
      }),
      
      posts: site.posts.sort('-date').filter(function (post) {
        return post.published;
      }).map(function (post) {
        return {
          title: post.title,
          slug: post.slug,
          date: post.date,
          updated: post.updated,
          comments: post.comments,
          permalink: post.permalink,
          excerpt: post.excerpt,
          content: minify(post.raw),
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
      })
    };
  
  return {
    path: 'content.json',
    data: JSON.stringify(json)
  };
}