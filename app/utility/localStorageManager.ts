// TODO: Does this need try/catch
// TODO: IF not explore how to check if token created sucessfully or not? 
// Could I use getTokenFromLocalStorage to check clearAuthTokenFromLocalStorage and createNewTokenInLocalStorage

export const getTokenFromLocalStorage = (): string | null => {
    const token = localStorage.getItem('authToken');
    return token ? token : null;
};

export const clearAuthTokenFromLocalStorage = (): boolean => {
    localStorage.removeItem('authToken');
    return true;
};

export const createNewTokenInLocalStorage = (token: string): boolean => {
    localStorage.setItem('authToken', token);
    return true;
};