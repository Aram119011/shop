
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CategoriesEntity } from './Categories.entity';
import { SubcategoriesEntity } from './Subcategories.entity';
import { ProductVariantsEntity } from './Product-variants.entity';
import { OrderItemsEntity } from './Order-items.entity';

@Entity('Products')
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  productID: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => CategoriesEntity, (category) => category.products, { onDelete: 'CASCADE' })
  category: CategoriesEntity;

  @ManyToOne(() => SubcategoriesEntity, (subcategory) => subcategory.products, { onDelete: 'CASCADE' })
  subcategory: SubcategoriesEntity;

  @Column({ type: 'int', default: 0 })
  stockQuantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProductVariantsEntity, (variant) => variant.product)
  variants: ProductVariantsEntity[];

  @OneToMany(() => OrderItemsEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemsEntity[];
}

