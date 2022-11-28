# PurchaseApi

All URIs are relative to *https://stage.redoc.cledeploy.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**purchaseGet**](PurchaseApi.md#purchaseGet) | **GET** /api/Purchase/{id} | Get purchase by id |
| [**purchasePost**](PurchaseApi.md#purchasePost) | **POST** /api/Purchase | Create purchase |
| [**purchasePostCart**](PurchaseApi.md#purchasePostCart) | **POST** /api/Purchase/cart | Create shopping cart |


<a name="purchaseGet"></a>
# **purchaseGet**
> PurchaseGet purchaseGet(id)

Get purchase by id

    Retrieves purchase by unique id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| Id of purchase | [default to null] |

### Return type

[**PurchaseGet**](../Models/PurchaseGet.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="purchasePost"></a>
# **purchasePost**
> ShoppingCart purchasePost(PurchasePost)

Create purchase

    Create purchase from shopping cart

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **PurchasePost** | [**PurchasePost**](../Models/PurchasePost.md)| Purchase data | |

### Return type

[**ShoppingCart**](../Models/ShoppingCart.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

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

