module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksFilter('ISOString', function(val) {
    return val.toISOString().substring(0, 10);
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    markdownTemplateEngine: 'njk'
  };
};
