
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { CategoriesEntity } from './Categories.entity';

@Entity('Subcategories')
export class SubcategoriesEntity {
  @PrimaryGeneratedColumn()
  SubcategoryID: number;

  @ManyToOne(() => CategoriesEntity, (category) => category.Subcategories, { nullable: false })
  Category: CategoriesEntity;

  @Column({ type: 'varchar', length: 255 })
  Name: string;

  @Column({ type: 'text', nullable: true })
  Description: string;

  @CreateDateColumn()
  CreatedAt: Date;
}
