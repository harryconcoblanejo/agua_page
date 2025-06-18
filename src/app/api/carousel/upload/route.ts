import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { existsSync, mkdirSync } from 'fs';

export const runtime = 'nodejs'; // Necesario para acceso a fs

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
  const uploadDir = path.join(process.cwd(), 'public', 'imagenes_sobre_nosotros');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }
  const filePath = path.join(uploadDir, fileName);
  await writeFile(filePath, buffer);
  // Ruta pública para usar en src
  const publicPath = `/imagenes_sobre_nosotros/${fileName}`;

  // Guardar en la base de datos
  const prisma = new PrismaClient();
  const created = await prisma.carouselImage.create({ data: { src: publicPath, alt: file.name } });

  return NextResponse.json({ id: created.id, src: created.src, alt: created.alt });
}
