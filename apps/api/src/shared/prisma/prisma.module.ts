import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // Fornece o serviço
  exports: [PrismaService],   // Permite que outros módulos o usem
})
export class PrismaModule {}