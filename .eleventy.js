const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginRss);

  // Filters
  eleventyConfig.addNunjucksFilter('ISOString', function(val) {
    return val.toISOString().substring(0, 10);
  });

  // General Config
  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    markdownTemplateEngine: 'njk'
  };
};
