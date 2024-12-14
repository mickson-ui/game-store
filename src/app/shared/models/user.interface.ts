/**
 * Represents a user in the game store system
 */
export interface User {
  id?: string;              // Required from the server
  email: string;           // Required for registration
  username?: string;       // Optional, not returned in this response
  firstName?: string;      // Optional fields
  lastName?: string;
  country?: string;
  subscribe?: boolean;
  createdAt?: Date;
  lastLogin?: Date;
  isOnline?: boolean;      // Optional flag
}

/**
 * Response structure for authentication operations
 */
export interface AuthResponse {
  user: User;               // The authenticated user's data
  tokenDto: {               // Token details
    token: string;          // JWT token
    expiresIn: string;      // Expiration time
  };
  isSuccessful: boolean;    // Indicates if the operation was successful
  responseMessage: string;  // Response message
  responseCode: string;     // Server response code
}
