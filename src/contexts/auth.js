import React, { createContext } from 'react';

const UserContext = createContext();

function UserProvider({ auth, children }) {
    return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
