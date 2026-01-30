# Testing Guide - Frontend Restructure

## 🧪 Testing Checklist

### 1. Installation Check

```bash
cd client
npm install  # Ensure redux-persist is installed
npm run dev  # Start development server
```

### 2. verify Redux Persistence

**Test**: Auth state should persist across page refreshes

Steps:

1. Open browser to `http://localhost:5173`
2. Login with valid credentials
3. Refresh the page (F5)
4. ✅ **Expected**: Should remain logged in (no redirect to /signin)
5. ✅ **Expected**: User should still see /home page

**How it works:**

- Auth state (token, isAuthenticated) is stored in localStorage
- On app load, PersistGate rehydrates the state
- Protection routes check persisted auth state

### 3. Test Lazy Loading

**Test**: Pages should show loading spinner before rendering

Steps:

1. Open browser developer tools (F12)
2. Go to Network tab
3. Set throttling to "Slow 3G"
4. Navigate to `/home` then `/signin`
5. ✅ **Expected**: Should see spinner before page loads
6. ✅ **Expected**: Separate JS chunks loaded per route

### 4. Test Route Constants

**Test**: Routes should navigate correctly

Steps:

1. Test all routes:
   - `/` → should redirect to `/signin`
   - `/signin` → Login page
   - `/signup` → Signup page
   - `/home` → Home page (requires auth)
   - `/chat/:userId` → Chat page (requires auth)
   - `/invalid-route` → 404 page

2. ✅ **Expected**: All routes work correctly
3. ✅ **Expected**: Protected routes redirect to /signin when logged out
4. ✅ **Expected**: Public routes redirect to /home when logged in

### 5. Test Existing Functionality

#### Authentication Flow:

1. Navigate to `/signup`
2. Fill form and submit
3. ✅ Should create account and Login
4. ✅ Should redirect to `/home`
5. Refresh page
6. ✅ Should remain logged in (persistence!)
7. Logout
8. ✅ Should redirect to `/signin`
9. ✅ Should clear persisted state

#### Chat Functionality:

1. Login
2. Navigate to `/home`
3. Click on a user to chat
4. ✅ Should navigate to `/chat/:userId`
5. Send a message
6. ✅ Message should appear in chat
7. ✅ Redux state should update
8. Refresh page
9. ✅ Should fetch messages fresh (not persisted)
10. ✅ Should remain on same chat page

#### User Management:

1. View user list on home
2. ✅ Should show all users except current user
3. ✅ Should show avatars
4. ✅ Should show user names

### 6. Console Error Check

**Test**: No errors in browser console

Steps:

1. Open browser console (F12)
2. Navigate through all pages
3. ✅ **Expected**: No errors
4. ✅ **Expected**: No warnings (except dev warnings)

### 7. Build Test

**Test**: Production build should work

```bash
npm run build
npm run preview
```

✅ **Expected**:

- Build completes successfully
- No TypeScript errors
- Preview server runs
- All functionality works in production mode

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot find module 'redux-persist'"

**Solution:**

```bash
npm install redux-persist
```

### Issue 2: Lazy loading shows blank page

**Solution:**

- Check browser console for errors
- Ensure all pages have default exports
- Verify Suspense fallback is working

### Issue 3: Persistence not working

**Solution:**

- Check localStorage in browser DevTools
- Look for key: `persist:root`
- Clear localStorage and try again:
  ```javascript
  localStorage.clear();
  location.reload();
  ```

### Issue 4: Routes not working

**Solution:**

- Verify `ROUTES` constants are imported correctly
- Check console for navigation errors
- Ensure router is wrapped properly in main.tsx

### Issue 5: TypeScript errors after changes

**Solution:**

```bash
# Clear TypeScript cache
rm -rf node_modules/.vite
npm run dev
```

## 📊 Performance Metrics

After lazy loading, you should see:

### Initial Bundle Size:

- ❌ Before: ~500KB (all code loaded)
- ✅ After: ~200KB (only essential code)

### Route Chunks:

- `auth-*.js` - Auth pages
- `chat-*.js` - Chat page
- `home-*.js` - Home page

### Load Times:

- Initial: ~1-2s (faster!)
- Route transitions: ~100-300ms with spinner

## ✅ Success Criteria

Your restructure is successful if:

1. ✅ All routes navigate correctly
2. ✅ Auth persists after refresh
3. ✅ Lazy loading shows spinners
4. ✅ No console errors
5. ✅ All existing features work
6. ✅ Build completes without errors
7. ✅ TypeScript has no errors
8. ✅ Login/Logout works
9. ✅ Chat messaging works
10. ✅ User list loads

## 🎯 Final Validation

Run this complete flow:

1. **Fresh start**:

   ```bash
   localStorage.clear()
   ```

2. **Signup**:
   - Go to `/signup`
   - Create new account
   - Should auto-login and redirect to `/home`

3. **Persistence test**:
   - Refresh page (F5)
   - Should STAY logged in ✅

4. **Chat test**:
   - Click a user
   - Send message
   - Refresh page
   - Should stay on chat page ✅
   - Messages should reload ✅

5. **Logout test**:
   - Click logout
   - Should redirect to `/signin` ✅
   - Refresh page
   - Should STAY on `/signin` (not logged in) ✅

6. **Public route test (when logged out)**:
   - Try visiting `/home`
   - Should redirect to `/signin` ✅

7. **Protected route test (when logged in)**:
   - Login first
   - Try visiting `/signin`
   - Should redirect to `/home` ✅

If all these pass → **Your restructure is perfect!** 🎉

---

**Note**: All existing functionality should work exactly as before, just with better structure and new features (persistence + lazy loading)!
