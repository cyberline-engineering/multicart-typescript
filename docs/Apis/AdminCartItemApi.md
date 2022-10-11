# AdminCartItemApi

All URIs are relative to *https://stage.redoc.cledeploy.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**adminCartItemDelete**](AdminCartItemApi.md#adminCartItemDelete) | **DELETE** /api/admin/CartItem/{id} | Delete cart item |
| [**adminCartItemGet**](AdminCartItemApi.md#adminCartItemGet) | **GET** /api/admin/CartItem/{id} | Get cart item by id |
| [**adminCartItemList**](AdminCartItemApi.md#adminCartItemList) | **GET** /api/admin/CartItem | Get cart items for user (paged) |
| [**adminCartItemPatch**](AdminCartItemApi.md#adminCartItemPatch) | **PATCH** /api/admin/CartItem/{id} | Patch cart item by id |
| [**adminCartItemPost**](AdminCartItemApi.md#adminCartItemPost) | **POST** /api/admin/CartItem | Add cart item |
| [**adminCartItemPut**](AdminCartItemApi.md#adminCartItemPut) | **PUT** /api/admin/CartItem/{id} | Update cart item |


<a name="adminCartItemDelete"></a>
# **adminCartItemDelete**
> adminCartItemDelete(id)

Delete cart item

    Delete cart item

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| Cart item id to delete | [default to null] |

### Return type

null (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="adminCartItemGet"></a>
# **adminCartItemGet**
> CartItemGetAdmin adminCartItemGet(id)

Get cart item by id

    Retrieves cart item by unique id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| Id of cart item | [default to null] |

### Return type

[**CartItemGetAdmin**](../Models/CartItemGetAdmin.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="adminCartItemList"></a>
# **adminCartItemList**
> CartItemPagingResponse adminCartItemList(UserId, Platform, Seller, UsItemId, PageSize, Dir, PageToken, IncludedProperties)

Get cart items for user (paged)

    Retrieves cart items by pages applying filter (platform, seller, usItemId)

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **UserId** | **String**| Multicart owner user id | [optional] [default to null] |
| **Platform** | [**EnPlatformType**](../Models/.md)| Platform type | [optional] [default to null] [enum: Walmart, Shopify, Target, Farfetch, Adidas, Michaels, Fanatics, Pandora, Carters, Justice, Nordstrom, Macys, Ulta, Sephora, Kohls, Bestbuy, NetAPorter, BedBathAndBeyond, Gap, HomeDepot, Lowes, GapFactory, Patagonia, DicksSportingGoods, PetSmart, ShopDisney, Elfcosmetics, Shift4Shop, DallasCowboys, AtHome, VictoriasSecret, Nike, Amazon, AthomeMedline, CombatCorner, Explorecuisine, Huel, BestbuyCanada, BigCommerce, DallasGolf, GrandvinWineMerchants, Yamaha, BlissWorld, Fromuthpickleball, TrueValue, Qvc, Coravin, RoomsToGo, Nfm, Gnc, Honest, Abercrombie, HamiltonBeach, SharkClean, NinjaKitchen, Ikea, Clinique, Levi, DripDrop, Complex, Gymshark, Bikini, TomFord, Solerebels, EsteeLauder, SeraLabsHealth, BigStar, Kendrascott, Philosophy, HugoBoss, Jomalone, Hanes, Champion, Bali, HudaBeauty, Highlights, Lushusa, ClarinsUsa, Sonomacutrer, Lancome, Chiccousa, WorldMarket, Michaelkors, Bic, InstantBrands, ReserveBar, VibeBodyCare, ShopTy, LesliesPool, Lululemon, WestElm, Lids, GardenOfLife, Taylormadegolf, Flightscope, NewBalance, PotteryBarn, PotteryBarnKids, PotteryBarnTeen, WilliamsSonoma, MarkAndGraham, Underarmour, UvaBookStores, Bose, BattleSports, Jcpenney, Etsy, LacrosseUnlimited, Staples, Academy, Champssports, Usopenshop, HalfPriceBooks, BathAndBodyWorks, Ralphlauren, CampingWorld, Sportsdirect, Anastasiabeverlyhills, Chanel, Yeti, Crayola, Vans, Lacoste, PoshMark, FloorAndDecor, Overstock, Bloomingdales, AmericanEagle, Tradesy, AceHardware, Fossil, Guess, ChildrenIsPlace, Cabelas, ChineseLaundry, JanieAndJack, Backcountry, Forever21, Tyler, Saksfifthavenue, Venus, ShopifyApp, WooCommerceApp, BigCommerceApp, MagentoApp, SquareSpaceApp, WixApp, PrestaShopApp, ShopwareApp] |
| **Seller** | **String**| Seller | [optional] [default to null] |
| **UsItemId** | **String**| Unique for seller product id | [optional] [default to null] |
| **PageSize** | **Integer**| Page size (from 1 to 50, default 20) | [optional] [default to null] |
| **Dir** | [**EnPageDirection**](../Models/.md)| Direction of paging | [optional] [default to null] [enum: Desc, Asc] |
| **PageToken** | **String**| Current position token (from previous page response) | [optional] [default to null] |
| **IncludedProperties** | [**List**](../Models/String.md)|  | [optional] [default to null] |

### Return type

[**CartItemPagingResponse**](../Models/CartItemPagingResponse.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="adminCartItemPatch"></a>
# **adminCartItemPatch**
> adminCartItemPatch(id, CartItemPatch)

Patch cart item by id

    Patch cart item by id (only the fields provided in the request will be changed)

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| Cart item id for update | [default to null] |
| **CartItemPatch** | [**CartItemPatch**](../Models/CartItemPatch.md)| Cart item data | |

### Return type

null (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="adminCartItemPost"></a>
# **adminCartItemPost**
> ResultGuid adminCartItemPost(CartItemBodyAdmin)

Add cart item

    Add crt item for user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **CartItemBodyAdmin** | [**CartItemBodyAdmin**](../Models/CartItemBodyAdmin.md)| Cart item to add | |

### Return type

[**ResultGuid**](../Models/ResultGuid.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="adminCartItemPut"></a>
# **adminCartItemPut**
> adminCartItemPut(id, CartItemBody)

Update cart item

    Update cart item by id (all fields will be changed)

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**| Cart item id for update | [default to null] |
| **CartItemBody** | [**CartItemBody**](../Models/CartItemBody.md)| Cart item data | |

### Return type

null (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

