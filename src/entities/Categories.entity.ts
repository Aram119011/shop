
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { SubcategoriesEntity } from './Subcategories.entity';
import { ProductsEntity } from './Products.entity';

@Entity('Categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  categoryID: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => SubcategoriesEntity, (subcategory) => subcategory.category)
  subcategories: SubcategoriesEntity[];

  @OneToMany(() => ProductsEntity, (product) => product.category)
  products: ProductsEntity[];
}

