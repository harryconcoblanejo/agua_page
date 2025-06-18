import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Obtener el texto actual de Sobre Nosotros
export async function GET() {
  const about = await prisma.about.findFirst({ orderBy: { updatedAt: 'desc' } });
  return NextResponse.json(about);
}

// POST: Crear o actualizar el texto de Sobre Nosotros
export async function POST(req: NextRequest) {
  const { text } = await req.json();
  // Si ya existe, actualiza el más reciente; si no, crea uno nuevo
  const last = await prisma.about.findFirst({ orderBy: { updatedAt: 'desc' } });
  let about;
  if (last) {
    about = await prisma.about.update({ where: { id: last.id }, data: { text } });
  } else {
    about = await prisma.about.create({ data: { text } });
  }
  return NextResponse.json(about);
}
