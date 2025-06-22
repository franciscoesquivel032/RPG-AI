import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LocalStorageService {
  private uploadDir = join(process.cwd(), 'uploads');

  private async ensureUploadDir() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  /**
   * Saves an image buffer to the local filesystem.
   * @param buffer - The image buffer to save. 
   * @param extension - The file extension for the saved image (png by default).
   * @returns {Promise<string>} The filename of the saved image.
   * @throws {InternalServerErrorException} If there is an error saving the image.
   */
  async saveImageBuffer(buffer: Buffer, extension = 'png'): Promise<string> {
    await this.ensureUploadDir();

    const filename = `${Date.now()}-${uuidv4()}.${extension}`;
    const filePath = join(this.uploadDir, filename);

    try {
      await fs.writeFile(filePath, buffer);
      return filename;
    } catch (err) {
      console.error('Error al guardar imagen localmente:', err);
      throw new InternalServerErrorException('No se pudo guardar la imagen en el servidor');
    }
  }
}