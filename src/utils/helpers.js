// Helper utilities

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Failed to copy:', error);
        return false;
    }
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

/**
 * Get category display name
 */
export const getCategoryDisplayName = (categoryId) => {
    const categories = {
        'billing': 'Billing Issues',
        'safety': 'Safety Concerns',
        'unfair-treatment': 'Unfair Treatment',
        'misinformation': 'Misinformation',
        'service': 'Service Problems',
        'general': 'General'
    };
    return categories[categoryId] || categoryId;
};

/**
 * Get difficulty color
 */
export const getDifficultyColor = (difficulty) => {
    const colors = {
        'easy': '#48bb78',
        'medium': '#ed8936',
        'challenging': '#f56565'
    };
    return colors[difficulty] || '#667eea';
};
