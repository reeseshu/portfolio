# Email Setup for Wave Form

To receive emails when someone submits their email through the Wave form, you need to set up email credentials.

## Step 1: Create .env.local file

Create a file called `.env.local` in your project root with the following content:

```env
# Email Configuration for Wave Form
EMAIL_USER=reeseshu@gmail.com
EMAIL_PASS=your-actual-app-password-here

# Edit mode password (optional)
NEXT_PUBLIC_EDIT_PASSWORD=changeme
```

## Step 2: Get Gmail App Password

1. **Enable 2-Factor Authentication** on your Google account
2. Go to **Google Account Settings** > **Security** > **2-Step Verification**
3. Scroll down to **App passwords**
4. Select **Mail** as the app
5. Generate a new 16-character password
6. Copy that password and replace `your-actual-app-password-here` in your `.env.local` file

## Step 3: Test the Setup

1. Restart your development server: `npm run dev`
2. Go to the Wave page: `http://localhost:3000/wave`
3. Enter an email and submit
4. Check your Gmail inbox for the notification email

## Troubleshooting

- **"Email not configured"** message: Make sure your `.env.local` file is in the project root
- **Authentication failed**: Double-check your app password (not your regular Gmail password)
- **Still not working**: Restart your development server after adding the environment variables

## Production Deployment

When you deploy to production (Vercel, Netlify, etc.), add these same environment variables in your hosting platform's settings:

- `EMAIL_USER` = reeseshu@gmail.com
- `EMAIL_PASS` = your-app-password

The email will be sent to `reeseshu@gmail.com` with the submitter's email address and a friendly message.

