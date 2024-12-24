
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductsEntity } from './Products.entites';

@Entity('ProductVariants')
export class ProductVariantsEntity {
  @PrimaryGeneratedColumn()
  VariantID: number;

  @ManyToOne(() => ProductsEntity, (product) => product.Variants, { nullable: false })
  Product: ProductsEntity;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Size: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Color: string;

  @Column({ type: 'int', default: 0 })
  StockQuantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  Price: number;
}
