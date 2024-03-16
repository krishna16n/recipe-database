import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';


@Injectable()
export class RecipesService {

    constructor(private prisma: PrismaService) { }

    /**
     * Creates a new recipe.
     * @param createRecipeDto - The data transfer object containing recipe information.
     * @param req - The request object.
     * @returns The newly created recipe.
     */
    async createRecipe(createRecipeDto: CreateRecipeDto, req: Request) {
        const { title, description, ingredients, instructions, authorId } = createRecipeDto;

        // Associate the recipe with the user by specifying the user's ID
        return this.prisma.recipe.create({
            data: {
                title,
                description,
                ingredients,
                instructions,
                author: { connect: { id: authorId } }, // Connect the recipe to the user
            },
        });
    }

    /**
     * Updates an existing recipe by its ID.
     * @param recipeId - The ID of the recipe to be updated.
     * @param dto - The data transfer object containing updated recipe information.
     * @returns The updated recipe.
     * @throws NotFoundException if the recipe with the provided ID is not found.
     */
    async updateRecipe(recipeId: string, dto: UpdateRecipeDto) {
        const { title, description, ingredients, instructions } = dto;

        // Find the recipe by ID
        const recipe = await this.prisma.recipe.findUnique({
            where: { id: recipeId },
        });

        // Throw NotFoundException if recipe is not found
        if (!recipe) {
            throw new NotFoundException('Recipe not found');
        }

        // Update the recipe data
        return this.prisma.recipe.update({
            where: { id: recipeId },
            data: {
                title,
                description,
                ingredients,
                instructions,
            },
        });
    }

    /**
     * Retrieves all recipes.
     * @returns An array of all recipes.
     */
    async getAllRecipes() {
        return this.prisma.recipe.findMany();
    }

    /**
     * Retrieves a recipe by its ID.
     * @param id - The ID of the recipe to be retrieved.
     * @returns The recipe with the specified ID.
     */
    async getRecipe(id: string) {
        return this.prisma.recipe.findUnique({
            where: { id },
        });
    }

    /**
     * Retrieves recipes by user id.
     * @param id - The ID of the user.
     * @returns An array of all user recipes.
     */
    async getRecipesByUserId(authorId: string) {
        return this.prisma.recipe.findMany({
            where: {
                authorId,
            }
        });
    }

    /**
     * Deletes a recipe by its ID.
     * @param id - The ID of the recipe to be deleted.
     * @returns The deleted recipe.
     */
    async deleteRecipe(id: string) {
        return this.prisma.recipe.delete({
            where: { id },
        });
    }
}
