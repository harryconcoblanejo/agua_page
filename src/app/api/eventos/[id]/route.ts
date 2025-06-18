// app/api/eventos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data: {
    date?: string;
    place?: string;
    description?: string;
    link?: string;
  } = await req.json();

  const evento = await prisma.event.update({
    where: { id: Number(params.id) },
    data: {
      date: data.date ? new Date(data.date) : null,
      place: data.place || null,
      description: data.description || null,
      link: data.link || null,
    },
  });

  return NextResponse.json(evento);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.event.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ ok: true });
}
