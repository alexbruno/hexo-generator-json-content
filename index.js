hexo.extend.generator.register(hexo_generator_json_content);

function hexo_generator_json_content(locals) {
  var json = {
    config: hexo.config,
    posts: [],
    pages: []
  };
  
  locals.pages.each(function (page) {
    json.pages.push(page);
  });
  
  locals.posts.sort('-date').each(function (post) {
    var tags = [], cats = [];
    
    post.tags.each(function (tag) {
      tags.push(tag);
    });
    
    post.categories.each(function (cat) {
      cats.push(cat);
    });
    
    post.tags = tags;
    post.categories = cats;
    
    json.posts.push(post);
  });
  
  return hexo.route.set('content.json', JSON.stringify(json));
}