import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Sube a Vercel Blob Storage
  const blob = await put(file.name, file, { access: 'public' });

  // Guarda la URL en la base de datos
  const prisma = new PrismaClient();
  const created = await prisma.carouselImage.create({ data: { src: blob.url, alt: file.name } });

  return NextResponse.json({ id: created.id, src: created.src, alt: created.alt });
}
