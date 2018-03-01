// var doc = require('./demo.md')
var md = require('markdown-it')();

md.use(require('markdown-it-container'), 'spoiler', {

  validate: function(params) {
    return params.trim().match(/^spoiler\s+(.*)$/);
  },

  render: function (tokens, idx) {
    // ???????????
    console1.log(tokens)
    var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
    if (tokens[idx].nesting === 1) {
      var description = (m && m.length > 1) ? m[1] : '';
      var content = tokens[idx + 1].content;
      var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
      var script = striptags.fetch(content, 'script');
      var style = striptags.fetch(content, 'style');
      var jsfiddle = { html: html, script: script, style: style };
      var descriptionHTML = description
        ? md.render(description)
        : '';

      jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));

      return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                <div class="source" slot="source">${html}</div>
                ${descriptionHTML}
                <div class="highlight" slot="highlight">`;
    }
    return '</div></demo-block>\n';
  }
});

var result = md.render('# markdown-it rulezz!')

console.log(result)