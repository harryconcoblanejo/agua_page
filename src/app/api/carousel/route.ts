import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { existsSync } from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// GET: Listar todas las imágenes del carrusel que existen físicamente
export async function GET() {
  const images = await prisma.carouselImage.findMany({ orderBy: { id: 'asc' } });
  // Filtrar solo las que existen en el disco
  const filtered = images.filter(img => {
    const filePath = path.join(process.cwd(), 'public', img.src);
    return existsSync(filePath);
  });
  return NextResponse.json(filtered);
}

// POST: Actualizar solo los textos y el orden de las imágenes existentes
export async function POST(req: NextRequest) {
  const { images } = await req.json(); // images: [{id, src, alt}]
  // Actualiza el alt de cada imagen existente
  for (const img of images) {
    if (img.id) {
      await prisma.carouselImage.update({ where: { id: img.id }, data: { alt: img.alt } });
    }
  }
  return NextResponse.json({ ok: true });
}

// DELETE: Eliminar una imagen por id
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.carouselImage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
