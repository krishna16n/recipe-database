import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public ingredients: string;

  @IsNotEmpty()
  @IsString()
  public instructions: string;

  @IsNotEmpty()
  @IsString()
  public authorId: string;
}

export class UpdateRecipeDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public ingredients: string;

  @IsNotEmpty()
  @IsString()
  public instructions: string;
}