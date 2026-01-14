const users = [
    {username: 'john_doe', isActive: true, logins: [{date: '2025-06-20'}, {date: '2025-06-22'}]},
    {username: 'alice_w', isActive: false, logins: [{date: '2025-06-10'}]},
    {username: 'bob99', isActive: true, logins: []},
    {username: 'carol_smith', isActive: true, logins: [{date: '2025-06-21'}]}
];

function logActiveUsers(users){
    const activeUsers = users.filter(users => users.isActive); // 1. Filter only active users
    // return activeUsers.map(users => users.username);  // 2. Map to usernames

    activeUsers.forEach(users => {
        if(users.logins.length > 0) {
            const lastLogin = users.logins[users.logins.length - 1].date;
            console.log(`user: ${users.username}, Last Login: ${lastLogin}`);
        }
        else {
            console.log(`user: ${users.username}, No Logins Found`);
        }
    });
}

// const usernames = logActiveUsers(users);
// console.log(usernames);
logActiveUsers(users);

/* If you are RETURING something, TRY USING ".map" 
   If you are JUST CALLING the FUNCTION  and that FUNCTION IS DOING ALL THE STUFF LATER, THEN you can use ".forEach" */