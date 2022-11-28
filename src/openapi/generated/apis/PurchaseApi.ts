/* tslint:disable */
/* eslint-disable */
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

import * as runtime from '../runtime';
import type {
    ApiError,
    ApiErrorOfShoppingCartErrorData,
    PurchaseGet,
    PurchasePost,
    ShoppingCart,
    ShoppingCartPost,
} from '../models';

export interface PurchaseGetRequest {
    id: string;
}

export interface PurchasePostRequest {
    purchasePost: PurchasePost;
}

export interface PurchasePostCartRequest {
    shoppingCartPost: ShoppingCartPost;
}

/**
 *
 */
export class PurchaseApi extends runtime.BaseAPI {
    /**
     * Retrieves purchase by unique id
     * Get purchase by id
     */
    async purchaseGetRaw(
        requestParameters: PurchaseGetRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<PurchaseGet>> {
        if (
            requestParameters.id === null ||
            requestParameters.id === undefined
        ) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter requestParameters.id was null or undefined when calling purchaseGet.'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters['Authorization'] =
                await this.configuration.accessToken('bearer', []);
        }

        const response = await this.request(
            {
                path: `/api/Purchase/{id}`.replace(
                    `{${'id'}}`,
                    encodeURIComponent(String(requestParameters.id))
                ),
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides
        );

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Retrieves purchase by unique id
     * Get purchase by id
     */
    async purchaseGet(
        requestParameters: PurchaseGetRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<PurchaseGet> {
        const response = await this.purchaseGetRaw(
            requestParameters,
            initOverrides
        );
        return await response.value();
    }

    /**
     * Create purchase from shopping cart
     * Create purchase
     */
    async purchasePostRaw(
        requestParameters: PurchasePostRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<ShoppingCart>> {
        if (
            requestParameters.purchasePost === null ||
            requestParameters.purchasePost === undefined
        ) {
            throw new runtime.RequiredError(
                'purchasePost',
                'Required parameter requestParameters.purchasePost was null or undefined when calling purchasePost.'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters['Authorization'] =
                await this.configuration.accessToken('bearer', []);
        }

        const response = await this.request(
            {
                path: `/api/Purchase`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: requestParameters.purchasePost,
            },
            initOverrides
        );

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Create purchase from shopping cart
     * Create purchase
     */
    async purchasePost(
        requestParameters: PurchasePostRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<ShoppingCart> {
        const response = await this.purchasePostRaw(
            requestParameters,
            initOverrides
        );
        return await response.value();
    }

    /**
     * Create shopping cart with cart items. At the same time, the cart items are synchronized with the platform
     * Create shopping cart
     */
    async purchasePostCartRaw(
        requestParameters: PurchasePostCartRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<ShoppingCart>> {
        if (
            requestParameters.shoppingCartPost === null ||
            requestParameters.shoppingCartPost === undefined
        ) {
            throw new runtime.RequiredError(
                'shoppingCartPost',
                'Required parameter requestParameters.shoppingCartPost was null or undefined when calling purchasePostCart.'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters['Authorization'] =
                await this.configuration.accessToken('bearer', []);
        }

        const response = await this.request(
            {
                path: `/api/Purchase/cart`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: requestParameters.shoppingCartPost,
            },
            initOverrides
        );

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Create shopping cart with cart items. At the same time, the cart items are synchronized with the platform
     * Create shopping cart
     */
    async purchasePostCart(
        requestParameters: PurchasePostCartRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<ShoppingCart> {
        const response = await this.purchasePostCartRaw(
            requestParameters,
            initOverrides
        );
        return await response.value();
    }
}
