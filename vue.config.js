module.exports = {
  devServer: {
    proxy: {
      "^/exec": {
        target:
          "https://script.google.com/macros/s/AKfycbzIxwzO1p326DEhLDkA2yiKSwW3YR0LHN1nUeGC236f9Ta6q_U/",
        ws: true,
        changeOrigin: true
      },
      "^/foo": {
        target: "<other_url>"
      }
    }
  }
};
