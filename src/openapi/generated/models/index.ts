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
    description?: string;
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
    priceInfo?: PriceData;
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
    description?: string;
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
    priceInfo?: PriceData;
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
    description?: string;
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
    priceInfo?: PriceData;
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
    description?: string;
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
    priceInfo?: PriceData;
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
    priceInfo?: PriceData;
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
    priceInfo?: PriceData;
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
 *
 * @export
 * @interface DiscountCoupon
 */
export interface DiscountCoupon {
    /**
     *
     * @type {string}
     * @memberof DiscountCoupon
     */
    seller?: string | null;
    /**
     *
     * @type {string}
     * @memberof DiscountCoupon
     */
    coupon?: string | null;
}
/**
 * Discount coupons info
 * @export
 * @interface DiscountCoupons
 */
export interface DiscountCoupons {
    /**
     * Dictionary by Platform guid key, then Dictionary by Seller key
     * @type {{ [key: string]: { [key: string]: DiscountCoupon; }; }}
     * @memberof DiscountCoupons
     */
    coupons?: { [key: string]: { [key: string]: DiscountCoupon } };
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
    ShopifyApp: 'ShopifyApp',
    WooCommerceApp: 'WooCommerceApp',
    BigCommerceApp: 'BigCommerceApp',
    MagentoApp: 'MagentoApp',
    SquareSpaceApp: 'SquareSpaceApp',
    WixApp: 'WixApp',
    PrestaShopApp: 'PrestaShopApp',
    ShopwareApp: 'ShopwareApp',
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
     *
     * @type {OfferInfo}
     * @memberof OfferBody
     */
    offerInfo?: OfferInfo;
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
     *
     * @type {OfferInfo}
     * @memberof OfferGet
     */
    offerInfo?: OfferInfo;
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
 * Offer additional data
 * @export
 * @interface OfferInfo
 */
export interface OfferInfo {
    /**
     *
     * @type {DiscountCoupons}
     * @memberof OfferInfo
     */
    discountCoupons?: DiscountCoupons;
    /**
     * Offer error notification flag
     * @type {boolean}
     * @memberof OfferInfo
     */
    errorReported?: boolean | null;
    /**
     * Offer lifetime. Maybe empty
     * @type {string}
     * @memberof OfferInfo
     */
    validUntil?: string | null;
    /**
     * Offer use custom url as https://www.multicartshop.com/custom-url
     * @type {boolean}
     * @memberof OfferInfo
     */
    customLink?: boolean;
    /**
     * Offer custom url as https://www.multicartshop.com/custom-url
     * @type {string}
     * @memberof OfferInfo
     */
    link?: string | null;
    /**
     * Offer relationships with influencers
     * @type {Array<OfferLinkData>}
     * @memberof OfferInfo
     */
    shareLinks?: Array<OfferLinkData> | null;
    /**
     * Offer tags
     * @type {Array<string>}
     * @memberof OfferInfo
     */
    tags?: Array<string> | null;
    /**
     * Offer brand commission fee
     * @type {number}
     * @memberof OfferInfo
     */
    commissionFee?: number | null;
    /**
     * Use google analytics tracking for offer
     * @type {boolean}
     * @memberof OfferInfo
     */
    useGoogleAnalytics?: boolean | null;
    /**
     * Google analitics tracking id
     * @type {string}
     * @memberof OfferInfo
     */
    googleTrackingId?: string | null;
    /**
     * Offer using external link checkout flow
     * @type {boolean}
     * @memberof OfferInfo
     */
    useExternalCheckout?: boolean | null;
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
     *
     * @type {OfferInfo}
     * @memberof OfferPatch
     */
    offerInfo?: OfferInfo;
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
     *
     * @type {OfferInfo}
     * @memberof OfferPatchAllOf
     */
    offerInfo?: OfferInfo;
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
     *
     * @type {OfferInfo}
     * @memberof OfferPost
     */
    offerInfo?: OfferInfo;
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
