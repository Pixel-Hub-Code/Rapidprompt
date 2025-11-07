# 🚀 Quick Reference - Firebase Auth

## Authentication Methods Available

```tsx
import { useAuth } from './contexts/AuthContext';

const {
  user,                    // Current user or null
  loading,                 // Auth state loading
  signUpWithEmail,         // (email, password, name) => Promise<void>
  signInWithEmail,         // (email, password) => Promise<void>
  signInWithGoogle,        // () => Promise<void>
  signInWithGithub,        // () => Promise<void>
  logout,                  // () => Promise<void>
} = useAuth();
```

## User Object

```tsx
user?.uid               // Unique user ID
user?.email             // User's email
user?.displayName       // Display name
user?.photoURL          // Profile photo
user?.emailVerified     // Email verified?
```

## Common Patterns

### Show Sign Up Dialog
```tsx
const [open, setOpen] = useState(false);

<SignupDialog 
  open={open} 
  onOpenChange={setOpen}
  initialMode="signup"    // or "login"
  onSuccess={() => console.log('Success!')}
/>
```

### Conditional Rendering
```tsx
{user ? (
  <div>Hello, {user.email}</div>
) : (
  <button onClick={() => setShowAuth(true)}>Sign In</button>
)}
```

### Protected Routes
```tsx
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Firestore User Data
```tsx
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './lib/firebase';

// Read user data
const userDoc = await getDoc(doc(db, 'users', user.uid));
const userData = userDoc.data();

// Update user data
await updateDoc(doc(db, 'users', user.uid), {
  name: 'New Name',
  updatedAt: new Date()
});
```

## Environment Variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

## Firebase Console Tasks

1. **Enable Auth Providers**: Authentication → Sign-in method
2. **Enable Firestore**: Firestore Database → Create database
3. **Security Rules**: Firestore → Rules tab
4. **View Users**: Authentication → Users tab
5. **View Data**: Firestore Database → Data tab

## Dev Server

```bash
npm run dev          # Start dev server
npm run build        # Build for production
```

**Current Server:** http://localhost:3001/

## Documentation

- `FIREBASE_SETUP.md` - Complete setup guide
- `USAGE_GUIDE.md` - Code examples
- `SETUP_COMPLETE.md` - What was done

## Support

- [Firebase Docs](https://firebase.google.com/docs)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
