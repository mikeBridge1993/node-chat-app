const expect = require('expect');
var {isRealString} = require('./validation.js');

describe('isRealString Tests', () => {
    it('should reject non string values', () => {
       var obj = isRealString({name: "Andrew"});
       expect(obj).toBeFalsy();

    });
    
    it('should reject string with only spaces', () => {
       var obj = isRealString("   ");
       expect(obj).toBeFalsy();
   });
    
    it('should allow string with non space chars', () => {
       var obj = isRealString(" Andrew  ");
       expect(obj).toBeTruthy();
    });
});