-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "fk_order";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "fk_sku";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_fkey";

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
