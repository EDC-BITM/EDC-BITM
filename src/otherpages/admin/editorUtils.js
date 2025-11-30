// Editor Content Save/Load Utilities

const STORAGE_KEY = "lexical_editor_content";

/**
 * Save editor content to localStorage
 * @param {Object} editorState - The Lexical editor state
 * @returns {boolean} - Success status
 */
export const saveEditorContent = (editorState) => {
  try {
    const serializedState = JSON.stringify(editorState);
    localStorage.setItem(STORAGE_KEY, serializedState);
    console.log("✅ Content saved successfully");
    return true;
  } catch (error) {
    console.error("❌ Error saving content:", error);
    return false;
  }
};

/**
 * Load editor content from localStorage
 * @returns {Object|null} - The saved editor state or null if not found
 */
export const loadEditorContent = () => {
  try {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
      console.log("✅ Content loaded successfully");
      return JSON.parse(savedContent);
    }
    console.log("ℹ️ No saved content found");
    return null;
  } catch (error) {
    console.error("❌ Error loading content:", error);
    return null;
  }
};

/**
 * Clear saved editor content from localStorage
 * @returns {boolean} - Success status
 */
export const clearEditorContent = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("✅ Content cleared successfully");
    return true;
  } catch (error) {
    console.error("❌ Error clearing content:", error);
    return false;
  }
};

/**
 * Export editor content as JSON file
 * @param {Object} editorState - The Lexical editor state
 * @param {string} filename - The filename for the export
 */
export const exportEditorContent = (
  editorState,
  filename = "editor-content.json"
) => {
  try {
    const serializedState = JSON.stringify(editorState, null, 2);
    const blob = new Blob([serializedState], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log("✅ Content exported successfully");
    return true;
  } catch (error) {
    console.error("❌ Error exporting content:", error);
    return false;
  }
};

/**
 * Import editor content from JSON file
 * @param {File} file - The JSON file to import
 * @returns {Promise<Object|null>} - The imported editor state or null
 */
export const importEditorContent = async (file) => {
  try {
    const text = await file.text();
    const editorState = JSON.parse(text);
    console.log("✅ Content imported successfully");
    return editorState;
  } catch (error) {
    console.error("❌ Error importing content:", error);
    return null;
  }
};

/**
 * Auto-save functionality with debouncing
 * @param {Function} saveFunction - The function to call for saving
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced save function
 */
export const createAutoSave = (saveFunction, delay = 2000) => {
  let timeoutId = null;

  return (editorState) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      saveFunction(editorState);
    }, delay);
  };
};
