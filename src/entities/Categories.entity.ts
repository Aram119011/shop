
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { SubcategoriesEntity } from './Subcategories.entity';

@Entity('Categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  CategoryID: number;

  @Column({ type: 'varchar', length: 255 })
  Name: string;

  @Column({ type: 'text', nullable: true })
  Description: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @OneToMany(() => SubcategoriesEntity, (subcategory) => subcategory.Category)
  Subcategories: SubcategoriesEntity[];
}
