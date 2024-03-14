import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  @Post('create')
  create(@Body() dto: CreateRecipeDto, @Req() req) {
    return this.recipesService.createRecipe(dto, req);
  }

  @Put(':id')
  async updateRecipe(@Param() params: { id: string }, @Body() dto: UpdateRecipeDto) {
    return this.recipesService.updateRecipe(params.id, dto);
  }

  @Get()
  async getAllRecipes() {
    return this.recipesService.getAllRecipes();
  }

  @Get(':id')
  getRecipe(@Param() params: { id: string }) {
    return this.recipesService.getRecipe(params.id);
  }

  @Delete(':id')
  deleteRecipe(@Param() params: { id: string }) {
    return this.recipesService.deleteRecipe(params.id);
  }
}
