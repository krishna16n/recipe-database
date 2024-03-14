import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class RecipesService {

    constructor(private prisma: PrismaService) { }

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

        // Check if the user is the author of the recipe
        // if (recipe.authorId !== userId) {
        //     throw new NotFoundException('Recipe not found');
        // }

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

    async getAllRecipes() {
        return this.prisma.recipe.findMany();
    }

    async getRecipe(id: string) {
        return this.prisma.recipe.findUnique({
            where: { id },
        });
    }

    async deleteRecipe(id: string) {
        return this.prisma.recipe.delete({
            where: { id },
        });
    }
}
