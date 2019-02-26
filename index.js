'use strict';
const util = require('hexo-util'),
	moment = require('moment'),
	keywords = require('keyword-extractor'),
	minify = str => util.stripHTML(str).trim().replace(/\n/g, ' ').replace(/\s+/g, ' '),
	getProps = ref => Object.getOwnPropertyNames(ref).filter(item => ref[item]),
	catags = item => {
		return {
			name: item.name,
			slug: item.slug,
			permalink: item.permalink
		}
	}

function parseIgnoreSettings(config) {
	var ignore      = config.ignore ? config.ignore : {};
    ignore.paths    = ignore.paths ? ignore.paths.map(item => item.toLowerCase()) : [];
    ignore.tags     = ignore.tags ? ignore.tags.map(tag => tag.replace('#','').toLowerCase()): [];
    return ignore;
}

function isIgnored(post, ignoreSettings) {
    // Override all rules when it's explicitely mentioned
    if(post.hidden != undefined && post.hidden == false)
        return false;

    if(post.hidden || post.password)
        return true;

    let path = post.path.toLowerCase()
    let pathIgnored = ignoreSettings.paths.find(item => path.includes(item))
    if (pathIgnored)
        return true;

    let postTags = post.tags ? post.tags.map(item => typeof item === 'object' ? item.name.toLowerCase() : item): [];
    let tagIgnored = postTags.filter(tag => ignoreSettings.tags.indexOf(tag) != -1).length > 0;
    if (tagIgnored)
        return true;

    return false;
}

let cfg = hexo.config.jsonContent || { meta: true },
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
			root: hexo.config.root
		}
	} : {},
	ignore = parseIgnoreSettings(cfg),
	getKeywords = str => {
		return keywords.extract(str, {
			language: cfg.keywords,
			remove_digits: true,
			return_changed_case: true,
			remove_duplicates: true
		}).join(' ')
	},
	setContent = (obj, item, ref) => {
		switch (item) {
			case 'excerpt':
				obj.excerpt = minify(ref.excerpt)
				break

			case 'text':
				obj.text = minify(ref.content)
				break

			case 'keywords':
				if (cfg.keywords)
					obj.keywords = getKeywords(minify(ref.excerpt))
				break

			case 'categories':
				obj.categories = ref.categories.map(catags)
				break

			case 'tags':
				obj.tags = ref.tags.map(catags)
				break

			case 'date':
				obj.date = cfg.dateFormat ?
					moment(ref.date).format(cfg.dateFormat) :
					ref.date
				break

			case 'updated':
				obj.updated = cfg.dateFormat ?
					moment(ref.updated).format(cfg.dateFormat) :
					ref.updated
				break

			default:
				obj[item] = ref[item]
		}
		return obj
	}

hexo.extend.generator.register('json-content', site => {
	if (pages) {
		let pagesNames = getProps(pages),
			pagesContent = site.pages.filter(page => {
                return !isIgnored(page, ignore);
			}).map(page => pagesNames.reduce((obj, item) => setContent(obj, item, page), {}))

		if (posts || cfg.meta)
			json.pages = pagesContent
		else
			json = pagesContent
	}

	if (posts) {
		let postsNames = getProps(posts),
			postsContent = site.posts.sort('-date').filter(post => {
				return post.published && !isIgnored(post, ignore);
			}).map(post => postsNames.reduce((obj, item) => setContent(obj, item, post), {}))

		if (pages || cfg.meta)
			json.posts = postsContent
		else
			json = postsContent
	}

	return {
		path: 'content.json',
		data: JSON.stringify(json)
	}
})
