import moment from 'moment'
import { extract } from 'keyword-extractor'
import { stripHTML } from 'hexo-util'

export function has (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function minify (str) {
  return stripHTML(str).trim().replace(/\s+/g, ' ')
}

export function getProps (ref) {
  return Object.getOwnPropertyNames(ref).filter(item => ref[item])
}

export function catags ({ name, slug, permalink }) {
  return { name, slug, permalink }
}

export function getKeywords (str, language) {
  const keywords = extract(str, {
    language,
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true
  })

  return keywords.join(' ')
}

export function setContent (obj, item, ref, cfg) {
  switch (item) {
    case 'excerpt':
      obj.excerpt = minify(ref.excerpt)
      break

    case 'text':
      obj.text = minify(ref.content)
      break

    case 'keywords':
      if (cfg.keywords) {
        const excerpt = minify(ref.excerpt)
        obj.keywords = getKeywords(excerpt, cfg.keywords)
      }
      break

    case 'categories':
      obj.categories = ref.categories.map(catags)
      break

    case 'tags':
      obj.tags = ref.tags.map(catags)
      break

    case 'date':
      obj.date = cfg.dateFormat ? moment(ref.date).format(cfg.dateFormat) : ref.date
      break

    case 'updated':
      obj.updated = cfg.dateFormat ? moment(ref.updated).format(cfg.dateFormat) : ref.updated
      break

    default:
      obj[item] = ref[item]
  }

  return obj
}

export function reduceContent (names, content, cfg) {
  return names.reduce((obj, item) => setContent(obj, item, content, cfg), {})
}
