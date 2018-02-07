class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        var removedUser;
        this.users = this.users.filter((el) => {
            if(el.id != id){
                return true;
            }
            
            removedUser = el;
            return false;
        });
        
        return removedUser;
    }
    getUser (id) {
        return this.users.filter((el) => el.id === id)[0];
    }
    getUserList (room) {
        var users = this.users.filter((el) => {
            return el.room === room;
        });
        var namesArray = users.map((el) => {
           return el.name; 
        });
        
        return namesArray;
    }
}

module.exports = {Users};