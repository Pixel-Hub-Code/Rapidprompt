# Firebase Setup Guide

## Prerequisites

1. A Firebase account (create one at [firebase.google.com](https://firebase.google.com))
2. A Firebase project created in the [Firebase Console](https://console.firebase.google.com/)

## Step 1: Firebase Project Configuration

### 1.1 Enable Authentication Providers

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Navigate to **Authentication** → **Sign-in method**
4. Enable the following providers:
   - **Email/Password**: Click "Email/Password" → Toggle "Enable" → Save
   - **Google**: Click "Google" → Toggle "Enable" → Add support email → Save
   - **GitHub**: 
     - Go to [GitHub Developer Settings](https://github.com/settings/developers)
     - Click "New OAuth App"
     - Fill in:
       - Application name: Your App Name
       - Homepage URL: `http://localhost:5173` (for development)
       - Authorization callback URL: Copy from Firebase Console
     - Click "Register application"
     - Copy Client ID and Client Secret
     - Paste them in Firebase Console → Save

### 1.2 Enable Firestore Database

1. In Firebase Console, navigate to **Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development) or **Start in production mode** (for production)
4. Select a location for your database
5. Click "Enable"

### 1.3 Set Firestore Security Rules

Go to **Firestore Database** → **Rules** and add the following rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add more collections as needed
    // Example for a public collection:
    // match /prompts/{promptId} {
    //   allow read: if true;
    //   allow write: if request.auth != null;
    // }
  }
}
```

## Step 2: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. If you haven't added a web app yet:
   - Click the **</>** (web) icon
   - Register your app with a nickname
4. Under "Firebase SDK snippet", select **Config**
5. Copy all the values from the config object

## Step 3: Configure Environment Variables

1. Your `.env` file already has the Firebase configuration
2. Make sure all values match your Firebase project:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Step 4: Database Structure

Your app creates the following collections automatically:

### Users Collection (`/users/{userId}`)

```typescript
{
  uid: string;           // User's Firebase UID
  email: string;         // User's email
  name: string;          // User's display name
  photoURL: string;      // User's profile photo URL (from OAuth)
  provider: string;      // Authentication provider: "email", "google", or "github"
  createdAt: Timestamp;  // Account creation timestamp
  updatedAt: Timestamp;  // Last update timestamp
  lastLoginAt: Timestamp; // Last login timestamp
}
```

## Step 5: Testing Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your app in the browser (usually `http://localhost:5173`)

3. Test authentication methods:
   - **Email/Password**: Click "Sign Up" → Fill form → Create account
   - **Google**: Click "Continue with Google" → Select Google account
   - **GitHub**: Click "Continue with GitHub" → Authorize app

## Step 6: Production Deployment

### 6.1 Update Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings**
2. Under "Authorized domains", add your production domain

### 6.2 Update OAuth Redirect URIs

For GitHub:
1. Go to your GitHub OAuth App settings
2. Update Homepage URL and Authorization callback URL with production URLs

For Google:
1. The authorized domains in Firebase automatically work for Google OAuth

### 6.3 Update Firestore Security Rules

Update rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Features Implemented

✅ **Email/Password Authentication**
- Sign up with email, password, and name
- Sign in with email and password
- Form validation
- Error handling

✅ **Google OAuth**
- One-click Google sign-in
- Automatic user profile creation
- Profile photo sync

✅ **GitHub OAuth**
- One-click GitHub sign-in
- Automatic user profile creation
- Profile photo sync

✅ **Firestore Database**
- User data storage
- Automatic user document creation
- Last login tracking
- User profile management

✅ **Security**
- Protected routes
- Secure authentication state management
- Firestore security rules

## Troubleshooting

### Common Issues

**"Firebase: Error (auth/unauthorized-domain)"**
- Add your domain to Authorized domains in Firebase Console

**"Firebase: Error (auth/popup-closed-by-user)"**
- User closed the OAuth popup, no action needed

**"Firebase: Error (auth/account-exists-with-different-credential)"**
- User already signed up with a different method
- Link accounts or use the original sign-in method

**GitHub OAuth not working**
- Check that callback URL matches exactly
- Verify Client ID and Secret in Firebase Console

### Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
