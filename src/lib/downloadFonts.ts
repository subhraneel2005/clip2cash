import fs from 'fs';
import path from 'path';
import https from 'https';

const FONTS = {
  'Black Han Sans': 'https://fonts.gstatic.com/s/blackhansans/v17/ea8Aad44WunzF9a-dL6toA8r8nqVIXSkH-Hc.ttf'
};

export async function downloadFont(fontName: string): Promise<string> {
  const fontDir = path.join(process.cwd(), 'public', 'temp', 'fonts');
  if (!fs.existsSync(fontDir)) {
    fs.mkdirSync(fontDir, { recursive: true });
  }

  const fontPath = path.join(fontDir, `${fontName.replace(/\s+/g, '')}.ttf`);
  
  // Download only if doesn't exist
  if (!fs.existsSync(fontPath)) {
    await new Promise((resolve, reject) => {
      https.get(FONTS[fontName as keyof typeof FONTS], (response) => {
        const writer = fs.createWriteStream(fontPath);
        response.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    });
  }

  return fontPath;
} 