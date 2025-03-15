
// This is a simple encryption/decryption utility for URL sharing
// NOTE: This is not cryptographically secure, but good enough for basic privacy

/**
 * Encrypts ballot data for URL sharing
 * @param data Object containing ballot selections
 * @returns Encrypted string
 */
export const encryptBallot = (data: Record<string, string[]>): string => {
  try {
    // Convert data to JSON string
    const jsonString = JSON.stringify(data);
    
    // Base64 encode the string for URL safety
    // Note: In a real app, we would use a proper encryption algorithm
    const encoded = btoa(jsonString);
    
    // Additional obfuscation by reversing the string
    const reversed = encoded.split('').reverse().join('');
    
    return encodeURIComponent(reversed);
  } catch (error) {
    console.error('Error encrypting ballot data:', error);
    return '';
  }
};

/**
 * Decrypts ballot data from URL
 * @param encryptedString The encrypted string from URL
 * @returns Decrypted ballot data object
 */
export const decryptBallot = (encryptedString: string): Record<string, string[]> | null => {
  try {
    // Decode the URI component
    const decoded = decodeURIComponent(encryptedString);
    
    // Reverse the string back
    const unreversed = decoded.split('').reverse().join('');
    
    // Base64 decode
    const jsonString = atob(unreversed);
    
    // Parse JSON
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decrypting ballot data:', error);
    return null;
  }
};
