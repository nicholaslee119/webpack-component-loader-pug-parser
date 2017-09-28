import fs from 'fs';
import path from 'path';
import {extractor} from '../index';

describe('test extractor', function(){
  it('should pass', function(){
    const source = fs.readFileSync(path.resolve(__dirname, './fixture/normal.pug'), 'utf8');
    const extractRes = extractor(source);
    expect(extractRes[1]).toEqual('includes/foot.pug');
  })
})