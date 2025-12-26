const cheerio = require('cheerio');

async function checkLatestPosts() {
  const response = await fetch('https://t.me/s/observer_5');
  const html = await response.text();
  const $ = cheerio.load(html);

  console.log('=== ANALYZING TELEGRAM POSTS ===\n');

  const posts = [];
  $('.tgme_widget_message_wrap').each((index, element) => {
    const $el = $(element);
    const $text = $el.find('.tgme_widget_message_text');
    const $photo = $el.find('.tgme_widget_message_photo_wrap');
    const $video = $el.find('.tgme_widget_message_video_thumb');
    const $time = $el.find('.tgme_widget_message_time');
    const link = $el.find('.tgme_widget_message_date').attr('href') || '';
    const postId = link.split('/').pop();

    const textSnippet = $text.text().trim().substring(0, 60);
    const hasPhoto = $photo.length > 0;
    const hasVideo = $video.length > 0;
    const timestamp = $time.attr('datetime');

    posts.push({
      index,
      postId,
      timestamp,
      textSnippet,
      hasPhoto,
      hasVideo,
      link
    });
  });

  // Sort by timestamp descending (newest first)
  posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  console.log('LATEST 5 POSTS (sorted by timestamp):\n');
  posts.slice(0, 5).forEach((post, i) => {
    console.log(`${i + 1}. Post #${post.postId}`);
    console.log(`   Time: ${post.timestamp}`);
    console.log(`   Text: ${post.textSnippet}...`);
    console.log(`   Has Photo: ${post.hasPhoto}`);
    console.log(`   Has Video: ${post.hasVideo}`);
    console.log(`   Link: ${post.link}`);
    console.log('');
  });
}

checkLatestPosts().catch(console.error);
