const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash;
    const splitedUrl = this.urlSplitter(url);
    let afterCombine = this.urlCombiner(splitedUrl);
    return afterCombine == '/explore' ? afterCombine = '/' : afterCombine;
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this.urlSplitter(url);
  },

  urlSplitter(url) {
    const urlsSplits = url.split('/');
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
    };
  },

  urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/')
      + (splitedUrl.id ? '/:id' : '');
  },
};

export default UrlParser;
