module.exports = function (eleventyConfig) {
  // Carry existing static assets straight through to the build output
  // untouched, so current <link>/<script> paths keep working as pages
  // get migrated into src/ one at a time.
  eleventyConfig.addPassthroughCopy("imgs");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("*.js");
  eleventyConfig.addPassthroughCopy("*.ttf");

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
