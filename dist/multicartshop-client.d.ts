import { MulticartOAuthConfigurationParameters } from '@cyberline-engineering/cle-oidc-client';

/**
 *
 */
export declare class AdminCartItemApi extends runtime.BaseAPI {
    /**
     * Delete cart item
     * Delete cart item
     */
    adminCartItemDeleteRaw(requestParameters: AdminCartItemDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;
    /**
     * Delete cart item
     * Delete cart item
     */
    adminCartItemDelete(requestParameters: AdminCartItemDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;
    /**
     * Retrieves cart item by unique id
     * Get cart item by id
     */
    adminCartItemGetRaw(requestParameters: AdminCartItemGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CartItemGetAdmin>>;
    /**
     * Retrieves cart item by unique id
     * Get cart item by id
     */
    adminCartItemGet(requestParameters: AdminCartItemGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CartItemGetAdmin>;
    /**
     * Retrieves cart items by pages applying filter (platform, seller, usItemId)
     * Get cart items for user (paged)
     */
    adminCartItemListRaw(requestParameters: AdminCartItemListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CartItemPagingResponse>>;
    /**
     * Retrieves cart items by pages applying filter (platform, seller, usItemId)
     * Get cart items for user (paged)
     */
    adminCartItemList(requestParameters?: AdminCartItemListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CartItemPagingResponse>;
    /**
     * Patch cart item by id (only the fields provided in the request will be changed)
     * Patch cart item by id
     */
    adminCartItemPatchRaw(requestParameters: AdminCartItemPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;
    /**
     * Patch cart item by id (only the fields provided in the request will be changed)
     * Patch cart item by id
     */
    adminCartItemPatch(requestParameters: AdminCartItemPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;
    /**
     * Add crt item for user
     * Add cart item
     */
    adminCartItemPostRaw(requestParameters: AdminCartItemPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ResultGuid>>;
    /**
     * Add crt item for user
     * Add cart item
     */
    adminCartItemPost(requestParameters: AdminCartItemPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ResultGuid>;
    /**
     * Update cart item by id (all fields will be changed)
     * Update cart item
     */
    adminCartItemPutRaw(requestParameters: AdminCartItemPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;
    /**
     * Update cart item by id (all fields will be changed)
     * Update cart item
     */
    adminCartItemPut(requestParameters: AdminCartItemPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;
}

export declare interface AdminCartItemDeleteRequest {
    id: string;
}

export declare interface AdminCartItemGetRequest {
    id: string;
}

export declare interface AdminCartItemListRequest {
    platform?: EnPlatformType;
    seller?: string | null;
    usItemId?: string | null;
    userId?: string | null;
    pageSize?: number | null;
    dir?: EnPageDirection;
    pageToken?: string | null;
    includedProperties?: Array<string> | null;
}

export declare interface AdminCartItemPatchRequest {
    id: string;
    cartItemPatch: CartItemPatch;
}

export declare interface AdminCartItemPostRequest {
    cartItemBodyAdmin: CartItemBodyAdmin;
}

export declare interface AdminCartItemPutRequest {
    id: string;
    cartItemBody: CartItemBody;
}

/**
 * Api error
 * @export
 * @interface ApiError
 */
export declare interface ApiError {
    /**
     * Error message
     * @type {string}
     * @memberof ApiError
     */
    message?: string | null;
}

/**
 *
 * @export
 * @interface ApiErrorOfCreateOfferConflictErrorData
 */
export declare interface ApiErrorOfCreateOfferConflictErrorData {
    /**
     * Error message
     * @type {string}
     * @memberof ApiErrorOfCreateOfferConflictErrorData
     */
    message?: string | null;
    /**
     *
     * @type {CreateOfferConflictErrorData}
     * @memberof ApiErrorOfCreateOfferConflictErrorData
     */
    errorData?: CreateOfferConflictErrorData;
}

/**
 *
 * @export
 * @interface ApiErrorOfCreateOfferConflictErrorDataAllOf
 */
export declare interface ApiErrorOfCreateOfferConflictErrorDataAllOf {
    /**
     *
     * @type {CreateOfferConflictErrorData}
     * @memberof ApiErrorOfCreateOfferConflictErrorDataAllOf
     */
    errorData?: CreateOfferConflictErrorData;
}

/**
 *
 * @export
 * @interface ApiErrorOfCreateOfferLimitReachedErrorData
 */
export declare interface ApiErrorOfCreateOfferLimitReachedErrorData {
    /**
     * Error message
     * @type {string}
     * @memberof ApiErrorOfCreateOfferLimitReachedErrorData
     */
    message?: string | null;
    /**
     *
     * @type {CreateOfferLimitReachedErrorData}
     * @memberof ApiErrorOfCreateOfferLimitReachedErrorData
     */
    errorData?: CreateOfferLimitReachedErrorData;
}

/**
 *
 * @export
 * @interface ApiErrorOfCreateOfferLimitReachedErrorDataAllOf
 */
export declare interface ApiErrorOfCreateOfferLimitReachedErrorDataAllOf {
    /**
     *
     * @type {CreateOfferLimitReachedErrorData}
     * @memberof ApiErrorOfCreateOfferLimitReachedErrorDataAllOf
     */
    errorData?: CreateOfferLimitReachedErrorData;
}

/**
 *
 * @export
 * @interface ApiErrorOfShoppingCartErrorData
 */
export declare interface ApiErrorOfShoppingCartErrorData {
    /**
     * Error message
     * @type {string}
     * @memberof ApiErrorOfShoppingCartErrorData
     */
    message?: string | null;
    /**
     *
     * @type {ShoppingCartErrorData}
     * @memberof ApiErrorOfShoppingCartErrorData
     */
    errorData?: ShoppingCartErrorData;
}

/**
 *
 * @export
 * @interface ApiErrorOfShoppingCartErrorDataAllOf
 */
export declare interface ApiErrorOfShoppingCartErrorDataAllOf {
    /**
     *
     * @type {ShoppingCartErrorData}
     * @memberof ApiErrorOfShoppingCartErrorDataAllOf
     */
    errorData?: ShoppingCartErrorData;
}

export declare interface ApiResponse<T> {
    raw: Response;
    value(): Promise<T>;
}

/**
 * Multicart API
 * Multicart API documentation
 *
 * The version of the OpenAPI document: 0.1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
export declare const BASE_PATH: string;

/**
 * This is the base class for all generated API classes.
 */
export declare class BaseAPI {
    protected configuration: Configuration;
    private middleware;
    constructor(configuration?: Configuration);
    withMiddleware<T extends BaseAPI>(this: T, ...middlewares: Middleware[]): T;
    withPreMiddleware<T extends BaseAPI>(this: T, ...preMiddlewares: Array<Middleware['pre']>): T;
    withPostMiddleware<T extends BaseAPI>(this: T, ...postMiddlewares: Array<Middleware['post']>): T;
    protected request(context: RequestOpts, initOverrides?: RequestInit | InitOverrideFunction): Promise<Response>;
    private createFetchParams;
    private fetchApi;
    /**
     * Create a shallow clone of `this` by constructing a new instance
     * and then shallow cloning data members.
     */
    private clone;
}

export declare class BlobApiResponse {
    raw: Response;
    constructor(raw: Response);
    value(): Promise<Blob>;
}

export declare function canConsumeForm(consumes: Consume[]): boolean;

/**
 *
 * @export
 * @interface CaptchaChallengeOptions
 */
export declare interface CaptchaChallengeOptions {
    /**
     *
     * @type {PerimetrXOptions}
     * @memberof CaptchaChallengeOptions
     */
    perimetrXOptions?: PerimetrXOptions;
    /**
     *
     * @type {CaptchaServiceType}
     * @memberof CaptchaChallengeOptions
     */
    captchaServiceType?: CaptchaServiceType;
}

/**
 *
 * @export
 */
export declare const CaptchaServiceType: {
    readonly PerimetrX: "PerimetrX";
    readonly HCaptcha: "HCaptcha";
};

export declare type CaptchaServiceType = typeof CaptchaServiceType[keyof typeof CaptchaServiceType];

/**
 *
 */
export declare class CartItemApi extends runtime.BaseAPI {
    /**
     * Delete cart item
     * Delete cart item
     */
    cartItemDeleteRaw(requestParameters: CartItemDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;
    /**
     * Delete cart item
     * Delete cart item
     */
    cartItemDelete(requestParameters: CartItemDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;
    /**
     * Retrieves cart item by unique id
     * Get cart item by id
     */
    cartItemGetRaw(requestParameters: CartItemGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CartItemGet>>;
    /**
     * Retrieves cart item by unique id
     * Get cart item by id
     */
    cartItemGet(requestParameters: CartItemGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CartItemGet>;
    /**
     * Retrieves cart item by unique id with sync
     * Get cart item by id with sync
     */
    cartItemGetWithSyncRaw(requestParameters: CartItemGetWithSyncRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CartItemSync>>;
    /**
     * Retrieves cart item by unique id with sync
     * Get cart item by id with sync
     */
    cartItemGetWithSync(requestParameters: CartItemGetWithSyncRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CartItemSync>;
    /**
     * Retrieves cart items by pages applying filter (platform, seller, usItemId)
     * Get cart items for user (paged)
     */
    cartItemListRaw(requestParameters: CartItemListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CartItemPagingResponse>>;
    /**
     * Retrieves cart items by pages applying filter (platform, seller, usItemId)
     * Get cart items for user (paged)
     */
    cartItemList(requestParameters?: CartItemListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CartItemPagingResponse>;
    /**
     * Patch cart item by id (only the fields provided in the request will be changed)
     * Patch cart item by id
     */
    cartItemPatchRaw(requestParameters: CartItemPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;
    /**
     * Patch cart item by id (only the fields provided in the request will be changed)
     * Patch cart item by id
     */
    cartItemPatch(requestParameters: CartItemPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;
    /**
     * Add cart item for user
     * Add cart item
     */
    cartItemPostRaw(requestParameters: CartItemPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ResultGuid>>;
    /**
     * Add cart item for user
     * Add cart item
     */
    cartItemPost(requestParameters: CartItemPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ResultGuid>;
    /**
     * Update cart item by id (all fields will be changed)
     * Update cart item
     */
    cartItemPutRaw(requestParameters: CartItemPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;
    /**
     * Update cart item by id (all fields will be changed)
     * Update cart item
     */
    cartItemPut(requestParameters: CartItemPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;
}

/**
 * Cart item
 * @export
 * @interface CartItemBody
 */
export declare interface CartItemBody {
    /**
     * Unique item id on target e-commerce platform
     * @type {string}
     * @memberof CartItemBody
     */
    usItemId?: string;
    /**
     * Seller host on target e-commerce platform
     * @type {string}
     * @memberof CartItemBody
     */
    seller?: string;
    /**
     * Product id on target e-commerce platform
     * @type {string}
     * @memberof CartItemBody
     */
    productId?: string;
    /**
     * Product name
     * @type {string}
     * @memberof CartItemBody
     */
    name?: string;
    /**
     * Product description
     * @type {string}
     * @memberof CartItemBody
     */
    description?: string | null;
    /**
     * Url of product page on target e-commerce platform
     * @type {string}
     * @memberof CartItemBody
     */
    url?: string;
    /**
     * Urls of product images
     * @type {Array<string>}
     * @memberof CartItemBody
     */
    imagesUrls?: Array<string>;
    /**
     * Small image url to display on product thumb
     * @type {string}
     * @memberof CartItemBody
     */
    smallImageUrl?: string | null;
    /**
     * "Selected variants for target product"
     * @type {Array<Variant>}
     * @memberof CartItemBody
     */
    variants?: Array<Variant> | null;
    /**
     * "Available variants for target product grouped by categories"
     * @type {Array<VariantCategory>}
     * @memberof CartItemBody
     */
    variantCategories?: Array<VariantCategory> | null;
    /**
     *
     * @type {PriceData}
     * @memberof CartItemBody
     */
    priceData?: PriceData;
    /**
     * "Product availability"
     * @type {boolean}
     * @memberof CartItemBody
     */
    available?: boolean;
    /**
     *
     * @type {EnPlatformType}
     * @memberof CartItemBody
     */
    platform?: EnPlatformType;
    /**
     * Serialized specific platform product data usually in JSON format
     * @type {string}
     * @memberof CartItemBody
     */
    platformData?: string | null;
    /**
     * Categories in which the product belongs
     * @type {Array<string>}
     * @memberof CartItemBody
     */
    productCategories?: Array<string> | null;
    /**
     * International marking code. UPC, GTIN-12, GTIN-13, GTIN-14 or ISBN
     * @type {string}
     * @memberof CartItemBody
     */
    gtin?: string | null;
    /**
     * Product manufacturer code
     * @type {string}
     * @memberof CartItemBody
     */
    mpn?: string | null;
    /**
     * Product brand
     * @type {string}
     * @memberof CartItemBody
     */
    brand?: string | null;
}

/**
 *
 * @export
 * @interface CartItemBodyAdmin
 */
export declare interface CartItemBodyAdmin {
    /**
     * Unique item id on target e-commerce platform
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    usItemId?: string;
    /**
     * Seller host on target e-commerce platform
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    seller?: string;
    /**
     * Product id on target e-commerce platform
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    productId?: string;
    /**
     * Product name
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    name?: string;
    /**
     * Product description
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    description?: string | null;
    /**
     * Url of product page on target e-commerce platform
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    url?: string;
    /**
     * Urls of product images
     * @type {Array<string>}
     * @memberof CartItemBodyAdmin
     */
    imagesUrls?: Array<string>;
    /**
     * Small image url to display on product thumb
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    smallImageUrl?: string | null;
    /**
     * "Selected variants for target product"
     * @type {Array<Variant>}
     * @memberof CartItemBodyAdmin
     */
    variants?: Array<Variant> | null;
    /**
     * "Available variants for target product grouped by categories"
     * @type {Array<VariantCategory>}
     * @memberof CartItemBodyAdmin
     */
    variantCategories?: Array<VariantCategory> | null;
    /**
     *
     * @type {PriceData}
     * @memberof CartItemBodyAdmin
     */
    priceData?: PriceData;
    /**
     * "Product availability"
     * @type {boolean}
     * @memberof CartItemBodyAdmin
     */
    available?: boolean;
    /**
     *
     * @type {EnPlatformType}
     * @memberof CartItemBodyAdmin
     */
    platform?: EnPlatformType;
    /**
     * Serialized specific platform product data usually in JSON format
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    platformData?: string | null;
    /**
     * Categories in which the product belongs
     * @type {Array<string>}
     * @memberof CartItemBodyAdmin
     */
    productCategories?: Array<string> | null;
    /**
     * International marking code. UPC, GTIN-12, GTIN-13, GTIN-14 or ISBN
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    gtin?: string | null;
    /**
     * Product manufacturer code
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    mpn?: string | null;
    /**
     * Product brand
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    brand?: string | null;
    /**
     * Multicart owner user id
     * @type {string}
     * @memberof CartItemBodyAdmin
     */
    userId?: string;
}

/**
 *
 * @export
 * @interface CartItemBodyAdminAllOf
 */
export declare interface CartItemBodyAdminAllOf {
    /**
     * Multicart owner user id
     * @type {string}
     * @memberof CartItemBodyAdminAllOf
     */
    userId?: string;
}

export declare interface CartItemDeleteRequest {
    id: string;
}

/**
 *
 * @export
 * @interface CartItemGet
 */
export declare interface CartItemGet {
    /**
     * Unique item id on target e-commerce platform
     * @type {string}
     * @memberof CartItemGet
     */
    usItemId?: string;
    /**
     * Seller host on target e-commerce platform
     * @type {string}
     * @memberof CartItemGet
     */
    seller?: string;
    /**
     * Product id on target e-commerce platform
     * @type {string}
     * @memberof CartItemGet
     */
    productId?: string;
    /**
     * Product name
     * @type {string}
     * @memberof CartItemGet
     */
    name?: string;
    /**
     * Product description
     * @type {string}
     * @memberof CartItemGet
     */
    description?: string | null;
    /**
     * Url of product page on target e-commerce platform
     * @type {string}
     * @memberof CartItemGet
     */
    url?: string;
    /**
     * Urls of product images
     * @type {Array<string>}
     * @memberof CartItemGet
     */
    imagesUrls?: Array<string>;
    /**
     * Small image url to display on product thumb
     * @type {string}
     * @memberof CartItemGet
     */
    smallImageUrl?: string | null;
    /**
     * "Selected variants for target product"
     * @type {Array<Variant>}
     * @memberof CartItemGet
     */
    variants?: Array<Variant> | null;
    /**
     * "Available variants for target product grouped by categories"
     * @type {Array<VariantCategory>}
     * @memberof CartItemGet
     */
    variantCategories?: Array<VariantCategory> | null;
    /**
     *
     * @type {PriceData}
     * @memberof CartItemGet
     */
    priceData?: PriceData;
    /**
     * "Product availability"
     * @type {boolean}
     * @memberof CartItemGet
     */
    available?: boolean;
    /**
     *
     * @type {EnPlatformType}
     * @memberof CartItemGet
     */
    platform?: EnPlatformType;
    /**
     * Serialized specific platform product data usually in JSON format
     * @type {string}
     * @memberof CartItemGet
     */
    platformData?: string | null;
    /**
     * Categories in which the product belongs
     * @type {Array<string>}
     * @memberof CartItemGet
     */
    productCategories?: Array<string> | null;
    /**
     * International marking code. UPC, GTIN-12, GTIN-13, GTIN-14 or ISBN
     * @type {string}
     * @memberof CartItemGet
     */
    gtin?: string | null;
    /**
     * Product manufacturer code
     * @type {string}
     * @memberof CartItemGet
     */
    mpn?: string | null;
    /**
     * Product brand
     * @type {string}
     * @memberof CartItemGet
     */
    brand?: string | null;
    /**
     * Unique id
     * @type {string}
     * @memberof CartItemGet
     */
    id?: string;
    /**
     * Unique e-commerce platform guid
     * @type {string}
     * @memberof CartItemGet
     */
    platformId?: string;
}

/**
 *
 * @export
 * @interface CartItemGetAdmin
 */
export declare interface CartItemGetAdmin {
    /**
     * Unique item id on target e-commerce platform
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    usItemId?: string;
    /**
     * Seller host on target e-commerce platform
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    seller?: string;
    /**
     * Product id on target e-commerce platform
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    productId?: string;
    /**
     * Product name
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    name?: string;
    /**
     * Product description
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    description?: string | null;
    /**
     * Url of product page on target e-commerce platform
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    url?: string;
    /**
     * Urls of product images
     * @type {Array<string>}
     * @memberof CartItemGetAdmin
     */
    imagesUrls?: Array<string>;
    /**
     * Small image url to display on product thumb
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    smallImageUrl?: string | null;
    /**
     * "Selected variants for target product"
     * @type {Array<Variant>}
     * @memberof CartItemGetAdmin
     */
    variants?: Array<Variant> | null;
    /**
     * "Available variants for target product grouped by categories"
     * @type {Array<VariantCategory>}
     * @memberof CartItemGetAdmin
     */
    variantCategories?: Array<VariantCategory> | null;
    /**
     *
     * @type {PriceData}
     * @memberof CartItemGetAdmin
     */
    priceData?: PriceData;
    /**
     * "Product availability"
     * @type {boolean}
     * @memberof CartItemGetAdmin
     */
    available?: boolean;
    /**
     *
     * @type {EnPlatformType}
     * @memberof CartItemGetAdmin
     */
    platform?: EnPlatformType;
    /**
     * Serialized specific platform product data usually in JSON format
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    platformData?: string | null;
    /**
     * Categories in which the product belongs
     * @type {Array<string>}
     * @memberof CartItemGetAdmin
     */
    productCategories?: Array<string> | null;
    /**
     * International marking code. UPC, GTIN-12, GTIN-13, GTIN-14 or ISBN
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    gtin?: string | null;
    /**
     * Product manufacturer code
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    mpn?: string | null;
    /**
     * Product brand
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    brand?: string | null;
    /**
     * Unique id
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    id?: string;
    /**
     * Unique e-commerce platform guid
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    platformId?: string;
    /**
     * Multicart owner user id
     * @type {string}
     * @memberof CartItemGetAdmin
     */
    userId?: string;
}

/**
 * Cart item
 * @export
 * @interface CartItemGetAdminAllOf
 */
export declare interface CartItemGetAdminAllOf {
    /**
     * Multicart owner user id
     * @type {string}
     * @memberof CartItemGetAdminAllOf
     */
    userId?: string;
}

/**
 * Cart item
 * @export
 * @interface CartItemGetAllOf
 */
export declare interface CartItemGetAllOf {
    /**
     * Unique id
     * @type {string}
     * @memberof CartItemGetAllOf
     */
    id?: string;
    /**
     * Unique e-commerce platform guid
     * @type {string}
     * @memberof CartItemGetAllOf
     */
    platformId?: string;
}

export declare interface CartItemGetRequest {
    id: string;
}

export declare interface CartItemGetWithSyncRequest {
    id: string;
}

export declare interface CartItemListRequest {
    platform?: EnPlatformType;
    seller?: string | null;
    usItemId?: string | null;
    userId?: string | null;
    pageSize?: number | null;
    dir?: EnPageDirection;
    pageToken?: string | null;
    includedProperties?: Array<string> | null;
}

/**
 *
 * @export
 * @interface CartItemPagingResponse
 */
export declare interface CartItemPagingResponse {
    /**
     * Paged data
     * @type {Array<CartItemGet>}
     * @memberof CartItemPagingResponse
     */
    data?: Array<CartItemGet>;
    /**
     * Previous page relative url
     * @type {string}
     * @memberof CartItemPagingResponse
     */
    prevPage?: string | null;
    /**
     * Next page url
     * @type {string}
     * @memberof CartItemPagingResponse
     */
    nextPage?: string | null;
    /**
     * Page size
     * @type {number}
     * @memberof CartItemPagingResponse
     */
    pageSize?: number;
    /**
     * Current next page token
     * @type {string}
     * @memberof CartItemPagingResponse
     */
    nextPageToken?: string | null;
    /**
     * Previous page token
     * @type {string}
     * @memberof CartItemPagingResponse
     */
    prevPageToken?: string | null;
}

/**
 *
 * @export
 * @interface CartItemPatch
 */
export declare interface CartItemPatch {
    /**
     * Unique item id on target e-commerce platform
     * @type {string}
     * @memberof CartItemPatch
     */
    usItemId?: string | null;
    /**
     * Seller host on target e-commerce platform
     * @type {string}
     * @memberof CartItemPatch
     */
    seller?: string | null;
    /**
     * Product id on target e-commerce platform
     * @type {string}
     * @memberof CartItemPatch
     */
    productId?: string | null;
    /**
     * Product name
     * @type {string}
     * @memberof CartItemPatch
     */
    name?: string | null;
    /**
     * Product description
     * @type {string}
     * @memberof CartItemPatch
     */
    description?: string | null;
    /**
     * Url of product page on target e-commerce platform
     * @type {string}
     * @memberof CartItemPatch
     */
    url?: string | null;
    /**
     * Urls of product images
     * @type {Array<string>}
     * @memberof CartItemPatch
     */
    imagesUrls?: Array<string> | null;
    /**
     * Small image url to display on product thumb
     * @type {string}
     * @memberof CartItemPatch
     */
    smallImageUrl?: string | null;
    /**
     * "Selected variants for target product"
     * @type {Array<Variant>}
     * @memberof CartItemPatch
     */
    variants?: Array<Variant> | null;
    /**
     * "Available variants for target product grouped by categories"
     * @type {Array<VariantCategory>}
     * @memberof CartItemPatch
     */
    variantCategories?: Array<VariantCategory> | null;
    /**
     *
     * @type {PriceData}
     * @memberof CartItemPatch
     */
    priceData?: PriceData;
    /**
     * "Product availability"
     * @type {boolean}
     * @memberof CartItemPatch
     */
    available?: boolean | null;
    /**
     *
     * @type {EnPlatformType}
     * @memberof CartItemPatch
     */
    platform?: EnPlatformType;
    /**
     * Serialized specific platform product data usually in JSON format
     * @type {string}
     * @memberof CartItemPatch
     */
    platformData?: string | null;
    /**
     * Categories in which the product belongs
     * @type {Array<string>}
     * @memberof CartItemPatch
     */
    productCategories?: Array<string> | null;
    /**
     * International marking code. UPC, GTIN-12, GTIN-13, GTIN-14 or ISBN
     * @type {string}
     * @memberof CartItemPatch
     */
    gtin?: string | null;
    /**
     * Product manufacturer code
     * @type {string}
     * @memberof CartItemPatch
     */
    mpn?: string | null;
    /**
     * Product brand
     * @type {string}
     * @memberof CartItemPatch
     */
    brand?: string | null;
}

/**
 * Cart item
 * @export
 * @interface CartItemPatchAllOf
 */
export declare interface CartItemPatchAllOf {
    /**
     * Unique item id on target e-commerce platform
     * @type {string}
     * @memberof CartItemPatchAllOf
     */
    usItemId?: string | null;
    /**
     * Seller host on target e-commerce platform
     * @type {string}
     * @memberof CartItemPatchAllOf
     */
    seller?: string | null;
    /**
     * Product id on target e-commerce platform
     * @type {string}
     * @memberof CartItemPatchAllOf
     */
    productId?: string | null;
    /**
     * Product name
     * @type {string}
     * @memberof CartItemPatchAllOf
     */
    name?: string | null;
    /**
     * Product description
     * @type {string}
     * @memberof CartItemPatchAllOf
     */
    description?: string | null;
    /**
     * Url of product page on target e-commerce platform
     * @type {string}
     * @memberof CartItemPatchAllOf
     */
    url?: string | null;
    /**
     * Urls of product images
     * @type {Array<string>}
     * @memberof CartItemPatchAllOf
     */
    imagesUrls?: Array<string> | null;
    /**
     * Small image url to display on product thumb
     * @type {string}
     * @memberof CartItemPatchAllOf
     */
    smallImageUrl?: string | null;
    /**
     * "Selected variants for target product"
     * @type {Array<Variant>}
     * @memberof CartItemPatchAllOf
     */
    variants?: Array<Variant> | null;
    /**
     * "Available variants for target product grouped by categories"
     * @type {Array<VariantCategory>}
     * @memberof CartItemPatchAllOf
     */
    variantCategories?: Array<VariantCategory> | null;
    /**
     *
     * @type {PriceData}
     * @memberof CartItemPatchAllOf
     */
    priceData?: PriceData;
    /**
     * "Product availability"
     * @type {boolean}
     * @memberof CartItemPatchAllOf
     */
    available?: boolean | null;
    /**
     *
     * @type {EnPlatformType}
     * @memberof CartItemPatchAllOf
     */
    platform?: EnPlatformType;
    /**
     * Serialized specific platform product data usually in JSON format
     * @type {string}
     * @memberof CartItemPatchAllOf
     */
    platformData?: string | null;
    /**
     * Categories in which the product belongs
     * @type {Array<string>}
     * @memberof CartItemPatchAllOf
     */
    productCategories?: Array<string> | null;
    /**
     * International marking code. UPC, GTIN-12, GTIN-13, GTIN-14 or ISBN
     * @type {string}
     * @memberof CartItemPatchAllOf
     */
    gtin?: string | null;
    /**
     * Product manufacturer code
     * @type {string}
     * @memberof CartItemPatchAllOf
     */
    mpn?: string | null;
    /**
     * Product brand
     * @type {string}
     * @memberof CartItemPatchAllOf
     */
    brand?: string | null;
}

export declare interface CartItemPatchRequest {
    id: string;
    cartItemPatch: CartItemPatch;
}

/**
 * Cart item
 * @export
 * @interface CartItemPost
 */
export declare interface CartItemPost {
    /**
     * Unique id
     * @type {string}
     * @memberof CartItemPost
     */
    id?: string;
}

export declare interface CartItemPostRequest {
    cartItemBody: CartItemBody;
}

export declare interface CartItemPutRequest {
    id: string;
    cartItemBody: CartItemBody;
}

/**
 *
 * @export
 * @interface CartItemSync
 */
export declare interface CartItemSync {
    /**
     * Unique item id on target e-commerce platform
     * @type {string}
     * @memberof CartItemSync
     */
    usItemId?: string;
    /**
     * Seller host on target e-commerce platform
     * @type {string}
     * @memberof CartItemSync
     */
    seller?: string;
    /**
     * Product id on target e-commerce platform
     * @type {string}
     * @memberof CartItemSync
     */
    productId?: string;
    /**
     * Product name
     * @type {string}
     * @memberof CartItemSync
     */
    name?: string;
    /**
     * Product description
     * @type {string}
     * @memberof CartItemSync
     */
    description?: string | null;
    /**
     * Url of product page on target e-commerce platform
     * @type {string}
     * @memberof CartItemSync
     */
    url?: string;
    /**
     * Urls of product images
     * @type {Array<string>}
     * @memberof CartItemSync
     */
    imagesUrls?: Array<string>;
    /**
     * Small image url to display on product thumb
     * @type {string}
     * @memberof CartItemSync
     */
    smallImageUrl?: string | null;
    /**
     * "Selected variants for target product"
     * @type {Array<Variant>}
     * @memberof CartItemSync
     */
    variants?: Array<Variant> | null;
    /**
     * "Available variants for target product grouped by categories"
     * @type {Array<VariantCategory>}
     * @memberof CartItemSync
     */
    variantCategories?: Array<VariantCategory> | null;
    /**
     *
     * @type {PriceData}
     * @memberof CartItemSync
     */
    priceData?: PriceData;
    /**
     * "Product availability"
     * @type {boolean}
     * @memberof CartItemSync
     */
    available?: boolean;
    /**
     *
     * @type {EnPlatformType}
     * @memberof CartItemSync
     */
    platform?: EnPlatformType;
    /**
     * Serialized specific platform product data usually in JSON format
     * @type {string}
     * @memberof CartItemSync
     */
    platformData?: string | null;
    /**
     * Categories in which the product belongs
     * @type {Array<string>}
     * @memberof CartItemSync
     */
    productCategories?: Array<string> | null;
    /**
     * International marking code. UPC, GTIN-12, GTIN-13, GTIN-14 or ISBN
     * @type {string}
     * @memberof CartItemSync
     */
    gtin?: string | null;
    /**
     * Product manufacturer code
     * @type {string}
     * @memberof CartItemSync
     */
    mpn?: string | null;
    /**
     * Product brand
     * @type {string}
     * @memberof CartItemSync
     */
    brand?: string | null;
    /**
     * Unique id
     * @type {string}
     * @memberof CartItemSync
     */
    id?: string;
    /**
     * Unique e-commerce platform guid
     * @type {string}
     * @memberof CartItemSync
     */
    platformId?: string;
    /**
     * Order limit for cart item count
     * @type {number}
     * @memberof CartItemSync
     */
    orderLimit?: number | null;
    /**
     * Order limit for cart item count minimum
     * @type {number}
     * @memberof CartItemSync
     */
    orderMinLimit?: number | null;
    /**
     * Cart item shippable
     * @type {boolean}
     * @memberof CartItemSync
     */
    shippable?: boolean;
    /**
     *
     * @type {PlatformState}
     * @memberof CartItemSync
     */
    platformState?: PlatformState;
}

/**
 * Cart item
 * @export
 * @interface CartItemSyncAllOf
 */
export declare interface CartItemSyncAllOf {
    /**
     * Order limit for cart item count
     * @type {number}
     * @memberof CartItemSyncAllOf
     */
    orderLimit?: number | null;
    /**
     * Order limit for cart item count minimum
     * @type {number}
     * @memberof CartItemSyncAllOf
     */
    orderMinLimit?: number | null;
    /**
     * Cart item shippable
     * @type {boolean}
     * @memberof CartItemSyncAllOf
     */
    shippable?: boolean;
    /**
     *
     * @type {PlatformState}
     * @memberof CartItemSyncAllOf
     */
    platformState?: PlatformState;
}

/**
 * Cart item variant
 * @export
 * @interface CartItemVariantSelect
 */
export declare interface CartItemVariantSelect {
    /**
     * Selected category id (if exists)
     * @type {string}
     * @memberof CartItemVariantSelect
     */
    categoryId?: string;
    /**
     * Selected variant id
     * @type {string}
     * @memberof CartItemVariantSelect
     */
    variantId?: string;
}

export declare const COLLECTION_FORMATS: {
    csv: string;
    ssv: string;
    tsv: string;
    pipes: string;
};

export declare class Configuration {
    private configuration;
    constructor(configuration?: ConfigurationParameters);
    set config(configuration: Configuration);
    get basePath(): string;
    get fetchApi(): FetchAPI | undefined;
    get middleware(): Middleware[];
    get queryParamsStringify(): (params: HTTPQuery) => string;
    get username(): string | undefined;
    get password(): string | undefined;
    get apiKey(): ((name: string) => string) | undefined;
    get accessToken(): ((name?: string, scopes?: string[]) => string | Promise<string>) | undefined;
    get headers(): HTTPHeaders | undefined;
    get credentials(): RequestCredentials | undefined;
}

export declare interface ConfigurationParameters {
    basePath?: string;
    fetchApi?: FetchAPI;
    middleware?: Middleware[];
    queryParamsStringify?: (params: HTTPQuery) => string;
    username?: string;
    password?: string;
    apiKey?: string | ((name: string) => string);
    accessToken?: string | Promise<string> | ((name?: string, scopes?: string[]) => string | Promise<string>);
    headers?: HTTPHeaders;
    credentials?: RequestCredentials;
}

export declare interface Consume {
    contentType: string;
}

/**
 * Create offer error data for conflict
 * @export
 * @interface CreateOfferConflictErrorData
 */
export declare interface CreateOfferConflictErrorData {
    /**
     * Not unique links in offer
     * @type {Array<string>}
     * @memberof CreateOfferConflictErrorData
     */
    notUniqueLinks?: Array<string> | null;
    /**
     * Main link already
     * @type {boolean}
     * @memberof CreateOfferConflictErrorData
     */
    mainLinkAlreadyTaken?: boolean | null;
    /**
     * Id offer link collision
     * @type {boolean}
     * @memberof CreateOfferConflictErrorData
     */
    idOfferLinkCollision?: boolean | null;
}

/**
 * Create offer error data for user limit reached
 * @export
 * @interface CreateOfferLimitReachedErrorData
 */
export declare interface CreateOfferLimitReachedErrorData {
    /**
     * User limit reached
     * @type {boolean}
     * @memberof CreateOfferLimitReachedErrorData
     */
    limitReached?: boolean | null;
}

export declare const DefaultConfig: Configuration;

/**
 * Discount coupons info
 * @export
 * @interface Discount
 */
export declare interface Discount {
    /**
     * Dictionary by Platform guid key, then Dictionary by Seller key
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof Discount
     */
    coupons?: {
        [key: string]: {
            [key: string]: string;
        };
    };
}

/**
 * Sorting page direction
 * @export
 */
export declare const EnPageDirection: {
    readonly Desc: "Desc";
    readonly Asc: "Asc";
};

export declare type EnPageDirection = typeof EnPageDirection[keyof typeof EnPageDirection];

/**
 *
 * @export
 */
export declare const EnPlatformType: {
    readonly Walmart: "Walmart";
    readonly Shopify: "Shopify";
    readonly Target: "Target";
    readonly Farfetch: "Farfetch";
    readonly Adidas: "Adidas";
    readonly Michaels: "Michaels";
    readonly Fanatics: "Fanatics";
    readonly Pandora: "Pandora";
    readonly Carters: "Carters";
    readonly Justice: "Justice";
    readonly Nordstrom: "Nordstrom";
    readonly Macys: "Macys";
    readonly Ulta: "Ulta";
    readonly Sephora: "Sephora";
    readonly Kohls: "Kohls";
    readonly Bestbuy: "Bestbuy";
    readonly NetAPorter: "NetAPorter";
    readonly BedBathAndBeyond: "BedBathAndBeyond";
    readonly Gap: "Gap";
    readonly HomeDepot: "HomeDepot";
    readonly Lowes: "Lowes";
    readonly GapFactory: "GapFactory";
    readonly Patagonia: "Patagonia";
    readonly DicksSportingGoods: "DicksSportingGoods";
    readonly PetSmart: "PetSmart";
    readonly ShopDisney: "ShopDisney";
    readonly Elfcosmetics: "Elfcosmetics";
    readonly Shift4Shop: "Shift4Shop";
    readonly DallasCowboys: "DallasCowboys";
    readonly AtHome: "AtHome";
    readonly VictoriasSecret: "VictoriasSecret";
    readonly Nike: "Nike";
    readonly Amazon: "Amazon";
    readonly AthomeMedline: "AthomeMedline";
    readonly CombatCorner: "CombatCorner";
    readonly Explorecuisine: "Explorecuisine";
    readonly Huel: "Huel";
    readonly BestbuyCanada: "BestbuyCanada";
    readonly BigCommerce: "BigCommerce";
    readonly DallasGolf: "DallasGolf";
    readonly GrandvinWineMerchants: "GrandvinWineMerchants";
    readonly Yamaha: "Yamaha";
    readonly BlissWorld: "BlissWorld";
    readonly Fromuthpickleball: "Fromuthpickleball";
    readonly TrueValue: "TrueValue";
    readonly Qvc: "Qvc";
    readonly Coravin: "Coravin";
    readonly RoomsToGo: "RoomsToGo";
    readonly Nfm: "Nfm";
    readonly Gnc: "Gnc";
    readonly Honest: "Honest";
    readonly Abercrombie: "Abercrombie";
    readonly HamiltonBeach: "HamiltonBeach";
    readonly SharkClean: "SharkClean";
    readonly NinjaKitchen: "NinjaKitchen";
    readonly Ikea: "Ikea";
    readonly Clinique: "Clinique";
    readonly Levi: "Levi";
    readonly DripDrop: "DripDrop";
    readonly Complex: "Complex";
    readonly Gymshark: "Gymshark";
    readonly Bikini: "Bikini";
    readonly TomFord: "TomFord";
    readonly Solerebels: "Solerebels";
    readonly EsteeLauder: "EsteeLauder";
    readonly SeraLabsHealth: "SeraLabsHealth";
    readonly BigStar: "BigStar";
    readonly Kendrascott: "Kendrascott";
    readonly Philosophy: "Philosophy";
    readonly HugoBoss: "HugoBoss";
    readonly Jomalone: "Jomalone";
    readonly Hanes: "Hanes";
    readonly Champion: "Champion";
    readonly Bali: "Bali";
    readonly HudaBeauty: "HudaBeauty";
    readonly Highlights: "Highlights";
    readonly Lushusa: "Lushusa";
    readonly ClarinsUsa: "ClarinsUsa";
    readonly Sonomacutrer: "Sonomacutrer";
    readonly Lancome: "Lancome";
    readonly Chiccousa: "Chiccousa";
    readonly WorldMarket: "WorldMarket";
    readonly Michaelkors: "Michaelkors";
    readonly Bic: "Bic";
    readonly InstantBrands: "InstantBrands";
    readonly ReserveBar: "ReserveBar";
    readonly VibeBodyCare: "VibeBodyCare";
    readonly ShopTy: "ShopTy";
    readonly LesliesPool: "LesliesPool";
    readonly Lululemon: "Lululemon";
    readonly WestElm: "WestElm";
    readonly Lids: "Lids";
    readonly GardenOfLife: "GardenOfLife";
    readonly Taylormadegolf: "Taylormadegolf";
    readonly Flightscope: "Flightscope";
    readonly NewBalance: "NewBalance";
    readonly PotteryBarn: "PotteryBarn";
    readonly PotteryBarnKids: "PotteryBarnKids";
    readonly PotteryBarnTeen: "PotteryBarnTeen";
    readonly WilliamsSonoma: "WilliamsSonoma";
    readonly MarkAndGraham: "MarkAndGraham";
    readonly Underarmour: "Underarmour";
    readonly UvaBookStores: "UvaBookStores";
    readonly Bose: "Bose";
    readonly BattleSports: "BattleSports";
    readonly Jcpenney: "Jcpenney";
    readonly Etsy: "Etsy";
    readonly LacrosseUnlimited: "LacrosseUnlimited";
    readonly Staples: "Staples";
    readonly Academy: "Academy";
    readonly Champssports: "Champssports";
    readonly Usopenshop: "Usopenshop";
    readonly HalfPriceBooks: "HalfPriceBooks";
    readonly BathAndBodyWorks: "BathAndBodyWorks";
    readonly Ralphlauren: "Ralphlauren";
    readonly CampingWorld: "CampingWorld";
    readonly Sportsdirect: "Sportsdirect";
    readonly Anastasiabeverlyhills: "Anastasiabeverlyhills";
    readonly Chanel: "Chanel";
    readonly Yeti: "Yeti";
    readonly Crayola: "Crayola";
    readonly Vans: "Vans";
    readonly Lacoste: "Lacoste";
    readonly PoshMark: "PoshMark";
    readonly FloorAndDecor: "FloorAndDecor";
    readonly Overstock: "Overstock";
    readonly Bloomingdales: "Bloomingdales";
    readonly AmericanEagle: "AmericanEagle";
    readonly Tradesy: "Tradesy";
    readonly AceHardware: "AceHardware";
    readonly Fossil: "Fossil";
    readonly Guess: "Guess";
    readonly ChildrenIsPlace: "ChildrenIsPlace";
    readonly Cabelas: "Cabelas";
    readonly ChineseLaundry: "ChineseLaundry";
    readonly JanieAndJack: "JanieAndJack";
    readonly Backcountry: "Backcountry";
    readonly Forever21: "Forever21";
    readonly Tyler: "Tyler";
    readonly Saksfifthavenue: "Saksfifthavenue";
    readonly Venus: "Venus";
    readonly OnlineShoes: "OnlineShoes";
    readonly Lee: "Lee";
    readonly CampMan: "CampMan";
    readonly BlackDiamond: "BlackDiamond";
    readonly Fabulousfurs: "Fabulousfurs";
    readonly Fragrancenet: "Fragrancenet";
    readonly Belk: "Belk";
    readonly Sears: "Sears";
    readonly Reebok: "Reebok";
    readonly DrJays: "DrJays";
    readonly Burberry: "Burberry";
    readonly Timberland: "Timberland";
    readonly LlBean: "LLBean";
    readonly Kmart: "Kmart";
    readonly LittleBoyChic: "LittleBoyChic";
    readonly NaturesJewelry: "NaturesJewelry";
    readonly Converse: "Converse";
    readonly Zara: "Zara";
    readonly ShopifyApp: "ShopifyApp";
    readonly WooCommerceApp: "WooCommerceApp";
    readonly BigCommerceApp: "BigCommerceApp";
    readonly MagentoApp: "MagentoApp";
    readonly SquareSpaceApp: "SquareSpaceApp";
    readonly WixApp: "WixApp";
    readonly PrestaShopApp: "PrestaShopApp";
    readonly ShopwareApp: "ShopwareApp";
    readonly Unknown: "Unknown";
};

export declare type EnPlatformType = typeof EnPlatformType[keyof typeof EnPlatformType];

export declare interface ErrorContext {
    fetch: FetchAPI;
    url: string;
    init: RequestInit;
    error: unknown;
    response?: Response;
}

export declare type FetchAPI = WindowOrWorkerGlobalScope['fetch'];

export declare class FetchError extends Error {
    cause: Error;
    name: 'FetchError';
    constructor(cause: Error, msg?: string);
}

export declare interface FetchParams {
    url: string;
    init: RequestInit;
}

export declare type HTTPBody = Json | FormData | URLSearchParams;

export declare type HTTPHeaders = {
    [key: string]: string;
};

export declare type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

export declare type HTTPQuery = {
    [key: string]: string | number | null | boolean | Array<string | number | null | boolean> | Set<string | number | null | boolean> | HTTPQuery;
};

export declare type HTTPRequestInit = {
    headers?: HTTPHeaders;
    method: HTTPMethod;
    credentials?: RequestCredentials;
    body?: HTTPBody;
};

export declare const initializeMulticartApiClient: ({ oauthConfig, clientConfig, }?: {
    oauthConfig?: MulticartOAuthConfigurationParameters | undefined;
    clientConfig?: ConfigurationParameters | undefined;
}) => void;

export declare type InitOverrideFunction = (requestContext: {
    init: HTTPRequestInit;
    context: RequestOpts;
}) => Promise<RequestInit>;

export declare type Json = any;

export declare class JSONApiResponse<T> {
    raw: Response;
    private transformer;
    constructor(raw: Response, transformer?: ResponseTransformer<T>);
    value(): Promise<T>;
}

export declare interface Middleware {
    pre?(context: RequestContext): Promise<FetchParams | void>;
    post?(context: ResponseContext): Promise<Response | void>;
    onError?(context: ErrorContext): Promise<Response | void>;
}

export declare type ModelPropertyNaming = 'camelCase' | 'snake_case' | 'PascalCase' | 'original';

/**
 *
 */
export declare class OfferApi extends runtime.BaseAPI {
    /**
     * Delete offer with id
     * Delete offer
     */
    offerDeleteRaw(requestParameters: OfferDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;
    /**
     * Delete offer with id
     * Delete offer
     */
    offerDelete(requestParameters: OfferDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;
    /**
     * Retrieves offer by unique id
     * Get offer by id
     */
    offerGetRaw(requestParameters: OfferGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OfferGet>>;
    /**
     * Retrieves offer by unique id
     * Get offer by id
     */
    offerGet(requestParameters: OfferGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OfferGet>;
    /**
     * Retrieves offer by unique link
     * Get offer by link
     */
    offerGetByLinkRaw(requestParameters: OfferGetByLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OfferGet>>;
    /**
     * Retrieves offer by unique link
     * Get offer by link
     */
    offerGetByLink(requestParameters: OfferGetByLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OfferGet>;
    /**
     * Retrieves offers by pages applying filters (name or group id)
     * Get offers for user (paged)
     */
    offerListRaw(requestParameters: OfferListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OfferPagingResponse>>;
    /**
     * Retrieves offers by pages applying filters (name or group id)
     * Get offers for user (paged)
     */
    offerList(requestParameters?: OfferListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OfferPagingResponse>;
    /**
     * Patch offer by id (only the fields provided in the request will be changed)
     * Patch offer
     */
    offerPatchRaw(requestParameters: OfferPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;
    /**
     * Patch offer by id (only the fields provided in the request will be changed)
     * Patch offer
     */
    offerPatch(requestParameters: OfferPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;
    /**
     * Create new offer
     */
    offerPostRaw(requestParameters: OfferPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ResultGuid>>;
    /**
     * Create new offer
     */
    offerPost(requestParameters: OfferPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ResultGuid>;
    /**
     * Update offer by id (all fields will be changed)
     * Update offer
     */
    offerPutRaw(requestParameters: OfferPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;
    /**
     * Update offer by id (all fields will be changed)
     * Update offer
     */
    offerPut(requestParameters: OfferPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;
}

/**
 * Multicart offer
 * @export
 * @interface OfferBody
 */
export declare interface OfferBody {
    /**
     * Offer group id
     * @type {string}
     * @memberof OfferBody
     */
    groupId?: string | null;
    /**
     * Offer name
     * @type {string}
     * @memberof OfferBody
     */
    name?: string;
    /**
     * Offer is activated
     * @type {boolean}
     * @memberof OfferBody
     */
    isActive?: boolean;
    /**
     *
     * @type {Discount}
     * @memberof OfferBody
     */
    discount?: Discount;
    /**
     * Offer error notification flag
     * @type {boolean}
     * @memberof OfferBody
     */
    errorReported?: boolean | null;
    /**
     * Offer lifetime. Maybe empty
     * @type {string}
     * @memberof OfferBody
     */
    validUntil?: string | null;
    /**
     * Offer use custom url as https://www.multicartshop.com/custom-url
     * @type {boolean}
     * @memberof OfferBody
     */
    customLink?: boolean;
    /**
     * Offer custom url as https://www.multicartshop.com/custom-url
     * @type {string}
     * @memberof OfferBody
     */
    link?: string | null;
    /**
     * Offer relationships with influencers
     * @type {Array<OfferLinkData>}
     * @memberof OfferBody
     */
    shareLinks?: Array<OfferLinkData> | null;
    /**
     * Offer tags
     * @type {Array<string>}
     * @memberof OfferBody
     */
    tags?: Array<string> | null;
    /**
     * Offer brand commission fee
     * @type {number}
     * @memberof OfferBody
     */
    commissionFee?: number | null;
    /**
     * Use google analytics tracking for offer
     * @type {boolean}
     * @memberof OfferBody
     */
    useGoogleAnalytics?: boolean | null;
    /**
     * Google analitics tracking id
     * @type {string}
     * @memberof OfferBody
     */
    googleTrackingId?: string | null;
    /**
     * Offer using external link checkout flow
     * @type {boolean}
     * @memberof OfferBody
     */
    useExternalCheckout?: boolean | null;
}

export declare interface OfferDeleteRequest {
    id: string;
}

/**
 *
 * @export
 * @interface OfferGet
 */
export declare interface OfferGet {
    /**
     * Offer group id
     * @type {string}
     * @memberof OfferGet
     */
    groupId?: string | null;
    /**
     * Offer name
     * @type {string}
     * @memberof OfferGet
     */
    name?: string;
    /**
     * Offer is activated
     * @type {boolean}
     * @memberof OfferGet
     */
    isActive?: boolean;
    /**
     *
     * @type {Discount}
     * @memberof OfferGet
     */
    discount?: Discount;
    /**
     * Offer error notification flag
     * @type {boolean}
     * @memberof OfferGet
     */
    errorReported?: boolean | null;
    /**
     * Offer lifetime. Maybe empty
     * @type {string}
     * @memberof OfferGet
     */
    validUntil?: string | null;
    /**
     * Offer use custom url as https://www.multicartshop.com/custom-url
     * @type {boolean}
     * @memberof OfferGet
     */
    customLink?: boolean;
    /**
     * Offer custom url as https://www.multicartshop.com/custom-url
     * @type {string}
     * @memberof OfferGet
     */
    link?: string | null;
    /**
     * Offer relationships with influencers
     * @type {Array<OfferLinkData>}
     * @memberof OfferGet
     */
    shareLinks?: Array<OfferLinkData> | null;
    /**
     * Offer tags
     * @type {Array<string>}
     * @memberof OfferGet
     */
    tags?: Array<string> | null;
    /**
     * Offer brand commission fee
     * @type {number}
     * @memberof OfferGet
     */
    commissionFee?: number | null;
    /**
     * Use google analytics tracking for offer
     * @type {boolean}
     * @memberof OfferGet
     */
    useGoogleAnalytics?: boolean | null;
    /**
     * Google analitics tracking id
     * @type {string}
     * @memberof OfferGet
     */
    googleTrackingId?: string | null;
    /**
     * Offer using external link checkout flow
     * @type {boolean}
     * @memberof OfferGet
     */
    useExternalCheckout?: boolean | null;
    /**
     * Id of offer
     * @type {string}
     * @memberof OfferGet
     */
    id?: string;
    /**
     * Offer group name
     * @type {string}
     * @memberof OfferGet
     */
    groupName?: string | null;
    /**
     * Offer cart items
     * @type {Array<CartItemGet>}
     * @memberof OfferGet
     */
    cartItems?: Array<CartItemGet> | null;
}

/**
 * Multicart offer
 * @export
 * @interface OfferGetAllOf
 */
export declare interface OfferGetAllOf {
    /**
     * Id of offer
     * @type {string}
     * @memberof OfferGetAllOf
     */
    id?: string;
    /**
     * Offer group name
     * @type {string}
     * @memberof OfferGetAllOf
     */
    groupName?: string | null;
    /**
     * Offer cart items
     * @type {Array<CartItemGet>}
     * @memberof OfferGetAllOf
     */
    cartItems?: Array<CartItemGet> | null;
}

export declare interface OfferGetByLinkRequest {
    link: string | null;
}

export declare interface OfferGetRequest {
    id: string;
}

/**
 * Offer relationship
 * @export
 * @interface OfferLinkData
 */
export declare interface OfferLinkData {
    /**
     *
     * @type {string}
     * @memberof OfferLinkData
     */
    link?: string;
    /**
     * Influencer id
     * @type {string}
     * @memberof OfferLinkData
     */
    influencer?: string;
}

export declare interface OfferListRequest {
    name?: string | null;
    groupId?: string | null;
    userId?: string | null;
    pageSize?: number | null;
    dir?: EnPageDirection;
    pageToken?: string | null;
    includedProperties?: Array<string> | null;
}

/**
 *
 * @export
 * @interface OfferPagingResponse
 */
export declare interface OfferPagingResponse {
    /**
     * Paged data
     * @type {Array<OfferGet>}
     * @memberof OfferPagingResponse
     */
    data?: Array<OfferGet>;
    /**
     * Previous page relative url
     * @type {string}
     * @memberof OfferPagingResponse
     */
    prevPage?: string | null;
    /**
     * Next page url
     * @type {string}
     * @memberof OfferPagingResponse
     */
    nextPage?: string | null;
    /**
     * Page size
     * @type {number}
     * @memberof OfferPagingResponse
     */
    pageSize?: number;
    /**
     * Current next page token
     * @type {string}
     * @memberof OfferPagingResponse
     */
    nextPageToken?: string | null;
    /**
     * Previous page token
     * @type {string}
     * @memberof OfferPagingResponse
     */
    prevPageToken?: string | null;
}

/**
 *
 * @export
 * @interface OfferPatch
 */
export declare interface OfferPatch {
    /**
     * Offer group id
     * @type {string}
     * @memberof OfferPatch
     */
    groupId?: string | null;
    /**
     * Offer name
     * @type {string}
     * @memberof OfferPatch
     */
    name?: string | null;
    /**
     * Offer is activated
     * @type {boolean}
     * @memberof OfferPatch
     */
    isActive?: boolean | null;
    /**
     *
     * @type {Discount}
     * @memberof OfferPatch
     */
    discountCoupons?: Discount;
    /**
     * Offer error notification flag
     * @type {boolean}
     * @memberof OfferPatch
     */
    errorReported?: boolean | null;
    /**
     * Offer lifetime. Maybe empty
     * @type {string}
     * @memberof OfferPatch
     */
    validUntil?: string | null;
    /**
     * Offer use custom url as https://www.multicartshop.com/custom-url
     * @type {boolean}
     * @memberof OfferPatch
     */
    customLink?: boolean | null;
    /**
     * Offer custom url as https://www.multicartshop.com/custom-url
     * @type {string}
     * @memberof OfferPatch
     */
    link?: string | null;
    /**
     * Offer relationships with influencers
     * @type {Array<OfferLinkData>}
     * @memberof OfferPatch
     */
    shareLinks?: Array<OfferLinkData> | null;
    /**
     * Offer tags
     * @type {Array<string>}
     * @memberof OfferPatch
     */
    tags?: Array<string> | null;
    /**
     * Offer brand commission fee
     * @type {number}
     * @memberof OfferPatch
     */
    commissionFee?: number | null;
    /**
     * Use google analytics tracking for offer
     * @type {boolean}
     * @memberof OfferPatch
     */
    useGoogleAnalytics?: boolean | null;
    /**
     * Google analitics tracking id
     * @type {string}
     * @memberof OfferPatch
     */
    googleTrackingId?: string | null;
    /**
     * Offer using external link checkout flow
     * @type {boolean}
     * @memberof OfferPatch
     */
    useExternalCheckout?: boolean | null;
    /**
     * Offer cart items
     * @type {Array<CartItemPost>}
     * @memberof OfferPatch
     */
    cartItems?: Array<CartItemPost> | null;
}

/**
 * Multicart offer
 * @export
 * @interface OfferPatchAllOf
 */
export declare interface OfferPatchAllOf {
    /**
     * Offer group id
     * @type {string}
     * @memberof OfferPatchAllOf
     */
    groupId?: string | null;
    /**
     * Offer name
     * @type {string}
     * @memberof OfferPatchAllOf
     */
    name?: string | null;
    /**
     * Offer is activated
     * @type {boolean}
     * @memberof OfferPatchAllOf
     */
    isActive?: boolean | null;
    /**
     *
     * @type {Discount}
     * @memberof OfferPatchAllOf
     */
    discountCoupons?: Discount;
    /**
     * Offer error notification flag
     * @type {boolean}
     * @memberof OfferPatchAllOf
     */
    errorReported?: boolean | null;
    /**
     * Offer lifetime. Maybe empty
     * @type {string}
     * @memberof OfferPatchAllOf
     */
    validUntil?: string | null;
    /**
     * Offer use custom url as https://www.multicartshop.com/custom-url
     * @type {boolean}
     * @memberof OfferPatchAllOf
     */
    customLink?: boolean | null;
    /**
     * Offer custom url as https://www.multicartshop.com/custom-url
     * @type {string}
     * @memberof OfferPatchAllOf
     */
    link?: string | null;
    /**
     * Offer relationships with influencers
     * @type {Array<OfferLinkData>}
     * @memberof OfferPatchAllOf
     */
    shareLinks?: Array<OfferLinkData> | null;
    /**
     * Offer tags
     * @type {Array<string>}
     * @memberof OfferPatchAllOf
     */
    tags?: Array<string> | null;
    /**
     * Offer brand commission fee
     * @type {number}
     * @memberof OfferPatchAllOf
     */
    commissionFee?: number | null;
    /**
     * Use google analytics tracking for offer
     * @type {boolean}
     * @memberof OfferPatchAllOf
     */
    useGoogleAnalytics?: boolean | null;
    /**
     * Google analitics tracking id
     * @type {string}
     * @memberof OfferPatchAllOf
     */
    googleTrackingId?: string | null;
    /**
     * Offer using external link checkout flow
     * @type {boolean}
     * @memberof OfferPatchAllOf
     */
    useExternalCheckout?: boolean | null;
    /**
     * Offer cart items
     * @type {Array<CartItemPost>}
     * @memberof OfferPatchAllOf
     */
    cartItems?: Array<CartItemPost> | null;
}

export declare interface OfferPatchRequest {
    id: string;
    offerPatch: OfferPatch;
}

/**
 *
 * @export
 * @interface OfferPost
 */
export declare interface OfferPost {
    /**
     * Offer group id
     * @type {string}
     * @memberof OfferPost
     */
    groupId?: string | null;
    /**
     * Offer name
     * @type {string}
     * @memberof OfferPost
     */
    name?: string;
    /**
     * Offer is activated
     * @type {boolean}
     * @memberof OfferPost
     */
    isActive?: boolean;
    /**
     *
     * @type {Discount}
     * @memberof OfferPost
     */
    discount?: Discount;
    /**
     * Offer error notification flag
     * @type {boolean}
     * @memberof OfferPost
     */
    errorReported?: boolean | null;
    /**
     * Offer lifetime. Maybe empty
     * @type {string}
     * @memberof OfferPost
     */
    validUntil?: string | null;
    /**
     * Offer use custom url as https://www.multicartshop.com/custom-url
     * @type {boolean}
     * @memberof OfferPost
     */
    customLink?: boolean;
    /**
     * Offer custom url as https://www.multicartshop.com/custom-url
     * @type {string}
     * @memberof OfferPost
     */
    link?: string | null;
    /**
     * Offer relationships with influencers
     * @type {Array<OfferLinkData>}
     * @memberof OfferPost
     */
    shareLinks?: Array<OfferLinkData> | null;
    /**
     * Offer tags
     * @type {Array<string>}
     * @memberof OfferPost
     */
    tags?: Array<string> | null;
    /**
     * Offer brand commission fee
     * @type {number}
     * @memberof OfferPost
     */
    commissionFee?: number | null;
    /**
     * Use google analytics tracking for offer
     * @type {boolean}
     * @memberof OfferPost
     */
    useGoogleAnalytics?: boolean | null;
    /**
     * Google analitics tracking id
     * @type {string}
     * @memberof OfferPost
     */
    googleTrackingId?: string | null;
    /**
     * Offer using external link checkout flow
     * @type {boolean}
     * @memberof OfferPost
     */
    useExternalCheckout?: boolean | null;
    /**
     * Offer cart items
     * @type {Array<CartItemPost>}
     * @memberof OfferPost
     */
    cartItems?: Array<CartItemPost> | null;
}

/**
 * Multicart offer
 * @export
 * @interface OfferPostAllOf
 */
export declare interface OfferPostAllOf {
    /**
     * Offer cart items
     * @type {Array<CartItemPost>}
     * @memberof OfferPostAllOf
     */
    cartItems?: Array<CartItemPost> | null;
}

export declare interface OfferPostRequest {
    offerPost: OfferPost;
}

export declare interface OfferPutRequest {
    id: string;
    offerPost: OfferPost;
}

/**
 * Paged data response
 * @export
 * @interface PagingResponseOfCartItemGet
 */
export declare interface PagingResponseOfCartItemGet {
    /**
     * Paged data
     * @type {Array<CartItemGet>}
     * @memberof PagingResponseOfCartItemGet
     */
    data?: Array<CartItemGet>;
    /**
     * Previous page relative url
     * @type {string}
     * @memberof PagingResponseOfCartItemGet
     */
    prevPage?: string | null;
    /**
     * Next page url
     * @type {string}
     * @memberof PagingResponseOfCartItemGet
     */
    nextPage?: string | null;
    /**
     * Page size
     * @type {number}
     * @memberof PagingResponseOfCartItemGet
     */
    pageSize?: number;
    /**
     * Current next page token
     * @type {string}
     * @memberof PagingResponseOfCartItemGet
     */
    nextPageToken?: string | null;
    /**
     * Previous page token
     * @type {string}
     * @memberof PagingResponseOfCartItemGet
     */
    prevPageToken?: string | null;
}

/**
 * Paged data response
 * @export
 * @interface PagingResponseOfOfferGet
 */
export declare interface PagingResponseOfOfferGet {
    /**
     * Paged data
     * @type {Array<OfferGet>}
     * @memberof PagingResponseOfOfferGet
     */
    data?: Array<OfferGet>;
    /**
     * Previous page relative url
     * @type {string}
     * @memberof PagingResponseOfOfferGet
     */
    prevPage?: string | null;
    /**
     * Next page url
     * @type {string}
     * @memberof PagingResponseOfOfferGet
     */
    nextPage?: string | null;
    /**
     * Page size
     * @type {number}
     * @memberof PagingResponseOfOfferGet
     */
    pageSize?: number;
    /**
     * Current next page token
     * @type {string}
     * @memberof PagingResponseOfOfferGet
     */
    nextPageToken?: string | null;
    /**
     * Previous page token
     * @type {string}
     * @memberof PagingResponseOfOfferGet
     */
    prevPageToken?: string | null;
}

/**
 *
 * @export
 * @interface PerimetrXOptions
 */
export declare interface PerimetrXOptions {
    /**
     *
     * @type {string}
     * @memberof PerimetrXOptions
     */
    redirectUrl?: string | null;
    /**
     *
     * @type {string}
     * @memberof PerimetrXOptions
     */
    appId?: string | null;
    /**
     *
     * @type {string}
     * @memberof PerimetrXOptions
     */
    jsClientSrc?: string | null;
    /**
     *
     * @type {boolean}
     * @memberof PerimetrXOptions
     */
    firstPartyEnabled?: boolean;
    /**
     *
     * @type {string}
     * @memberof PerimetrXOptions
     */
    vid?: string | null;
    /**
     *
     * @type {string}
     * @memberof PerimetrXOptions
     */
    uuid?: string | null;
    /**
     *
     * @type {string}
     * @memberof PerimetrXOptions
     */
    hostUrl?: string | null;
    /**
     *
     * @type {string}
     * @memberof PerimetrXOptions
     */
    blockScript?: string | null;
    /**
     *
     * @type {string}
     * @memberof PerimetrXOptions
     */
    host?: string | null;
}

/**
 * Shopping platform service state
 * @export
 * @interface PlatformState
 */
export declare interface PlatformState {
    /**
     *
     * @type {EnPlatformType}
     * @memberof PlatformState
     */
    platformType?: EnPlatformType;
    /**
     * Platform state between sessions
     * @type {string}
     * @memberof PlatformState
     */
    state?: string | null;
    /**
     * Request from shopping platform service (for example, if it needs some action from the user)
     * @type {string}
     * @memberof PlatformState
     */
    serverRequest?: string | null;
    /**
     * Response to shopping platform service (if ???? needs a response from the user)
     * @type {string}
     * @memberof PlatformState
     */
    clientResponse?: string | null;
    /**
     * Current step of a platform service process
     * @type {string}
     * @memberof PlatformState
     */
    step?: string | null;
    /**
     * Type of current platform state
     * @type {string}
     * @memberof PlatformState
     */
    type?: string | null;
    /**
     * Captcha challenge
     * @type {boolean}
     * @memberof PlatformState
     */
    isCaptchaChallenge?: boolean;
    /**
     *
     * @type {CaptchaChallengeOptions}
     * @memberof PlatformState
     */
    captchaChallengeOptions?: CaptchaChallengeOptions;
}

/**
 * Price data
 * @export
 * @interface PriceData
 */
export declare interface PriceData {
    /**
     * Currency unit as "USD" for United States dollar
     * @type {string}
     * @memberof PriceData
     */
    unit?: string;
    /**
     * Currency symbol as "$"
     * @type {string}
     * @memberof PriceData
     */
    symbol?: string;
    /**
     * Current product price. Maybe sale value or equal regular value
     * @type {number}
     * @memberof PriceData
     */
    currentValue?: number;
    /**
     * Regular product price.
     * @type {number}
     * @memberof PriceData
     */
    regularValue?: number;
    /**
     * Date until which the sale is valid
     * @type {string}
     * @memberof PriceData
     */
    salePriceEffectiveDate?: string | null;
}

/**
 *
 */
export declare class PurchaseApi extends runtime.BaseAPI {
    /**
     * Retrieves purchase by unique id
     * Get purchase by id
     */
    purchaseGetRaw(requestParameters: PurchaseGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PurchaseGet>>;
    /**
     * Retrieves purchase by unique id
     * Get purchase by id
     */
    purchaseGet(requestParameters: PurchaseGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PurchaseGet>;
    /**
     * Create purchase from shopping cart
     * Create purchase
     */
    purchasePostRaw(requestParameters: PurchasePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ShoppingCart>>;
    /**
     * Create purchase from shopping cart
     * Create purchase
     */
    purchasePost(requestParameters: PurchasePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ShoppingCart>;
    /**
     * Create shopping cart with cart items. At the same time, the cart items are synchronized with the platform
     * Create shopping cart
     */
    purchasePostCartRaw(requestParameters: PurchasePostCartRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ShoppingCart>>;
    /**
     * Create shopping cart with cart items. At the same time, the cart items are synchronized with the platform
     * Create shopping cart
     */
    purchasePostCart(requestParameters: PurchasePostCartRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ShoppingCart>;
}

/**
 * Purchase
 * @export
 * @interface PurchaseBody
 */
export declare interface PurchaseBody {
    /**
     * Purchase unique identifier
     * @type {string}
     * @memberof PurchaseBody
     */
    id?: string;
    /**
     * Offer unique identifier
     * @type {string}
     * @memberof PurchaseBody
     */
    offerId?: string | null;
    /**
     *
     * @type {Discount}
     * @memberof PurchaseBody
     */
    discount?: Discount;
    /**
     * Offer link if exists
     * @type {string}
     * @memberof PurchaseBody
     */
    offerLink?: string | null;
}

/**
 * Purchase cart item
 * @export
 * @interface PurchaseCartItemGet
 */
export declare interface PurchaseCartItemGet {
    /**
     * Purchase cart item unique identifier
     * @type {string}
     * @memberof PurchaseCartItemGet
     */
    id?: string;
    /**
     * Purchase id
     * @type {string}
     * @memberof PurchaseCartItemGet
     */
    purchaseId?: string;
    /**
     * Source cart item unique identifier
     * @type {string}
     * @memberof PurchaseCartItemGet
     */
    cartItemId?: string;
    /**
     * Cart item count
     * @type {number}
     * @memberof PurchaseCartItemGet
     */
    count?: number;
    /**
     *
     * @type {EnPlatformType}
     * @memberof PurchaseCartItemGet
     */
    platform?: EnPlatformType;
    /**
     * Seller host on target e-commerce platform
     * @type {string}
     * @memberof PurchaseCartItemGet
     */
    seller?: string;
    /**
     * Unique item id on target e-commerce platform
     * @type {string}
     * @memberof PurchaseCartItemGet
     */
    usItemId?: string;
    /**
     * Product id on target e-commerce platform
     * @type {string}
     * @memberof PurchaseCartItemGet
     */
    productId?: string;
    /**
     * Product name
     * @type {string}
     * @memberof PurchaseCartItemGet
     */
    name?: string;
    /**
     * Product description
     * @type {string}
     * @memberof PurchaseCartItemGet
     */
    description?: string | null;
    /**
     * Url of product page on target e-commerce platform
     * @type {string}
     * @memberof PurchaseCartItemGet
     */
    url?: string;
    /**
     * Urls of product images
     * @type {Array<string>}
     * @memberof PurchaseCartItemGet
     */
    imagesUrls?: Array<string>;
    /**
     * Small image url to display on product thumb
     * @type {string}
     * @memberof PurchaseCartItemGet
     */
    smallImageUrl?: string | null;
    /**
     * "Selected variants for target product"
     * @type {Array<Variant>}
     * @memberof PurchaseCartItemGet
     */
    variants?: Array<Variant> | null;
    /**
     * "Available variants for target product grouped by categories"
     * @type {Array<VariantCategory>}
     * @memberof PurchaseCartItemGet
     */
    variantCategories?: Array<VariantCategory> | null;
    /**
     *
     * @type {PriceData}
     * @memberof PurchaseCartItemGet
     */
    priceData?: PriceData;
}

/**
 *
 * @export
 * @interface PurchaseGet
 */
export declare interface PurchaseGet {
    /**
     * Purchase unique identifier
     * @type {string}
     * @memberof PurchaseGet
     */
    id?: string;
    /**
     * Offer unique identifier
     * @type {string}
     * @memberof PurchaseGet
     */
    offerId?: string | null;
    /**
     *
     * @type {Discount}
     * @memberof PurchaseGet
     */
    discount?: Discount;
    /**
     * Offer link if exists
     * @type {string}
     * @memberof PurchaseGet
     */
    offerLink?: string | null;
    /**
     * Purchase cart items
     * @type {Array<PurchaseCartItemGet>}
     * @memberof PurchaseGet
     */
    cartItems?: Array<PurchaseCartItemGet> | null;
}

/**
 * Purchase
 * @export
 * @interface PurchaseGetAllOf
 */
export declare interface PurchaseGetAllOf {
    /**
     * Purchase cart items
     * @type {Array<PurchaseCartItemGet>}
     * @memberof PurchaseGetAllOf
     */
    cartItems?: Array<PurchaseCartItemGet> | null;
}

export declare interface PurchaseGetRequest {
    id: string;
}

/**
 * Purchase
 * @export
 * @interface PurchasePost
 */
export declare interface PurchasePost {
    /**
     *
     * @type {ShoppingCart}
     * @memberof PurchasePost
     */
    cart?: ShoppingCart;
}

export declare interface PurchasePostCartRequest {
    shoppingCartPost: ShoppingCartPost;
}

export declare interface PurchasePostRequest {
    purchasePost: PurchasePost;
}

export declare function querystring(params: HTTPQuery, prefix?: string): string;

export declare interface RequestContext {
    fetch: FetchAPI;
    url: string;
    init: RequestInit;
}

export declare interface RequestOpts {
    path: string;
    method: HTTPMethod;
    headers: HTTPHeaders;
    query?: HTTPQuery;
    body?: HTTPBody;
}

export declare class RequiredError extends Error {
    field: string;
    name: 'RequiredError';
    constructor(field: string, msg?: string);
}

export declare interface ResponseContext {
    fetch: FetchAPI;
    url: string;
    init: RequestInit;
    response: Response;
}

export declare class ResponseError extends Error {
    response: Response;
    name: 'ResponseError';
    constructor(response: Response, msg?: string);
}

export declare interface ResponseTransformer<T> {
    (json: any): T;
}

/**
 * Result with guid id
 * @export
 * @interface ResultGuid
 */
export declare interface ResultGuid {
    /**
     * ID
     * @type {string}
     * @memberof ResultGuid
     */
    id?: string;
}

declare namespace runtime {
    export {
        querystring,
        canConsumeForm,
        BASE_PATH,
        ConfigurationParameters,
        Configuration,
        DefaultConfig,
        BaseAPI,
        ResponseError,
        FetchError,
        RequiredError,
        COLLECTION_FORMATS,
        FetchAPI,
        Json,
        HTTPMethod,
        HTTPHeaders,
        HTTPQuery,
        HTTPBody,
        HTTPRequestInit,
        ModelPropertyNaming,
        InitOverrideFunction,
        FetchParams,
        RequestOpts,
        Consume,
        RequestContext,
        ResponseContext,
        ErrorContext,
        Middleware,
        ApiResponse,
        ResponseTransformer,
        JSONApiResponse,
        VoidApiResponse,
        BlobApiResponse,
        TextApiResponse
    }
}

/**
 * Shopping cart
 * @export
 * @interface ShoppingCart
 */
export declare interface ShoppingCart {
    /**
     * Cart items
     * @type {Array<ShoppingCartItem>}
     * @memberof ShoppingCart
     */
    cartItems?: Array<ShoppingCartItem>;
    /**
     * Offer id
     * @type {string}
     * @memberof ShoppingCart
     */
    offerId?: string | null;
    /**
     * Offer link
     * @type {string}
     * @memberof ShoppingCart
     */
    offerLink?: string | null;
    /**
     *
     * @type {Discount}
     * @memberof ShoppingCart
     */
    discount?: Discount;
}

/**
 * Shopping cart error data
 * @export
 * @interface ShoppingCartErrorData
 */
export declare interface ShoppingCartErrorData {
    /**
     *
     * @type {ShoppingCart}
     * @memberof ShoppingCartErrorData
     */
    cart?: ShoppingCart;
    /**
     * Problems list
     * @type {Array<ShoppingCartProblem>}
     * @memberof ShoppingCartErrorData
     */
    problems?: Array<ShoppingCartProblem> | null;
}

/**
 *
 * @export
 * @interface ShoppingCartItem
 */
export declare interface ShoppingCartItem {
    /**
     * Unique item id on target e-commerce platform
     * @type {string}
     * @memberof ShoppingCartItem
     */
    usItemId?: string;
    /**
     * Seller host on target e-commerce platform
     * @type {string}
     * @memberof ShoppingCartItem
     */
    seller?: string;
    /**
     * Product id on target e-commerce platform
     * @type {string}
     * @memberof ShoppingCartItem
     */
    productId?: string;
    /**
     * Product name
     * @type {string}
     * @memberof ShoppingCartItem
     */
    name?: string;
    /**
     * Product description
     * @type {string}
     * @memberof ShoppingCartItem
     */
    description?: string | null;
    /**
     * Url of product page on target e-commerce platform
     * @type {string}
     * @memberof ShoppingCartItem
     */
    url?: string;
    /**
     * Urls of product images
     * @type {Array<string>}
     * @memberof ShoppingCartItem
     */
    imagesUrls?: Array<string>;
    /**
     * Small image url to display on product thumb
     * @type {string}
     * @memberof ShoppingCartItem
     */
    smallImageUrl?: string | null;
    /**
     * "Selected variants for target product"
     * @type {Array<Variant>}
     * @memberof ShoppingCartItem
     */
    variants?: Array<Variant> | null;
    /**
     * "Available variants for target product grouped by categories"
     * @type {Array<VariantCategory>}
     * @memberof ShoppingCartItem
     */
    variantCategories?: Array<VariantCategory> | null;
    /**
     *
     * @type {PriceData}
     * @memberof ShoppingCartItem
     */
    priceData?: PriceData;
    /**
     * "Product availability"
     * @type {boolean}
     * @memberof ShoppingCartItem
     */
    available?: boolean;
    /**
     *
     * @type {EnPlatformType}
     * @memberof ShoppingCartItem
     */
    platform?: EnPlatformType;
    /**
     * Serialized specific platform product data usually in JSON format
     * @type {string}
     * @memberof ShoppingCartItem
     */
    platformData?: string | null;
    /**
     * Categories in which the product belongs
     * @type {Array<string>}
     * @memberof ShoppingCartItem
     */
    productCategories?: Array<string> | null;
    /**
     * International marking code. UPC, GTIN-12, GTIN-13, GTIN-14 or ISBN
     * @type {string}
     * @memberof ShoppingCartItem
     */
    gtin?: string | null;
    /**
     * Product manufacturer code
     * @type {string}
     * @memberof ShoppingCartItem
     */
    mpn?: string | null;
    /**
     * Product brand
     * @type {string}
     * @memberof ShoppingCartItem
     */
    brand?: string | null;
    /**
     * Unique id
     * @type {string}
     * @memberof ShoppingCartItem
     */
    id?: string;
    /**
     * Unique e-commerce platform guid
     * @type {string}
     * @memberof ShoppingCartItem
     */
    platformId?: string;
    /**
     * Order limit for cart item count
     * @type {number}
     * @memberof ShoppingCartItem
     */
    orderLimit?: number | null;
    /**
     * Order limit for cart item count minimum
     * @type {number}
     * @memberof ShoppingCartItem
     */
    orderMinLimit?: number | null;
    /**
     * Cart item shippable
     * @type {boolean}
     * @memberof ShoppingCartItem
     */
    shippable?: boolean;
    /**
     *
     * @type {PlatformState}
     * @memberof ShoppingCartItem
     */
    platformState?: PlatformState;
    /**
     *
     * @type {number}
     * @memberof ShoppingCartItem
     */
    count?: number;
    /**
     *
     * @type {string}
     * @memberof ShoppingCartItem
     */
    warning?: string | null;
}

/**
 * Shopping cart item
 * @export
 * @interface ShoppingCartItemAllOf
 */
export declare interface ShoppingCartItemAllOf {
    /**
     *
     * @type {number}
     * @memberof ShoppingCartItemAllOf
     */
    count?: number;
    /**
     *
     * @type {string}
     * @memberof ShoppingCartItemAllOf
     */
    warning?: string | null;
}

/**
 * Shopping cart item
 * @export
 * @interface ShoppingCartItemPost
 */
export declare interface ShoppingCartItemPost {
    /**
     * Cart item id
     * @type {string}
     * @memberof ShoppingCartItemPost
     */
    cartItemId?: string;
    /**
     * Product variants if exists
     * @type {Array<CartItemVariantSelect>}
     * @memberof ShoppingCartItemPost
     */
    variants?: Array<CartItemVariantSelect> | null;
    /**
     * Count of product
     * @type {number}
     * @memberof ShoppingCartItemPost
     */
    count?: number;
    /**
     *
     * @type {PlatformState}
     * @memberof ShoppingCartItemPost
     */
    platformState?: PlatformState;
}

/**
 * Shopping cart
 * @export
 * @interface ShoppingCartPost
 */
export declare interface ShoppingCartPost {
    /**
     * Shopping cart items
     * @type {Array<ShoppingCartItemPost>}
     * @memberof ShoppingCartPost
     */
    cartItems?: Array<ShoppingCartItemPost> | null;
    /**
     * Offer link
     * @type {string}
     * @memberof ShoppingCartPost
     */
    offerLink?: string | null;
    /**
     *
     * @type {Discount}
     * @memberof ShoppingCartPost
     */
    discountCoupons?: Discount;
}

/**
 * Shopping cart problem
 * @export
 * @interface ShoppingCartProblem
 */
export declare interface ShoppingCartProblem {
    /**
     *
     * @type {ShoppingCartItemPost}
     * @memberof ShoppingCartProblem
     */
    cartItem?: ShoppingCartItemPost;
    /**
     *
     * @type {ShoppingCartItem}
     * @memberof ShoppingCartProblem
     */
    result?: ShoppingCartItem;
    /**
     * Problem text
     * @type {string}
     * @memberof ShoppingCartProblem
     */
    problem?: string;
    /**
     * Problem code
     * @type {number}
     * @memberof ShoppingCartProblem
     */
    code?: number | null;
}

export declare class TextApiResponse {
    raw: Response;
    constructor(raw: Response);
    value(): Promise<string>;
}

/**
 * Product variant
 * @export
 * @interface Variant
 */
export declare interface Variant {
    /**
     * Unique variant Id
     * @type {string}
     * @memberof Variant
     */
    variantId?: string;
    /**
     * Display variant name
     * @type {string}
     * @memberof Variant
     */
    variantName?: string;
    /**
     * ID of the category to which the option belongs
     * @type {string}
     * @memberof Variant
     */
    categoryId?: string;
    /**
     * Name of the category to which the option belongs
     * @type {string}
     * @memberof Variant
     */
    categoryName?: string;
    /**
     * Flag is selected variant is out of stock
     * @type {boolean}
     * @memberof Variant
     */
    outOfStock?: boolean;
    /**
     * Swatch url of variant
     * @type {string}
     * @memberof Variant
     */
    swatch?: string | null;
    /**
     * Color of variant
     * @type {string}
     * @memberof Variant
     */
    color?: string | null;
    /**
     * Customized text for variant
     * @type {string}
     * @memberof Variant
     */
    customInput?: string | null;
}

/**
 * Category with variants for cart item
 * @export
 * @interface VariantCategory
 */
export declare interface VariantCategory {
    /**
     * Unique category Id
     * @type {string}
     * @memberof VariantCategory
     */
    id?: string;
    /**
     * Display name of variants category
     * @type {string}
     * @memberof VariantCategory
     */
    name?: string;
    /**
     * Array of category variants
     * @type {Array<Variant>}
     * @memberof VariantCategory
     */
    variants?: Array<Variant>;
    /**
     *
     * @type {VariantCategoryOptions}
     * @memberof VariantCategory
     */
    options?: VariantCategoryOptions;
    /**
     * Input value is optional
     * @type {boolean}
     * @memberof VariantCategory
     */
    optional?: boolean;
}

/**
 * Category display type
 * @export
 */
export declare const VariantCategoryDisplayType: {
    readonly Default: "Default";
    readonly Dropdown: "Dropdown";
    readonly Radio: "Radio";
    readonly CustomInput: "CustomInput";
};

export declare type VariantCategoryDisplayType = typeof VariantCategoryDisplayType[keyof typeof VariantCategoryDisplayType];

/**
 * Variant category options
 * @export
 * @interface VariantCategoryOptions
 */
export declare interface VariantCategoryOptions {
    /**
     *
     * @type {VariantCategoryDisplayType}
     * @memberof VariantCategoryOptions
     */
    categoryDisplayType?: VariantCategoryDisplayType;
    /**
     *
     * @type {VariantDisplayType}
     * @memberof VariantCategoryOptions
     */
    variantDisplayType?: VariantDisplayType;
    /**
     * Category description for tooltip
     * @type {string}
     * @memberof VariantCategoryOptions
     */
    description?: string | null;
}

/**
 * Variant display type
 * @export
 */
export declare const VariantDisplayType: {
    readonly Default: "Default";
    readonly Name: "Name";
    readonly Swatch: "Swatch";
    readonly Color: "Color";
};

export declare type VariantDisplayType = typeof VariantDisplayType[keyof typeof VariantDisplayType];

export declare class VoidApiResponse {
    raw: Response;
    constructor(raw: Response);
    value(): Promise<void>;
}


export * from "@cyberline-engineering/cle-oidc-client";

export { }
