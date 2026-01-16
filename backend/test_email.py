"""
Test script to verify Resend email service is working
Run this to test your email setup before using it in production
"""
import os
from dotenv import load_dotenv
from pathlib import Path
from services.email_service import EmailService

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

def test_email_service():
    """Test sending a simple email"""
    print("🧪 Testing Resend Email Service...")
    print(f"API Key: {'✅ Found' if os.environ.get('RESEND_API_KEY') else '❌ Missing'}")
    print(f"From Email: {os.environ.get('FROM_EMAIL', 'Not set')}")
    print(f"Admin Email: {os.environ.get('ADMIN_EMAIL', 'Not set')}")
    print()
    
    # Initialize email service
    email_service = EmailService()
    
    if not email_service.client:
        print("❌ Email service not initialized. Check RESEND_API_KEY in .env file.")
        return
    
    # Test email data
    test_email = input("Enter your email address to receive test email: ").strip()
    
    if not test_email:
        print("❌ No email provided. Exiting.")
        return
    
    print(f"\n📧 Sending test email to {test_email}...")
    
    # Send test email
    success = email_service._send_email(
        to=test_email,
        subject="✅ Resend Test - CardX Academia",
        html_content="""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #14B8A6; color: white; padding: 20px; text-align: center; border-radius: 6px 6px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚀 Email Test Successful!</h1>
                </div>
                <div class="content">
                    <p>Congratulations! Your Resend email service is working perfectly.</p>
                    <p>This means:</p>
                    <ul>
                        <li>✅ Resend API key is configured correctly</li>
                        <li>✅ Email service is initialized</li>
                        <li>✅ Emails can be sent successfully</li>
                    </ul>
                    <p>Your appointment booking system is ready to send confirmation emails!</p>
                </div>
                <div class="footer">
                    <p>CardX Academia Email Service</p>
                </div>
            </div>
        </body>
        </html>
        """
    )
    
    if success:
        print("✅ Test email sent successfully!")
        print(f"📬 Check your inbox at {test_email}")
        print("\n🎉 Your email service is working perfectly!")
    else:
        print("❌ Failed to send test email. Check the error messages above.")
        print("\n💡 Troubleshooting:")
        print("1. Verify RESEND_API_KEY is correct in .env file")
        print("2. Check if your domain is verified in Resend dashboard")
        print("3. For testing, you can use 'onboarding@resend.dev' as FROM_EMAIL")

if __name__ == "__main__":
    test_email_service()
