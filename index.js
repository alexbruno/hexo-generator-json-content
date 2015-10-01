hexo.extend.generator.register(hexo_generator_json_content);

function hexo_generator_json_content(locals) {
  var json = {
    config: hexo.config,
    posts: [],
    pages: []
  };
  
  locals.posts.sort('-date').each(function (post) {
    json.posts.push(post);
  });
  
  locals.pages.each(function (page) {
    json.pages.push(page);
  });
  
  return hexo.route.set('content.json', JSON.stringify(json));
}