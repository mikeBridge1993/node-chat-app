var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage Tests', () => {
   it('should generate correct message object', () => {
       var obj = generateMessage("Admin", "Welcome");
       
       expect(obj.from).toBe('Admin');
       expect(obj.text).toBe('Welcome');
       expect(typeof(obj.createdAt)).toBe('number');
   });
});

describe('generateLocationMessage Tests', () => {
   it('should generate correct location object', () => {
       var obj = generateLocationMessage("Admin", 35, 34);
       
       expect(obj.from).toBe('Admin');
       expect(obj.url).toBe('https://www.google.com/maps?q=35,34');
       expect(typeof(obj.createdAt)).toBe('number');
   });
});