var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage Tests', () => {
   it('should generate correct message object', () => {
       var obj = generateMessage("Admin", "Welcome");
       
       expect(obj.from).toBe('Admin');
       expect(obj.text).toBe('Welcome');
       expect(typeof(obj.createdAt)).toBe('number');
   });
});