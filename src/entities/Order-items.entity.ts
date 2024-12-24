
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrdersEntity } from './Orders.entity';
import { ProductsEntity } from './Products.entites';
import { ProductVariantsEntity } from './Product-variants.entity';

@Entity('OrderItems')
export class OrderItemsEntity {
  @PrimaryGeneratedColumn()
  OrderItemID: number;

  @ManyToOne(() => OrdersEntity, (order) => order.OrderID, { nullable: false })
  Order: OrdersEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.ProductID, { nullable: false })
  Product: ProductsEntity;

  @ManyToOne(() => ProductVariantsEntity, (variant) => variant.VariantID, { nullable: true })
  Variant: ProductVariantsEntity;

  @Column({ type: 'int', nullable: false })
  Quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  Price: number;
}
