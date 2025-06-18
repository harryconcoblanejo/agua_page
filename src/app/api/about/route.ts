import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET: Obtener el texto actual de Sobre Nosotros
export async function GET() {
  try {
    console.log('Fetching about text...');
    const about = await prisma.about.findFirst({ 
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        text: true,
        updatedAt: true
      }
    });
    
    console.log('Found about:', about);
    
    if (!about) {
      console.log('No about text found, returning empty string');
      return NextResponse.json({ text: '' });
    }
    
    return NextResponse.json(about);
  } catch (error) {
    console.error('Error fetching about:', error);
    return NextResponse.json(
      { error: 'Error al obtener el texto' },
      { status: 500 }
    );
  }
}

// POST: Crear o actualizar el texto de Sobre Nosotros
export async function POST(req: NextRequest) {
  try {
    console.log('Received request to update about text');
    
    if (!req.body) {
      console.error('No request body received');
      return NextResponse.json(
        { error: 'No se recibió ningún dato' },
        { status: 400 }
      );
    }

    const body = await req.json();
    console.log('Request body:', body);
    
    if (!body || typeof body.text !== 'string') {
      console.error('Invalid request body:', body);
      return NextResponse.json(
        { error: 'El texto es requerido y debe ser una cadena de texto' },
        { status: 400 }
      );
    }

    const text = body.text.trim();
    if (!text) {
      console.error('Empty text received');
      return NextResponse.json(
        { error: 'El texto no puede estar vacío' },
        { status: 400 }
      );
    }

    console.log('Attempting to find last about entry');
    // Si ya existe, actualiza el más reciente; si no, crea uno nuevo
    const last = await prisma.about.findFirst({ 
      orderBy: { updatedAt: 'desc' },
      select: { id: true }
    });

    console.log('Last about entry:', last);

    let about;
    try {
      if (last) {
        console.log('Updating existing about entry');
        about = await prisma.about.update({
          where: { id: last.id },
          data: { text },
          select: {
            id: true,
            text: true,
            updatedAt: true
          }
        });
      } else {
        console.log('Creating new about entry');
        about = await prisma.about.create({
          data: { text },
          select: {
            id: true,
            text: true,
            updatedAt: true
          }
        });
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Error al guardar en la base de datos' },
        { status: 500 }
      );
    }

    console.log('Successfully saved about text:', about);
    return NextResponse.json(about);
  } catch (error) {
    console.error('Error updating about:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el texto' },
      { status: 500 }
    );
  }
}
