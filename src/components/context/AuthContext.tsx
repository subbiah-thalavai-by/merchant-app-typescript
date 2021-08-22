import React from 'react';
import firebase from 'firebase/app';

// eslint-disable-next-line import/prefer-default-export
export const AuthContext = React.createContext<firebase.User | null>(null);
