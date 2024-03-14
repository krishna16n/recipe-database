import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, JwtStrategy],
})
export class RecipesModule {}
