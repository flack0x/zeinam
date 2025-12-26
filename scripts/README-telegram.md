# Telegram API Setup

## Prerequisites

1. Python 3.8 or higher installed
2. Telegram API credentials from https://my.telegram.org

## Setup Instructions

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Add API Credentials to .env

Add these lines to your `.env` file:

```
TELEGRAM_API_ID=your_api_id_here
TELEGRAM_API_HASH=your_api_hash_here
```

### 3. First Run (Authentication)

The first time you run the script, it will ask you to authenticate:

```bash
python scripts/fetch-telegram.py
```

You'll need to:
1. Enter your phone number (with country code, e.g., +1234567890)
2. Enter the code Telegram sends you
3. If you have 2FA, enter your password

This creates a `session.session` file that stores your authentication.

### 4. Fetch Posts

After authentication, run:

```bash
python scripts/fetch-telegram.py
```

This will:
- Fetch the latest 5 posts from the channel
- Save them to `public/telegram-posts.json`
- Your Next.js app will read from this file

### 5. Automate (Optional)

You can set up a cron job or scheduled task to run this script periodically:

**Windows (Task Scheduler):**
- Run every 5 minutes: `python C:\Users\PC\Desktop\Mama_Website\scripts\fetch-telegram.py`

**Linux/Mac (crontab):**
```
*/5 * * * * cd /path/to/project && python scripts/fetch-telegram.py
```

## Troubleshooting

- **"Could not find the input entity"**: Make sure the channel username is correct
- **"Session file is corrupted"**: Delete `session.session` and re-authenticate
- **API credentials error**: Check your .env file has the correct API_ID and API_HASH
