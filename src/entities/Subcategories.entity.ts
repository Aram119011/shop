
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { CategoriesEntity } from './Categories.entity';
import { ProductsEntity } from './Products.entity';

@Entity('Subcategories')
export class SubcategoriesEntity {
  @PrimaryGeneratedColumn()
  subcategoryID: number;

  @ManyToOne(() => CategoriesEntity, (category) => category.subcategories, { onDelete: 'CASCADE' })
  category: CategoriesEntity;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ProductsEntity, (product) => product.subcategory)
  products: ProductsEntity[];
}
