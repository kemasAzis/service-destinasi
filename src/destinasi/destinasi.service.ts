import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DestinasiService {
  constructor(private prisma: PrismaService) {}

  async create(createDestinasiDto: CreateDestinasiDto) {
    return this.prisma.destinasi.create({
      data: createDestinasiDto,
    });
  }

  async findAll(kategori?: string) {
    return this.prisma.destinasi.findMany({
      where: kategori ? { kategori } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const destinasi = await this.prisma.destinasi.findUnique({
      where: { id },
    });

    if (!destinasi) {
      throw new NotFoundException(`Destinasi dengan ID ${id} tidak ditemukan`);
    }

    return destinasi;
  }

  async update(id: number, updateDestinasiDto: UpdateDestinasiDto) {
    await this.findOne(id);
    return this.prisma.destinasi.update({
      where: { id },
      data: updateDestinasiDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.destinasi.delete({
      where: { id },
    });
  }
}