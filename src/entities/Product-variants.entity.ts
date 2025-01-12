
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductsEntity } from './Products.entity';

@Entity('ProductVariants')
export class ProductVariantsEntity {
  @PrimaryGeneratedColumn()
  variantID: number;

  @ManyToOne(() => ProductsEntity, (product) => product.variants, { onDelete: 'CASCADE' })
  product: ProductsEntity;

  @Column({ type: 'varchar', length: 50, nullable: true })
  size: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  color: string;

  @Column({ type: 'int', default: 0 })
  stockQuantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;
}
