import fs from 'fs';

module.exports = class Base {
  static async display(view) {
    if (!view) return 'Not Found';
    try {
      return fs.readFileSync('./src/views/' + view,'utf-8');
    } catch (e) {
      return 'No Such File'
    }
  }

  static assign(tpl, dataObj) {
    return tpl.replace(/{{\s*(.*?)\s*}}/g, function(context, objKey){
      return dataObj[objKey] || '';
    })
  }
};
