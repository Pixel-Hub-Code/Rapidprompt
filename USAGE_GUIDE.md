# Using Firebase Authentication in Your App

## Quick Start

Your authentication system is now fully configured! Here's how to use it:

## 1. Access Authentication in Components

```tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <p>Welcome, {user.displayName || user.email}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 2. Show Sign Up Dialog

```tsx
import { useState } from 'react';
import { SignupDialog } from '../components/SignupDialog';

function MyComponent() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <button onClick={() => setShowAuth(true)}>
        Sign Up
      </button>
      
      <SignupDialog 
        open={showAuth} 
        onOpenChange={setShowAuth}
        initialMode="signup" // or "login"
        onSuccess={() => {
          console.log('User authenticated!');
        }}
      />
    </>
  );
}
```

## 3. Protected Routes Example

Create a protected route component:

```tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
```

Use it in your router:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
```

## 4. Access User Data from Firestore

```tsx
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

interface UserData {
  name: string;
  email: string;
  photoURL?: string;
  provider: string;
  createdAt: any;
}

function UserProfile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      }
    }
    fetchUserData();
  }, [user]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h2>{userData.name}</h2>
      <p>{userData.email}</p>
      <p>Provider: {userData.provider}</p>
    </div>
  );
}
```

## 5. Update User Profile

```tsx
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

function UpdateProfile() {
  const { user } = useAuth();

  const updateUserName = async (newName: string) => {
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        name: newName,
        updatedAt: new Date()
      });
    }
  };

  return (
    <button onClick={() => updateUserName('New Name')}>
      Update Name
    </button>
  );
}
```

## Available Auth Methods

### From `useAuth()` hook:

- **`user`**: Current user object (null if not authenticated)
- **`loading`**: Boolean indicating auth state loading
- **`signUpWithEmail(email, password, name)`**: Sign up with email
- **`signInWithEmail(email, password)`**: Sign in with email
- **`signInWithGoogle()`**: Sign in with Google
- **`signInWithGithub()`**: Sign in with GitHub
- **`logout()`**: Sign out current user

## User Object Properties

When a user is authenticated, the `user` object contains:

```typescript
{
  uid: string;              // Unique user ID
  email: string | null;     // User's email
  displayName: string | null; // Display name
  photoURL: string | null;  // Profile photo URL
  emailVerified: boolean;   // Email verification status
  // ... other Firebase User properties
}
```

## Example: Navigation with Auth

```tsx
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { SignupDialog } from '../components/SignupDialog';

function Navigation() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <nav>
      {user ? (
        <div>
          <span>Hello, {user.displayName || user.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => setShowAuth(true)}>
          Sign In
        </button>
      )}
      
      <SignupDialog 
        open={showAuth} 
        onOpenChange={setShowAuth}
        initialMode="login"
      />
    </nav>
  );
}
```

## Testing Your Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test Email Authentication**:
   - Click "Sign Up" button
   - Fill in name, email, and password
   - Click "Create Account"
   - Check Firebase Console → Authentication to see the new user

3. **Test Google Authentication**:
   - Click "Continue with Google"
   - Select a Google account
   - Check Firebase Console → Authentication

4. **Test GitHub Authentication**:
   - Click "Continue with GitHub"
   - Authorize the app
   - Check Firebase Console → Authentication

5. **Check Firestore**:
   - Go to Firebase Console → Firestore Database
   - You should see a `users` collection with user documents

## Next Steps

1. **Add more user fields**: Extend the user document in `AuthContext.tsx`
2. **Create user preferences**: Add settings collection
3. **Add profile editing**: Create a profile page
4. **Implement password reset**: Use Firebase's password reset
5. **Add email verification**: Implement email verification flow

## Common Patterns

### Check if user is authenticated before action
```tsx
const handleAction = () => {
  if (!user) {
    setShowAuth(true);
    return;
  }
  // Proceed with action
};
```

### Show different content for authenticated users
```tsx
{user ? (
  <AuthenticatedContent />
) : (
  <GuestContent />
)}
```

### Redirect after authentication
```tsx
<SignupDialog 
  open={showAuth} 
  onOpenChange={setShowAuth}
  onSuccess={() => {
    navigate('/dashboard');
  }}
/>
```
