function createAssetTags(assetsURL) {
  const tags = {};
  if (assetsURL.js) tags.js = `script(src='${assetsURL.js}')`;
  if (assetsURL.css) tags.css = `link(href='${assetsURL.css}' type='text/css')`;
  return tags;
}

exports.extractor = function(source) {
  var included = source.match(/include.*/g);
  if(!included) return [];
  var res = [];
  included.forEach(function (element) {
    res.push(element.slice('include '.length, element.length));
  });
  return res;
}

exports.injector = function(template, assetsURL) {
  const htmlRegExp = /\n\s*html\n/i;
  const headRegExp = /\n\s*head\n/i;
  const bodyRegExp = /\n\s*body\n(.*\n|.*)*/i;
  const assetTags = createAssetTags(assetsURL);
  let injected = template;

  if (assetTags.js) {
    if (bodyRegExp.test(injected)) {
      injected = injected.replace(bodyRegExp, match => `${match}\n        ${assetTags.js}`);
    }
  }

  if (assetTags.css) {
    if (headRegExp.test(injected)) {
      injected = injected.replace(headRegExp, match => `${match}        ${assetTags.css}\n`);
    }
  }
  return injected;
}