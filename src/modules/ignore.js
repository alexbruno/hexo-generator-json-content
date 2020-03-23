export function ignoreSettings(cfg) {
  const ignore = cfg.ignore ? cfg.ignore : {}

  ignore.paths = ignore.paths
    ? ignore.paths.map((path) => path.toLowerCase())
    : []

  ignore.tags = ignore.tags
    ? ignore.tags.map((tag) => tag.replace('#', '').toLowerCase())
    : []

  return ignore
}

export function isIgnored(content, settings) {
  if (content.hidden === false) {
    return false
  }

  if (content.password || content.hidden) {
    return true
  }

  const pathIgnored = settings.paths.find((path) => content.path.includes(path))

  if (pathIgnored) {
    return true
  }

  const tags = content.tags ? content.tags.map(mapTags) : []
  const tagIgnored = tags.filter((tag) => settings.tags.includes(tag)).length

  if (tagIgnored) {
    return true
  }

  return false
}

function mapTags(tag) {
  return typeof tag === 'object' ? tag.name.toLowerCase() : tag
}
