hexo.extend.generator.register(hexo_generator_json_content);

function hexo_generator_json_content(locals) {
  return hexo.route.set('content.json', JSON.stringify({
    config: hexo.config,
    posts: locals.posts.sort('-date'),
    pages: locals.pages
  }));
}