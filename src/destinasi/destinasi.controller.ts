import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DestinasiService } from './destinasi.service';

@Controller()
export class DestinasiController {
  constructor(private readonly destinasiService: DestinasiService) {}

  @MessagePattern('destinasi.findAll')
  findAll(@Payload() data: { kategori?: string }) {
    return this.destinasiService.findAll(data?.kategori);
  }

  @MessagePattern('destinasi.findOne')
  findOne(@Payload() id: number) {
    return this.destinasiService.findOne(Number(id));
  }
}