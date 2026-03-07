import { createContext, useContext, useState, useEffect } from 'react';

const SavedContext = createContext();

export const useSaved = () => useContext(SavedContext);

export const SavedProvider = ({ children }) => {
    // Initialize from local storage or empty array if none exists
    const [savedProperties, setSavedProperties] = useState(() => {
        const saved = localStorage.getItem('canrent_saved_properties');
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    });

    // Save to local storage whenever state changes
    useEffect(() => {
        localStorage.setItem('canrent_saved_properties', JSON.stringify(savedProperties));
    }, [savedProperties]);

    const addSaved = (property) => {
        setSavedProperties(prev => {
            // Check if already saved to prevent duplicates
            if (prev.find(p => p.id === property.id)) return prev;
            return [...prev, property];
        });
    };

    const removeSaved = (propertyId) => {
        setSavedProperties(prev => prev.filter(p => p.id !== propertyId));
    };

    const isSaved = (propertyId) => {
        return savedProperties.some(p => p.id === propertyId);
    };

    return (
        <SavedContext.Provider value={{ savedProperties, addSaved, removeSaved, isSaved }}>
            {children}
        </SavedContext.Provider>
    );
};
