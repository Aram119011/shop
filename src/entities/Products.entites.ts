
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductVariantsEntity } from './Product-variants.entity';
import { OrderItemsEntity } from './Order-items.entity';

@Entity('Products')
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  ProductID: number;

  @Column({ type: 'varchar', length: 255 })
  Name: string;

  @Column({ type: 'text', nullable: true })
  Description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Price: number;

  @OneToMany(() => OrderItemsEntity, (orderItem) => orderItem.Product)
  OrderItems: OrderItemsEntity[];

  @OneToMany(() => ProductVariantsEntity, (variant) => variant.VariantID)
  Variants: ProductVariantsEntity[];

  @Column({ type: 'int', default: 0 })
  StockQuantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  UpdatedAt: Date;
}
