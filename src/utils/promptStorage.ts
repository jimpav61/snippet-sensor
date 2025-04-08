
// Helper functions for managing saved prompts in local storage

export interface SavedPrompt {
  id: string;
  name: string;
  originalPrompt: string;
  optimizedPrompt: string;
  createdAt: number;
  score?: number | null;
}

const STORAGE_KEY = 'saved_prompts';

// Get all saved prompts
export const getSavedPrompts = (): SavedPrompt[] => {
  try {
    const savedPrompts = localStorage.getItem(STORAGE_KEY);
    return savedPrompts ? JSON.parse(savedPrompts) : [];
  } catch (error) {
    console.error('Error getting saved prompts:', error);
    return [];
  }
};

// Save a new prompt
export const savePrompt = (prompt: Omit<SavedPrompt, 'id' | 'createdAt'>): SavedPrompt => {
  try {
    const savedPrompts = getSavedPrompts();
    
    const newPrompt: SavedPrompt = {
      ...prompt,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...savedPrompts, newPrompt]));
    return newPrompt;
  } catch (error) {
    console.error('Error saving prompt:', error);
    throw new Error('Failed to save prompt');
  }
};

// Delete a saved prompt
export const deletePrompt = (id: string): boolean => {
  try {
    const savedPrompts = getSavedPrompts();
    const updatedPrompts = savedPrompts.filter(prompt => prompt.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrompts));
    return true;
  } catch (error) {
    console.error('Error deleting prompt:', error);
    return false;
  }
};

// Update a saved prompt
export const updatePrompt = (id: string, updatedData: Partial<SavedPrompt>): boolean => {
  try {
    const savedPrompts = getSavedPrompts();
    const updatedPrompts = savedPrompts.map(prompt => 
      prompt.id === id ? { ...prompt, ...updatedData } : prompt
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrompts));
    return true;
  } catch (error) {
    console.error('Error updating prompt:', error);
    return false;
  }
};
