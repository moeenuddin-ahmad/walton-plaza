// list page
export const GET_PRODUCTS_LIST = `
  query GetProducts($skip: Int, $limit: Int) {
    getProducts(
      pagination: { skip: $skip, limit: $limit }
      filter: { isActive: true }
    ) {
      message
      statusCode
      result {
        count
        products {
          uid
          enName
          images { url }
          variants {
            mrpPrice
            discount { amount value type }
            quantity
          }
        }
      }
    }
  }
`;

// details page
export const GET_PRODUCT_DETAIL = `
  query GetProductDetail($uid: String) {
    getProducts(
      pagination: { skip: 0, limit: 1 }
      filter: { uid: $uid }
    ) {
      message
      statusCode
      result {
        count
        products {
          uid
          enName
          images { url }
          productAttributes { enLabel values { enName } }
          detailedDescriptions { enLabel values { enName } }
          deliveries { enLabel values { enName } }
          serviceAndDeliveries { enLabel values { enName } }
          priceAndStocks { enLabel values { enName } }
          variants {
            mrpPrice
            ebsItemCode
            posItemCode
            quantity
            discount { amount value type }
          }
        }
      }
    }
  }
`;
