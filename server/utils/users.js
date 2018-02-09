class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        
        function getColor() {
             var index =  Math.floor(Math.random() * 10) + 1;
             var color = ['#FF6633', '#FFB399', '#FF33FF', 'red', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D'][index];
             return color;
        }
        
        var user = {id, name, room, color: getColor()};
        
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