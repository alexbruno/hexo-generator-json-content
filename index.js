hexo.extend.generator.register(hexo_generator_json_content);

function hexo_generator_json_content(locals) {
  var json = {
    meta: {
      title: hexo.config.title,
      subtitle: hexo.config.subtitle,
      description: hexo.config.description,
      author: hexo.config.author,
      url: hexo.config.url,
    },
    posts: [],
    pages: []
  };
  
  locals.pages.each(function (page) {
    var item = {
      title: page.title,
      date: page.date,
      updated: page.updated,
      comments: page.comments,
      permalink: page.permalink
    };
    
    json.pages.push(item);
  });
  
  locals.posts.sort('-date').each(function (post) {
    if (!post.published) return;
    
    var item = {
      title: post.title,
      date: post.date,
      updated: post.updated,
      published: post.published,
      comments: post.comments,
      permalink: post.permalink,
      tags: [],
      categories: []
    };
    
    post.tags.each(function (tag) {
      item.tags.push({
        name: tag.name,
        slug: tag.slug,
        permalink: tag.permalink
      });
    });
    
    post.categories.each(function (cat) {
      item.categories.push({
        name: cat.name,
        slug: cat.slug,
        permalink: cat.permalink
      });
    });
    
    json.posts.push(item);
  });
  
  return hexo.route.set('content.json', JSON.stringify(json));
}