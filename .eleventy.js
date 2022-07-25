const path = require('path');

const pluginImage = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginRss);

  // Filters
  eleventyConfig.addNunjucksFilter('ISOString', (date) => {
    console.log("VAGINA", date);
    return date.toISOString().substring(0, 10);
  });
  eleventyConfig.addNunjucksFilter('absoluteURL', function(url) {
    return new URL(url, this.ctx.pkg.homepage).href;
  });

  // Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt) {
    const imagePath = path.join(this.page.inputPath, '..', src);
    let metadata = await pluginImage(imagePath, {
      widths: [640, 960, 1280, 1600],
      formats: ['avif', 'jpeg', 'webp'],
      outputDir: path.join(this.page.outputPath, '..'),
      urlPath: this.page.url,
      filenameFormat: (id, src, width, format, options) => {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    });
  
    let imageAttributes = {
      alt,
      sizes: this.ctx.site.imageSizes,
      loading: 'lazy',
      decoding: 'async',
    };
  
    // Todo: Maybe custom code for custom classes in case an image is in protrait mode
    return pluginImage.generateHTML(metadata, imageAttributes);
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
