# Adding the INARA Logo

## Quick Setup

1. **Save the logo image:**
   - Right-click on the INARA logo image you provided
   - Save it as `inara-logo.png` 
   - Place it in: `/Users/maiwand/inara-network/public/images/inara-logo.png`

2. **Restart the dev server** (if needed):
   ```bash
   # The server should auto-reload, but if the logo doesn't show:
   cd /Users/maiwand/inara-network
   npm run dev
   ```

## Where the Logo Appears

The INARA logo is now integrated throughout the platform:

### 🏠 **Homepage**
- Large logo (120x120px) centered in the hero section
- Appears above the main headline

### 🧭 **Navigation Header**
- Small logo (40x40px) in top-left corner
- Visible on every page
- Clickable, links back to homepage

### 🔐 **Authentication Pages**
- Sign In page: 80x80px logo at the top
- Sign Up page: 80x80px logo at the top
- Both show logo with "INARA Network" text

### 🔖 **Browser Tab**
- Favicon uses the INARA logo
- Visible in browser tabs and bookmarks

## Logo Format Requirements

- **Format:** PNG with transparent background (recommended)
- **Size:** 512x512px or higher (will scale automatically)
- **File name:** Must be exactly `inara-logo.png`
- **Location:** `/Users/maiwand/inara-network/public/images/`

## Alternative: Using the Logo from Chat

If you want to use the exact logo image from the chat:

1. Click on the logo image in the chat
2. Save it to your computer
3. Rename it to `inara-logo.png`
4. Move it to `/Users/maiwand/inara-network/public/images/`

The platform will automatically display it in all the locations mentioned above!

## Files Updated

The following files have been updated to use the logo:

- ✅ `/components/Header.tsx` - Navigation header
- ✅ `/app/page.tsx` - Homepage hero section  
- ✅ `/app/auth/signin/page.tsx` - Sign in page
- ✅ `/app/auth/signup/page.tsx` - Sign up page
- ✅ `/app/layout.tsx` - Favicon and metadata

All pages now use `next/image` for optimized image loading.
