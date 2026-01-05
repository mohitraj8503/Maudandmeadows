# Backend Environment Variables Setup Script
# Run these commands one by one in the backend directory

# 1. DATABASE_NAME
vercel env add DATABASE_NAME production
# When prompted, enter: resort_db

# 2. FRONTEND_URL  
vercel env add FRONTEND_URL production
# When prompted, enter: https://frontend-flame-delta-12.vercel.app

# 3. RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_ID production
# When prompted, enter your Razorpay Key ID (e.g., rzp_test_xxxxx)

# 4. RAZORPAY_KEY_SECRET
vercel env add RAZORPAY_KEY_SECRET production
# When prompted, enter your Razorpay Secret Key

# After adding all variables, deploy:
vercel --prod --yes
