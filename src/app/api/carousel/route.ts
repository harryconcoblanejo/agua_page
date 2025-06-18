import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Listar todas las imágenes del carrusel
export async function GET() {
  const images = await prisma.carouselImage.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json(images);
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
