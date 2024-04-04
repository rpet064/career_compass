const jwt = require('jsonwebtoken');

const createNewToken = (currentUserId: number, currentUsername: string) => {
    const payload = {
        userId: currentUserId,
        username: currentUsername
       };

       const secretKey = 'yourSecretKey';
       const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

       // TODO: Store token in local storage & database
       console.log(token);
}

const getExistingToken = (currentUserId: number, currentUsername: string) => {
    return
}

const clearExistingToken = (currentUserId: number, currentUsername: string) => {
    return;
} 