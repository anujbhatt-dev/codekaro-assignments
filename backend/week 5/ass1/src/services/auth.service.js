const userMap = new Map();

function setUser(uid,user){
    userMap.set(uid,user);
}

function getUser(uid){
    const user = userMap.get(uid);
    if(!user) return null;
    return user;
}

module.exports = {setUser, getUser}