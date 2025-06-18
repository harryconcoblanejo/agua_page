import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const eventos = await prisma.event.findMany({ orderBy: { date: 'asc' } });
  return NextResponse.json(eventos);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const evento = await prisma.event.create({
    data: {
      date: data.date ? new Date(data.date) : null,
      place: data.place || null,
      description: data.description || null,
      link: data.link || null,
    },
  });
  return NextResponse.json(evento);
}
