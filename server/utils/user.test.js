const expect = require('expect');

const {Users} = require('./users');

describe('user Tests', () => {
    var users;
    
    beforeEach(() => {
        
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });
    
    it('should add new user', () => {
       var users = new Users();
       var user = {
           id: '123',
           name: 'Andrew',
           room: 'The Office fans'
       }
       
       var resUser = users.addUser(user.id, user.name, user.room);
       
       expect(users.users).toEqual([user]);
    });
    
    it('should remove a user', () => {
        var resUser = users.removeUser(1);
        expect(resUser.id).toBe("1");
        expect(users.users.length).toBe(2);
    });
    
    it('should not remove a user', () => {
        var resUser = users.removeUser(5);
        expect(resUser).toBeFalsy();
        expect(users.users.length).toBe(3);
    });
    
    it('should find a user', () => {
        var resUser = users.getUser(users.users[0].id);
        expect(resUser).toEqual(users.users[0]);
    });
    
    it('should not find a user', () => {
        var resUser = users.getUser(5);
        expect(resUser).toEqual();
    });
    
    it('should return node course names', () => {
        var userList = users.getUserList('Node Course');
       
        expect(userList).toEqual(['Mike', 'Julie']);
    });
    
    it('should return react course names', () => {
        var userList = users.getUserList('React Course');
       
        expect(userList).toEqual(['Jen']);
    });
     
});