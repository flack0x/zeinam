import * as cheerio from 'cheerio';

export interface TelegramPost {
  id: string;
  title: string;
  content: string[];
  html: string;
  date: string;
  timestamp: number;
  image?: string;
  link: string;
}

export async function getLatestTelegramPosts(channelName: string, limit: number = 5): Promise<TelegramPost[]> {
  try {
    const response = await fetch(`https://t.me/s/${channelName}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(20000), // Increase timeout to 20 seconds
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);
    const rawPosts: TelegramPost[] = [];

    $('.tgme_widget_message_wrap').each((_, element) => {
      const $el = $(element);
      const $text = $el.find('.tgme_widget_message_text');
      const $photo = $el.find('.tgme_widget_message_photo_wrap');
      const $time = $el.find('.tgme_widget_message_time');
      const link = $el.find('.tgme_widget_message_date').attr('href') || '';
      
      let cleanText = $text.text().trim();
      
      // Skip purely empty messages
      if (!cleanText && $photo.length === 0) return;

      // Image Extraction
      let imageUrl = '';
      if ($photo.length > 0) {
        const style = $photo.attr('style') || '';
        const match = style.match(/url\('?(.*?)'?\)/);
        if (match && match[1]) {
          imageUrl = match[1];
        }
      }

      // Also check for video thumbnails
      if (!imageUrl) {
        const $video = $el.find('.tgme_widget_message_video_thumb');
        if ($video.length > 0) {
          const style = $video.attr('style') || '';
          const match = style.match(/url\('?(.*?)'?\)/);
          if (match && match[1]) {
            imageUrl = match[1];
          }
        }
      }

      // Fallback: check for any image tag
      if (!imageUrl) {
        const $img = $el.find('img');
        if ($img.length > 0) {
          imageUrl = $img.attr('src') || '';
        }
      }

      // Title Extraction Logic
      let title = 'Daily Update';
      const lines = cleanText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      
      if (lines.length > 0) {
        const firstLine = lines[0];
        // Check for common header indicators
        if (firstLine.match(/^[\u{1F300}-\u{1F9FF}]|[\u{2700}-\u{27BF}]/u) || firstLine.length < 100) {
           title = firstLine;
           // If the title is just the first line of content, we might want to remove it from content to avoid duplication?
           // For now, let's keep it to be safe.
        }
      }

      // Paragraph parsing
      const rawHtml = $text.html() || '';
      const paragraphs = rawHtml
        .replace(/<br\s*\/?\?>/gi, '___BR___') // temporary placeholder
        .split('___BR___')
        .map(p => {
             // clean tags
             return p.replace(/<[^>]*>?/gm, '').trim();
        })
        .filter(p => p.length > 0);

      const dateTimeStr = $time.attr('datetime');
      const timestamp = dateTimeStr ? new Date(dateTimeStr).getTime() : 0;

      rawPosts.push({
        id: link.split('/').pop() || Math.random().toString(),
        title,
        content: paragraphs,
        html: $text.html() || '', 
        date: $time.text(),
        timestamp,
        image: imageUrl,
        link,
      });
    });

    // Sort by post ID (extract number from link) - highest ID = newest
    const sortedPosts = rawPosts.sort((a, b) => {
      const idA = parseInt(a.link.split('/').pop() || '0');
      const idB = parseInt(b.link.split('/').pop() || '0');
      return idB - idA; // Descending order (newest first)
    });

    // Filter duplicates
    const uniquePosts = sortedPosts.filter((post, index, self) =>
      index === self.findIndex((p) => p.link === post.link)
    );

    return uniquePosts.slice(0, limit);

  } catch (error) {
    console.error('Error fetching Telegram posts:', error);
    return [];
  }
}
