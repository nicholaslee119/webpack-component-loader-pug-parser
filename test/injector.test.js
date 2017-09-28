import fs from 'fs';
import path from 'path';
import {injector} from '../index';

describe('test injector', function(){
  it('should pass', function(){
    const source = fs.readFileSync(path.resolve(__dirname, './fixture/normal.pug'), 'utf8');
    const assetsURL = {
      js: 'page.js',
      css: 'page.css'
    }
    const injectRes = injector(source, assetsURL);
    expect(injectRes).toContain(assetsURL.js);
    expect(injectRes).toContain(assetsURL.css);
  })

})