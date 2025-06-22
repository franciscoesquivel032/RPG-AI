import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LocalStorageService {
  private uploadDir = join(
    process.cwd(),
    process.env.LOCAL_STORAGE_DIR ?? (() => { throw new Error('LOCAL_STORAGE_DIR environment variable is not set'); })()
  );

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
      console.error('Error saving image locally', err);
      throw new InternalServerErrorException('Failed to save image locally');
    }
  }
}