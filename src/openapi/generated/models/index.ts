/* tslint:disable */
/* eslint-disable */
/**
 * Api error
 * @export
 * @interface ApiError
 */
export interface ApiError {
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
export interface ApiErrorOfCreateOfferConflictErrorData {
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
export interface ApiErrorOfCreateOfferConflictErrorDataAllOf {
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
export interface ApiErrorOfCreateOfferLimitReachedErrorData {
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
export interface ApiErrorOfCreateOfferLimitReachedErrorDataAllOf {
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
export interface ApiErrorOfShoppingCartErrorData {
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
export interface ApiErrorOfShoppingCartErrorDataAllOf {
    /**
     *
     * @type {ShoppingCartErrorData}
     * @memberof ApiErrorOfShoppingCartErrorDataAllOf
     */
    errorData?: ShoppingCartErrorData;
}
/**
 *
 * @export
 * @interface CaptchaChallengeOptions
 */
export interface CaptchaChallengeOptions {
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
export const CaptchaServiceType = {
    PerimetrX: 'PerimetrX',
    HCaptcha: 'HCaptcha',
} as const;
export type CaptchaServiceType =
    typeof CaptchaServiceType[keyof typeof CaptchaServiceType];

/**
 * Cart item
 * @export
 * @interface CartItemBody
 */
export interface CartItemBody {
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
export interface CartItemBodyAdmin {
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
export interface CartItemBodyAdminAllOf {
    /**
     * Multicart owner user id
     * @type {string}
     * @memberof CartItemBodyAdminAllOf
     */
    userId?: string;
}
/**
 *
 * @export
 * @interface CartItemGet
 */
export interface CartItemGet {
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
export interface CartItemGetAdmin {
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
export interface CartItemGetAdminAllOf {
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
export interface CartItemGetAllOf {
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
/**
 *
 * @export
 * @interface CartItemPagingResponse
 */
export interface CartItemPagingResponse {
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
export interface CartItemPatch {
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
export interface CartItemPatchAllOf {
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
/**
 * Cart item
 * @export
 * @interface CartItemPost
 */
export interface CartItemPost {
    /**
     * Unique id
     * @type {string}
     * @memberof CartItemPost
     */
    id?: string;
}
/**
 *
 * @export
 * @interface CartItemSync
 */
export interface CartItemSync {
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
export interface CartItemSyncAllOf {
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
export interface CartItemVariantSelect {
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
/**
 * Create offer error data for conflict
 * @export
 * @interface CreateOfferConflictErrorData
 */
export interface CreateOfferConflictErrorData {
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
export interface CreateOfferLimitReachedErrorData {
    /**
     * User limit reached
     * @type {boolean}
     * @memberof CreateOfferLimitReachedErrorData
     */
    limitReached?: boolean | null;
}
/**
 * Discount coupons info
 * @export
 * @interface Discount
 */
export interface Discount {
    /**
     * Dictionary by Platform guid key, then Dictionary by Seller key
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof Discount
     */
    coupons?: { [key: string]: { [key: string]: string } };
}

/**
 * Sorting page direction
 * @export
 */
export const EnPageDirection = {
    Desc: 'Desc',
    Asc: 'Asc',
} as const;
export type EnPageDirection =
    typeof EnPageDirection[keyof typeof EnPageDirection];

/**
 *
 * @export
 */
export const EnPlatformType = {
    Walmart: 'Walmart',
    Shopify: 'Shopify',
    Target: 'Target',
    Farfetch: 'Farfetch',
    Adidas: 'Adidas',
    Michaels: 'Michaels',
    Fanatics: 'Fanatics',
    Pandora: 'Pandora',
    Carters: 'Carters',
    Justice: 'Justice',
    Nordstrom: 'Nordstrom',
    Macys: 'Macys',
    Ulta: 'Ulta',
    Sephora: 'Sephora',
    Kohls: 'Kohls',
    Bestbuy: 'Bestbuy',
    NetAPorter: 'NetAPorter',
    BedBathAndBeyond: 'BedBathAndBeyond',
    Gap: 'Gap',
    HomeDepot: 'HomeDepot',
    Lowes: 'Lowes',
    GapFactory: 'GapFactory',
    Patagonia: 'Patagonia',
    DicksSportingGoods: 'DicksSportingGoods',
    PetSmart: 'PetSmart',
    ShopDisney: 'ShopDisney',
    Elfcosmetics: 'Elfcosmetics',
    Shift4Shop: 'Shift4Shop',
    DallasCowboys: 'DallasCowboys',
    AtHome: 'AtHome',
    VictoriasSecret: 'VictoriasSecret',
    Nike: 'Nike',
    Amazon: 'Amazon',
    AthomeMedline: 'AthomeMedline',
    CombatCorner: 'CombatCorner',
    Explorecuisine: 'Explorecuisine',
    Huel: 'Huel',
    BestbuyCanada: 'BestbuyCanada',
    BigCommerce: 'BigCommerce',
    DallasGolf: 'DallasGolf',
    GrandvinWineMerchants: 'GrandvinWineMerchants',
    Yamaha: 'Yamaha',
    BlissWorld: 'BlissWorld',
    Fromuthpickleball: 'Fromuthpickleball',
    TrueValue: 'TrueValue',
    Qvc: 'Qvc',
    Coravin: 'Coravin',
    RoomsToGo: 'RoomsToGo',
    Nfm: 'Nfm',
    Gnc: 'Gnc',
    Honest: 'Honest',
    Abercrombie: 'Abercrombie',
    HamiltonBeach: 'HamiltonBeach',
    SharkClean: 'SharkClean',
    NinjaKitchen: 'NinjaKitchen',
    Ikea: 'Ikea',
    Clinique: 'Clinique',
    Levi: 'Levi',
    DripDrop: 'DripDrop',
    Complex: 'Complex',
    Gymshark: 'Gymshark',
    Bikini: 'Bikini',
    TomFord: 'TomFord',
    Solerebels: 'Solerebels',
    EsteeLauder: 'EsteeLauder',
    SeraLabsHealth: 'SeraLabsHealth',
    BigStar: 'BigStar',
    Kendrascott: 'Kendrascott',
    Philosophy: 'Philosophy',
    HugoBoss: 'HugoBoss',
    Jomalone: 'Jomalone',
    Hanes: 'Hanes',
    Champion: 'Champion',
    Bali: 'Bali',
    HudaBeauty: 'HudaBeauty',
    Highlights: 'Highlights',
    Lushusa: 'Lushusa',
    ClarinsUsa: 'ClarinsUsa',
    Sonomacutrer: 'Sonomacutrer',
    Lancome: 'Lancome',
    Chiccousa: 'Chiccousa',
    WorldMarket: 'WorldMarket',
    Michaelkors: 'Michaelkors',
    Bic: 'Bic',
    InstantBrands: 'InstantBrands',
    ReserveBar: 'ReserveBar',
    VibeBodyCare: 'VibeBodyCare',
    ShopTy: 'ShopTy',
    LesliesPool: 'LesliesPool',
    Lululemon: 'Lululemon',
    WestElm: 'WestElm',
    Lids: 'Lids',
    GardenOfLife: 'GardenOfLife',
    Taylormadegolf: 'Taylormadegolf',
    Flightscope: 'Flightscope',
    NewBalance: 'NewBalance',
    PotteryBarn: 'PotteryBarn',
    PotteryBarnKids: 'PotteryBarnKids',
    PotteryBarnTeen: 'PotteryBarnTeen',
    WilliamsSonoma: 'WilliamsSonoma',
    MarkAndGraham: 'MarkAndGraham',
    Underarmour: 'Underarmour',
    UvaBookStores: 'UvaBookStores',
    Bose: 'Bose',
    BattleSports: 'BattleSports',
    Jcpenney: 'Jcpenney',
    Etsy: 'Etsy',
    LacrosseUnlimited: 'LacrosseUnlimited',
    Staples: 'Staples',
    Academy: 'Academy',
    Champssports: 'Champssports',
    Usopenshop: 'Usopenshop',
    HalfPriceBooks: 'HalfPriceBooks',
    BathAndBodyWorks: 'BathAndBodyWorks',
    Ralphlauren: 'Ralphlauren',
    CampingWorld: 'CampingWorld',
    Sportsdirect: 'Sportsdirect',
    Anastasiabeverlyhills: 'Anastasiabeverlyhills',
    Chanel: 'Chanel',
    Yeti: 'Yeti',
    Crayola: 'Crayola',
    Vans: 'Vans',
    Lacoste: 'Lacoste',
    PoshMark: 'PoshMark',
    FloorAndDecor: 'FloorAndDecor',
    Overstock: 'Overstock',
    Bloomingdales: 'Bloomingdales',
    AmericanEagle: 'AmericanEagle',
    Tradesy: 'Tradesy',
    AceHardware: 'AceHardware',
    Fossil: 'Fossil',
    Guess: 'Guess',
    ChildrenIsPlace: 'ChildrenIsPlace',
    Cabelas: 'Cabelas',
    ChineseLaundry: 'ChineseLaundry',
    JanieAndJack: 'JanieAndJack',
    Backcountry: 'Backcountry',
    Forever21: 'Forever21',
    Tyler: 'Tyler',
    Saksfifthavenue: 'Saksfifthavenue',
    Venus: 'Venus',
    OnlineShoes: 'OnlineShoes',
    Lee: 'Lee',
    CampMan: 'CampMan',
    BlackDiamond: 'BlackDiamond',
    Fabulousfurs: 'Fabulousfurs',
    Fragrancenet: 'Fragrancenet',
    Belk: 'Belk',
    Sears: 'Sears',
    Reebok: 'Reebok',
    DrJays: 'DrJays',
    Burberry: 'Burberry',
    Timberland: 'Timberland',
    LlBean: 'LLBean',
    Kmart: 'Kmart',
    LittleBoyChic: 'LittleBoyChic',
    NaturesJewelry: 'NaturesJewelry',
    Converse: 'Converse',
    Zara: 'Zara',
    ShopifyApp: 'ShopifyApp',
    WooCommerceApp: 'WooCommerceApp',
    BigCommerceApp: 'BigCommerceApp',
    MagentoApp: 'MagentoApp',
    SquareSpaceApp: 'SquareSpaceApp',
    WixApp: 'WixApp',
    PrestaShopApp: 'PrestaShopApp',
    ShopwareApp: 'ShopwareApp',
    Unknown: 'Unknown',
} as const;
export type EnPlatformType = typeof EnPlatformType[keyof typeof EnPlatformType];

/**
 * Multicart offer
 * @export
 * @interface OfferBody
 */
export interface OfferBody {
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
/**
 *
 * @export
 * @interface OfferGet
 */
export interface OfferGet {
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
export interface OfferGetAllOf {
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
/**
 * Offer relationship
 * @export
 * @interface OfferLinkData
 */
export interface OfferLinkData {
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
/**
 *
 * @export
 * @interface OfferPagingResponse
 */
export interface OfferPagingResponse {
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
export interface OfferPatch {
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
export interface OfferPatchAllOf {
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
/**
 *
 * @export
 * @interface OfferPost
 */
export interface OfferPost {
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
export interface OfferPostAllOf {
    /**
     * Offer cart items
     * @type {Array<CartItemPost>}
     * @memberof OfferPostAllOf
     */
    cartItems?: Array<CartItemPost> | null;
}
/**
 * Paged data response
 * @export
 * @interface PagingResponseOfCartItemGet
 */
export interface PagingResponseOfCartItemGet {
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
export interface PagingResponseOfOfferGet {
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
export interface PerimetrXOptions {
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
export interface PlatformState {
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
     * Response to shopping platform service (if ше needs a response from the user)
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
export interface PriceData {
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
 * Purchase
 * @export
 * @interface PurchaseBody
 */
export interface PurchaseBody {
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
export interface PurchaseCartItemGet {
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
export interface PurchaseGet {
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
export interface PurchaseGetAllOf {
    /**
     * Purchase cart items
     * @type {Array<PurchaseCartItemGet>}
     * @memberof PurchaseGetAllOf
     */
    cartItems?: Array<PurchaseCartItemGet> | null;
}
/**
 * Purchase
 * @export
 * @interface PurchasePost
 */
export interface PurchasePost {
    /**
     *
     * @type {ShoppingCart}
     * @memberof PurchasePost
     */
    cart?: ShoppingCart;
}
/**
 * Result with guid id
 * @export
 * @interface ResultGuid
 */
export interface ResultGuid {
    /**
     * ID
     * @type {string}
     * @memberof ResultGuid
     */
    id?: string;
}
/**
 * Shopping cart
 * @export
 * @interface ShoppingCart
 */
export interface ShoppingCart {
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
export interface ShoppingCartErrorData {
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
export interface ShoppingCartItem {
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
export interface ShoppingCartItemAllOf {
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
export interface ShoppingCartItemPost {
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
export interface ShoppingCartPost {
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
export interface ShoppingCartProblem {
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
/**
 * Product variant
 * @export
 * @interface Variant
 */
export interface Variant {
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
export interface VariantCategory {
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
export const VariantCategoryDisplayType = {
    Default: 'Default',
    Dropdown: 'Dropdown',
    Radio: 'Radio',
    CustomInput: 'CustomInput',
} as const;
export type VariantCategoryDisplayType =
    typeof VariantCategoryDisplayType[keyof typeof VariantCategoryDisplayType];

/**
 * Variant category options
 * @export
 * @interface VariantCategoryOptions
 */
export interface VariantCategoryOptions {
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
export const VariantDisplayType = {
    Default: 'Default',
    Name: 'Name',
    Swatch: 'Swatch',
    Color: 'Color',
} as const;
export type VariantDisplayType =
    typeof VariantDisplayType[keyof typeof VariantDisplayType];
