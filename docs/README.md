# Documentation for Multicart API

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *https://stage.redoc.cledeploy.com*

| Class | Method | HTTP request | Description |
|------------ | ------------- | ------------- | -------------|
| *AdminCartItemApi* | [**adminCartItemDelete**](Apis/AdminCartItemApi.md#admincartitemdelete) | **DELETE** /api/admin/CartItem/{id} | Delete cart item |
*AdminCartItemApi* | [**adminCartItemGet**](Apis/AdminCartItemApi.md#admincartitemget) | **GET** /api/admin/CartItem/{id} | Get cart item by id |
*AdminCartItemApi* | [**adminCartItemList**](Apis/AdminCartItemApi.md#admincartitemlist) | **GET** /api/admin/CartItem | Get cart items for user (paged) |
*AdminCartItemApi* | [**adminCartItemPatch**](Apis/AdminCartItemApi.md#admincartitempatch) | **PATCH** /api/admin/CartItem/{id} | Patch cart item by id |
*AdminCartItemApi* | [**adminCartItemPost**](Apis/AdminCartItemApi.md#admincartitempost) | **POST** /api/admin/CartItem | Add cart item |
*AdminCartItemApi* | [**adminCartItemPut**](Apis/AdminCartItemApi.md#admincartitemput) | **PUT** /api/admin/CartItem/{id} | Update cart item |
| *CartItemApi* | [**cartItemDelete**](Apis/CartItemApi.md#cartitemdelete) | **DELETE** /api/CartItem/{id} | Delete cart item |
*CartItemApi* | [**cartItemGet**](Apis/CartItemApi.md#cartitemget) | **GET** /api/CartItem/{id} | Get cart item by id |
*CartItemApi* | [**cartItemGetWithSync**](Apis/CartItemApi.md#cartitemgetwithsync) | **GET** /api/CartItem/{id}/sync | Get cart item by id with sync |
*CartItemApi* | [**cartItemList**](Apis/CartItemApi.md#cartitemlist) | **GET** /api/CartItem | Get cart items for user (paged) |
*CartItemApi* | [**cartItemPatch**](Apis/CartItemApi.md#cartitempatch) | **PATCH** /api/CartItem/{id} | Patch cart item by id |
*CartItemApi* | [**cartItemPost**](Apis/CartItemApi.md#cartitempost) | **POST** /api/CartItem | Add cart item |
*CartItemApi* | [**cartItemPut**](Apis/CartItemApi.md#cartitemput) | **PUT** /api/CartItem/{id} | Update cart item |
| *OfferApi* | [**offerDelete**](Apis/OfferApi.md#offerdelete) | **DELETE** /api/Offer/{id} | Delete offer |
*OfferApi* | [**offerGet**](Apis/OfferApi.md#offerget) | **GET** /api/Offer/{id} | Get offer by id |
*OfferApi* | [**offerGetByLink**](Apis/OfferApi.md#offergetbylink) | **GET** /api/Offer/link/{link} | Get offer by link |
*OfferApi* | [**offerList**](Apis/OfferApi.md#offerlist) | **GET** /api/Offer | Get offers for user (paged) |
*OfferApi* | [**offerPatch**](Apis/OfferApi.md#offerpatch) | **PATCH** /api/Offer/{id} | Patch offer |
*OfferApi* | [**offerPost**](Apis/OfferApi.md#offerpost) | **POST** /api/Offer | Create new offer |
*OfferApi* | [**offerPut**](Apis/OfferApi.md#offerput) | **PUT** /api/Offer/{id} | Update offer |
| *PurchaseApi* | [**purchaseGet**](Apis/PurchaseApi.md#purchaseget) | **GET** /api/Purchase/{id} | Get purchase by id |
*PurchaseApi* | [**purchasePost**](Apis/PurchaseApi.md#purchasepost) | **POST** /api/Purchase | Create purchase |
*PurchaseApi* | [**purchasePostCart**](Apis/PurchaseApi.md#purchasepostcart) | **POST** /api/Purchase/cart | Create shopping cart |


<a name="documentation-for-models"></a>
## Documentation for Models

 - [ApiError](./Models/ApiError.md)
 - [ApiErrorOfCreateOfferConflictErrorData](./Models/ApiErrorOfCreateOfferConflictErrorData.md)
 - [ApiErrorOfCreateOfferConflictErrorData_allOf](./Models/ApiErrorOfCreateOfferConflictErrorData_allOf.md)
 - [ApiErrorOfCreateOfferLimitReachedErrorData](./Models/ApiErrorOfCreateOfferLimitReachedErrorData.md)
 - [ApiErrorOfCreateOfferLimitReachedErrorData_allOf](./Models/ApiErrorOfCreateOfferLimitReachedErrorData_allOf.md)
 - [ApiErrorOfShoppingCartErrorData](./Models/ApiErrorOfShoppingCartErrorData.md)
 - [ApiErrorOfShoppingCartErrorData_allOf](./Models/ApiErrorOfShoppingCartErrorData_allOf.md)
 - [CaptchaChallengeOptions](./Models/CaptchaChallengeOptions.md)
 - [CaptchaServiceType](./Models/CaptchaServiceType.md)
 - [CartItemBody](./Models/CartItemBody.md)
 - [CartItemBodyAdmin](./Models/CartItemBodyAdmin.md)
 - [CartItemBodyAdmin_allOf](./Models/CartItemBodyAdmin_allOf.md)
 - [CartItemGet](./Models/CartItemGet.md)
 - [CartItemGetAdmin](./Models/CartItemGetAdmin.md)
 - [CartItemGetAdmin_allOf](./Models/CartItemGetAdmin_allOf.md)
 - [CartItemGet_allOf](./Models/CartItemGet_allOf.md)
 - [CartItemPagingResponse](./Models/CartItemPagingResponse.md)
 - [CartItemPatch](./Models/CartItemPatch.md)
 - [CartItemPatch_allOf](./Models/CartItemPatch_allOf.md)
 - [CartItemPost](./Models/CartItemPost.md)
 - [CartItemSync](./Models/CartItemSync.md)
 - [CartItemSync_allOf](./Models/CartItemSync_allOf.md)
 - [CartItemVariantSelect](./Models/CartItemVariantSelect.md)
 - [CreateOfferConflictErrorData](./Models/CreateOfferConflictErrorData.md)
 - [CreateOfferLimitReachedErrorData](./Models/CreateOfferLimitReachedErrorData.md)
 - [Discount](./Models/Discount.md)
 - [EnPageDirection](./Models/EnPageDirection.md)
 - [EnPlatformType](./Models/EnPlatformType.md)
 - [OfferBody](./Models/OfferBody.md)
 - [OfferGet](./Models/OfferGet.md)
 - [OfferGet_allOf](./Models/OfferGet_allOf.md)
 - [OfferLinkData](./Models/OfferLinkData.md)
 - [OfferPagingResponse](./Models/OfferPagingResponse.md)
 - [OfferPatch](./Models/OfferPatch.md)
 - [OfferPatch_allOf](./Models/OfferPatch_allOf.md)
 - [OfferPost](./Models/OfferPost.md)
 - [OfferPost_allOf](./Models/OfferPost_allOf.md)
 - [PagingResponseOfCartItemGet](./Models/PagingResponseOfCartItemGet.md)
 - [PagingResponseOfOfferGet](./Models/PagingResponseOfOfferGet.md)
 - [PerimetrXOptions](./Models/PerimetrXOptions.md)
 - [PlatformState](./Models/PlatformState.md)
 - [PriceData](./Models/PriceData.md)
 - [PurchaseBody](./Models/PurchaseBody.md)
 - [PurchaseCartItemGet](./Models/PurchaseCartItemGet.md)
 - [PurchaseGet](./Models/PurchaseGet.md)
 - [PurchaseGet_allOf](./Models/PurchaseGet_allOf.md)
 - [PurchasePost](./Models/PurchasePost.md)
 - [ResultGuid](./Models/ResultGuid.md)
 - [ShoppingCart](./Models/ShoppingCart.md)
 - [ShoppingCartErrorData](./Models/ShoppingCartErrorData.md)
 - [ShoppingCartItem](./Models/ShoppingCartItem.md)
 - [ShoppingCartItemPost](./Models/ShoppingCartItemPost.md)
 - [ShoppingCartItem_allOf](./Models/ShoppingCartItem_allOf.md)
 - [ShoppingCartPost](./Models/ShoppingCartPost.md)
 - [ShoppingCartProblem](./Models/ShoppingCartProblem.md)
 - [Variant](./Models/Variant.md)
 - [VariantCategory](./Models/VariantCategory.md)
 - [VariantCategoryDisplayType](./Models/VariantCategoryDisplayType.md)
 - [VariantCategoryOptions](./Models/VariantCategoryOptions.md)
 - [VariantDisplayType](./Models/VariantDisplayType.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

<a name="bearer"></a>
### bearer

- **Type**: OAuth
- **Flow**: implicit
- **Authorization URL**: https://stage.identity.multicartshop.com/api/connect/authorize
- **Scopes**: 
  - multicart.api: Access to protected Multicartshop resources
  - multicart.admin.product: Admin Access to Multicartshop Product resources
  - multicart.admin.offer: Admin Access to Multicartshop Offer resources

