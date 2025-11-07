# Firebase Prompts Feature Setup

## Overview
The Dashboard now supports:
1. Users can add their own prompts
2. Users can like/unlike prompts
3. Real-time updates for prompts and likes

## Firestore Collections

### Collection: `prompts`
Each prompt document should have the following structure:

```javascript
{
  title: string,              // Title of the prompt
  description: string,         // Brief description
  fullPrompt: string,          // Complete prompt text
  category: string,            // "Backend" | "Frontend" | "DevOps" | "Design" | "Image Generation"
  userId: string,              // UID of the user who created it
  userName: string,            // Display name of the creator
  likes: number,               // Number of likes
  likedBy: string[],           // Array of user UIDs who liked this prompt
  createdAt: timestamp         // Server timestamp
}
```

## Firestore Rules

Add these security rules to your Firebase console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Prompts collection
    match /prompts/{promptId} {
      // Anyone can read prompts
      allow read: if true;
      
      // Only authenticated users can create prompts
      allow create: if request.auth != null 
        && request.resource.data.userId == request.auth.uid
        && request.resource.data.likes == 0
        && request.resource.data.likedBy.size() == 0;
      
      // Users can update their own prompts, or anyone can update likes
      allow update: if request.auth != null && (
        // Owner can update their own prompt
        resource.data.userId == request.auth.uid
        // Or anyone can update likes (with validation)
        || (request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes', 'likedBy'])
            && request.resource.data.likedBy.size() >= resource.data.likedBy.size() - 1
            && request.resource.data.likedBy.size() <= resource.data.likedBy.size() + 1)
      );
      
      // Only the owner can delete their prompts
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

## Firestore Indexes

If you encounter errors about missing indexes, Firebase will provide a link to create them automatically. 

Recommended composite index:
- Collection: `prompts`
- Fields:
  - `userId` (Ascending)
  - `createdAt` (Descending)

## Features

### Add New Prompt
- Click "Add New Prompt" button in the "My Submissions" tab
- Fill in the form with title, category, description, and full prompt
- Click "Add Prompt" to save

### Like/Unlike Prompts
- Click the heart icon on any prompt card
- If you haven't liked it, it will turn red and increment the counter
- If you've already liked it, clicking again will unlike it and decrement the counter
- Only authenticated users can like prompts

### View Your Prompts
- Go to "My Submissions" tab to see all prompts you've created
- Each prompt shows:
  - Title and category
  - Description
  - Number of likes
  - Copy and Delete buttons

### Delete Prompts
- In "My Submissions" tab, click the "Delete" button on any of your prompts
- Confirm the deletion
- The prompt will be removed from the database

## Notes

- All updates happen in real-time using Firestore's `onSnapshot` listener
- Likes are tracked per user to prevent duplicate likes
- Users can only delete their own prompts
- Toast notifications provide feedback for all actions
