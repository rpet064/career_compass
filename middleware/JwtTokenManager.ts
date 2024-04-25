const jwt = require('jsonwebtoken');

export const createNewToken = (currentUserId: number, currentUsername: string): string => {
    const payload = {
        userId: currentUserId,
        username: currentUsername,
        role: "2" // Set privileges to regular user only
       };
       const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRY_PERIOD });
       return token
}

