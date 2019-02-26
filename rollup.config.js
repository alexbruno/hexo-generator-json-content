const external = [
  'hexo-util',
  'keyword-extractor',
  'moment'
]

export default [{
  external,
  input: 'src/module.js',
  output: {
    format: 'esm',
    file: 'dist/module.js'
  }
}, {
  external,
  input: 'src/module.js',
  output: {
    format: 'cjs',
    file: 'dist/main.js'
  }
}]
