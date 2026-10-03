import type { Schema, Struct } from '@strapi/strapi';

export interface ProductProductSize extends Struct.ComponentSchema {
  collectionName: 'components_product_product_sizes';
  info: {
    displayName: 'product-size';
  };
  attributes: {
    price: Schema.Attribute.Integer;
    size: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'product.product-size': ProductProductSize;
    }
  }
}
