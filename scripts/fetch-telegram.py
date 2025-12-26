"""
Telegram Post Fetcher using Telethon (Official Telegram API)
This script fetches the latest posts from a Telegram channel and saves them to JSON.
"""

import os
import json
import asyncio
from datetime import datetime
from telethon import TelegramClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Telegram API credentials (get from https://my.telegram.org)
API_ID = os.getenv('TELEGRAM_API_ID')
API_HASH = os.getenv('TELEGRAM_API_HASH')
CHANNEL_USERNAME = 'observer_5'

# Output file
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'public', 'telegram-posts.json')


async def fetch_telegram_posts(limit=5):
    """Fetch latest posts from Telegram channel"""

    # Create client
    client = TelegramClient('session', API_ID, API_HASH)

    try:
        await client.start()
        print(f"✓ Connected to Telegram")

        # Get the channel
        channel = await client.get_entity(CHANNEL_USERNAME)
        print(f"✓ Found channel: {channel.title}")

        # Fetch messages
        messages = await client.get_messages(channel, limit=limit)
        print(f"✓ Fetched {len(messages)} messages")

        posts = []

        for msg in messages:
            # Skip messages without text
            if not msg.message:
                continue

            # Extract media info
            media_url = None
            media_type = None

            if msg.photo:
                # Download photo and get URL (you can upload to CDN or store locally)
                media_type = 'photo'
                # For now, we'll try to get the photo URL
                # In production, you'd download and serve it yourself
                try:
                    photo = msg.photo
                    # Get the largest photo size
                    media_url = None  # We'll handle this differently
                except:
                    pass
            elif msg.video:
                media_type = 'video'
                # Similar handling for videos

            # Get post URL
            post_url = f"https://t.me/{CHANNEL_USERNAME}/{msg.id}"

            # Extract title (first line or first 100 chars)
            text_lines = msg.message.split('\n')
            title = text_lines[0] if text_lines else 'Update'
            if len(title) > 100:
                title = title[:100]

            # Get content paragraphs
            content = [line.strip() for line in text_lines if line.strip()]

            post_data = {
                'id': str(msg.id),
                'title': title,
                'content': content,
                'date': msg.date.strftime('%b %d') if msg.date else '',
                'timestamp': msg.date.isoformat() if msg.date else '',
                'link': post_url,
                'image': media_url,
                'mediaType': media_type,
                'hasMedia': media_type is not None
            }

            posts.append(post_data)
            print(f"  - Post {msg.id}: {title[:50]}... (Media: {media_type or 'none'})")

        # Save to JSON file
        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

        output = {
            'updated': datetime.now().isoformat(),
            'channel': CHANNEL_USERNAME,
            'posts': posts
        }

        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False, indent=2)

        print(f"\n✓ Saved {len(posts)} posts to {OUTPUT_FILE}")

        return posts

    except Exception as e:
        print(f"✗ Error: {e}")
        raise
    finally:
        await client.disconnect()


if __name__ == '__main__':
    asyncio.run(fetch_telegram_posts(limit=5))
