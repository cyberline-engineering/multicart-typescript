# CartItemBody
## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
| **usItemId** | **String** | Unique item id on target e-commerce platform | [optional] [default to null] |
| **seller** | **String** | Seller host on target e-commerce platform | [optional] [default to null] |
| **productId** | **String** | Product id on target e-commerce platform | [optional] [default to null] |
| **name** | **String** | Product name | [optional] [default to null] |
| **description** | **String** | Product description  | [optional] [default to null] |
| **url** | **String** | Url of product page on target e-commerce platform  | [optional] [default to null] |
| **imagesUrls** | **List** | Urls of product images | [optional] [default to null] |
| **smallImageUrl** | **String** | Small image url to display on product thumb | [optional] [default to null] |
| **variants** | [**List**](Variant.md) | \&quot;Selected variants for target product\&quot; | [optional] [default to null] |
| **variantCategories** | [**List**](VariantCategory.md) | \&quot;Available variants for target product grouped by categories\&quot; | [optional] [default to null] |
| **priceInfo** | [**PriceData**](PriceData.md) |  | [optional] [default to null] |
| **available** | **Boolean** | \&quot;Product availability\&quot; | [optional] [default to null] |
| **platform** | [**EnPlatformType**](EnPlatformType.md) |  | [optional] [default to null] |
| **platformData** | **String** | Serialized specific platform product data usually in JSON format | [optional] [default to null] |
| **productCategories** | **List** | Categories in which the product belongs | [optional] [default to null] |
| **gtin** | **String** | International marking code. UPC, GTIN-12, GTIN-13, GTIN-14 or ISBN | [optional] [default to null] |
| **mpn** | **String** | Product manufacturer code | [optional] [default to null] |
| **brand** | **String** | Product brand | [optional] [default to null] |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

