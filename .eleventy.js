const pkg = require('./package.json');
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginRss);

  // Filters
  eleventyConfig.addNunjucksFilter('ISOString', (date) => {
    return date.toISOString().substring(0, 10);
  });
  eleventyConfig.addNunjucksFilter('absoluteURL', (url) => {
    return new URL(url, pkg.homepage).href;
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
