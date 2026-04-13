import React from 'react';

/**
 * Shared context so the hero section knows when to start its animations.
 * introDone = true → hero can animate in.
 */
export const IntroContext = React.createContext<boolean>(false);
