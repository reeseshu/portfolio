import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'src', 'data', 'content.json');
    const fileContents = await readFile(filePath, 'utf-8');
    const contentData = JSON.parse(fileContents);
    return NextResponse.json(contentData);
  } catch (error) {
    console.error('Failed to load content:', error);
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In development, optionally save to file
    if (process.env.NODE_ENV === 'development') {
      const filePath = join(process.cwd(), 'src', 'data', 'content.json');
      await writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8');
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save content:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}

