const cheerio = require('cheerio');

async function testFetch() {
  try {
    console.log('Fetching https://t.me/s/observer_5 ...');
    const response = await fetch('https://t.me/s/observer_5');
    const html = await response.text();
    console.log('Fetch complete. Length:', html.length);

    const $ = cheerio.load(html);
    const wraps = $('.tgme_widget_message_wrap');
    console.log('Found message wraps:', wraps.length);

    if (wraps.length === 0) {
      console.log('WARNING: No messages found. Dumping part of HTML to check classes...');
      console.log(html.substring(0, 1000));
      return;
    }

    wraps.each((i, el) => {
      if (i >= 3) return; // check first 3
      const $el = $(el);
      const text = $el.find('.tgme_widget_message_text').text().substring(0, 50);
      const photo = $el.find('.tgme_widget_message_photo_wrap').attr('style');
      console.log(`
Post ${i + 1}:`);
      console.log('Text snippet:', text);
      console.log('Has Photo Style:', !!photo);
      if (photo) console.log('Photo Style:', photo);
    });

  } catch (e) {
    console.error('Error:', e);
  }
}

testFetch();
