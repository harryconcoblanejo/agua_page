import { handleUpload } from '@vercel/blob/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  return handleUpload({ request });
} 