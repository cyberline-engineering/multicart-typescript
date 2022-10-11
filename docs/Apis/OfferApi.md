# OfferApi

All URIs are relative to *https://stage.redoc.cledeploy.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**offerDelete**](OfferApi.md#offerDelete) | **DELETE** /api/Offer/{id} | Delete offer |
| [**offerGet**](OfferApi.md#offerGet) | **GET** /api/Offer/{id} | Get offer by id |
| [**offerList**](OfferApi.md#offerList) | **GET** /api/Offer | Get offers for user (paged) |
| [**offerPatch**](OfferApi.md#offerPatch) | **PATCH** /api/Offer/{id} | Patch offer |
| [**offerPost**](OfferApi.md#offerPost) | **POST** /api/Offer | Create new offer |
| [**offerPut**](OfferApi.md#offerPut) | **PUT** /api/Offer/{id} | Update offer |


<a name="offerDelete"></a>
# **offerDelete**
> offerDelete(id)

Delete offer

    Delete offer with id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| Offer id to delete | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="offerGet"></a>
# **offerGet**
> OfferGet offerGet(id)

Get offer by id

    Retrieves offer by unique id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| Id of the offer | [default to null] |

### Return type

[**OfferGet**](../Models/OfferGet.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="offerList"></a>
# **offerList**
> OfferPagingResponse offerList(Name, GroupId, PageSize, Dir, PageToken, IncludedProperties)

Get offers for user (paged)

    Retrieves offers by pages applying filters (name or group id)

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **Name** | **String**| Offer name | [optional] [default to null] |
| **GroupId** | **String**| Offer group id | [optional] [default to null] |
| **PageSize** | **Integer**| Page size (from 1 to 50, default 20) | [optional] [default to null] |
| **Dir** | [**EnPageDirection**](../Models/.md)| Direction of paging | [optional] [default to null] [enum: Desc, Asc] |
| **PageToken** | **String**| Current position token (from previous page response) | [optional] [default to null] |
| **IncludedProperties** | [**List**](../Models/String.md)|  | [optional] [default to null] |

### Return type

[**OfferPagingResponse**](../Models/OfferPagingResponse.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="offerPatch"></a>
# **offerPatch**
> offerPatch(id, OfferPatch)

Patch offer

    Patch offer by id (only the fields provided in the request will be changed)

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| Offer id for patch | [default to null] |
| **OfferPatch** | [**OfferPatch**](../Models/OfferPatch.md)| Offer data | |

### Return type

null (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="offerPost"></a>
# **offerPost**
> offerPost(OfferPost)

Create new offer

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **OfferPost** | [**OfferPost**](../Models/OfferPost.md)| Offer to add | |

### Return type

null (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="offerPut"></a>
# **offerPut**
> offerPut(id, OfferPost)

Update offer

    Update offer by id (all fields will be changed)

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| Offer id for update | [default to null] |
| **OfferPost** | [**OfferPost**](../Models/OfferPost.md)| Offer data | |

### Return type

null (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

