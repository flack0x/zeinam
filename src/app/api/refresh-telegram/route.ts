import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Verify the request is from Vercel Cron or has the correct secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('[Telegram Refresh] Starting telegram post fetch...');

    // Run the Python script to fetch new Telegram posts
    const { stdout, stderr } = await execPromise('python scripts/fetch-telegram.py');

    if (stderr) {
      console.error('[Telegram Refresh] Script stderr:', stderr);
    }

    console.log('[Telegram Refresh] Script output:', stdout);

    return NextResponse.json({
      success: true,
      message: 'Telegram posts refreshed successfully',
      output: stdout
    });
  } catch (error) {
    console.error('[Telegram Refresh] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
