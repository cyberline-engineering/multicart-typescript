# PurchaseApi

All URIs are relative to *https://stage.redoc.cledeploy.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**purchasePostCart**](PurchaseApi.md#purchasePostCart) | **POST** /api/Purchase/cart | Create shopping cart |
| [**purchasePostOfferCart**](PurchaseApi.md#purchasePostOfferCart) | **POST** /api/Purchase/offer/{offerId}/cart | Create shopping cart from offer |


<a name="purchasePostCart"></a>
# **purchasePostCart**
> ShoppingCart purchasePostCart(ShoppingCartPost)

Create shopping cart

    Create shopping cart with cart items. At the same time, the cart items are synchronized with the platform

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **ShoppingCartPost** | [**ShoppingCartPost**](../Models/ShoppingCartPost.md)| Shopping cart data | |

### Return type

[**ShoppingCart**](../Models/ShoppingCart.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="purchasePostOfferCart"></a>
# **purchasePostOfferCart**
> ShoppingCart purchasePostOfferCart(offerId)

Create shopping cart from offer

    Create shopping cart with offer cart items. At the same time, the cart items are synchronized with the platform

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **offerId** | **String**| Offer id | [default to null] |

### Return type

[**ShoppingCart**](../Models/ShoppingCart.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

