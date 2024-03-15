import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt.guard';


@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  /**
   * Creates a new recipe.
   * @param dto - The data transfer object containing recipe information.
   * @param req - The request object.
   * @returns The newly created recipe.
   */
  @Post('create')
  create(@Body() dto: CreateRecipeDto, @Req() req) {
    return this.recipesService.createRecipe(dto, req);
  }

  /**
   * Updates an existing recipe by its ID.
   * @param params - Object containing the ID of the recipe to be updated.
   * @param dto - The data transfer object containing updated recipe information.
   * @returns The updated recipe.
   */
  @Put(':id')
  async updateRecipe(@Param() params: { id: string }, @Body() dto: UpdateRecipeDto) {
    return this.recipesService.updateRecipe(params.id, dto);
  }

  /**
   * Retrieves all recipes.
   * @returns An array of all recipes.
   */
  @Get()
  async getAllRecipes() {
    return this.recipesService.getAllRecipes();
  }

  /**
   * Retrieves a recipe by its ID.
   * @param params - Object containing the ID of the recipe to be retrieved.
   * @returns The recipe with the specified ID.
   */
  @Get(':id')
  getRecipe(@Param() params: { id: string }) {
    return this.recipesService.getRecipe(params.id);
  }

  /**
   * Deletes a recipe by its ID.
   * @param params - Object containing the ID of the recipe to be deleted.
   * @returns The deleted recipe.
   */
  @Delete(':id')
  deleteRecipe(@Param() params: { id: string }) {
    return this.recipesService.deleteRecipe(params.id);
  }

  /**
   * Retrieves a recipe by user ID.
   * @param params - Object containing the user ID.
   * @returns The recipe with the specified ID.
   */
  @Get('user/:userId')
  async getRecipesByUserId(@Param() params: { id: string }) {
    return this.recipesService.getRecipesByUserId(params.id);
  }
}
