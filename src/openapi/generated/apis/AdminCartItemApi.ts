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
    CartItemBody,
    CartItemBodyAdmin,
    CartItemGetAdmin,
    CartItemPagingResponse,
    CartItemPatch,
    EnPageDirection,
    EnPlatformType,
    ResultGuid,
} from '../models';

export interface AdminCartItemDeleteRequest {
    id: string;
}

export interface AdminCartItemGetRequest {
    id: string;
}

export interface AdminCartItemListRequest {
    platform?: EnPlatformType;
    seller?: string | null;
    usItemId?: string | null;
    userId?: string | null;
    pageSize?: number | null;
    dir?: EnPageDirection;
    pageToken?: string | null;
    includedProperties?: Array<string> | null;
}

export interface AdminCartItemPatchRequest {
    id: string;
    cartItemPatch: CartItemPatch;
}

export interface AdminCartItemPostRequest {
    cartItemBodyAdmin: CartItemBodyAdmin;
}

export interface AdminCartItemPutRequest {
    id: string;
    cartItemBody: CartItemBody;
}

/**
 *
 */
export class AdminCartItemApi extends runtime.BaseAPI {
    /**
     * Delete cart item
     * Delete cart item
     */
    async adminCartItemDeleteRaw(
        requestParameters: AdminCartItemDeleteRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<void>> {
        if (
            requestParameters.id === null ||
            requestParameters.id === undefined
        ) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter requestParameters.id was null or undefined when calling adminCartItemDelete.'
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
                path: `/api/admin/CartItem/{id}`.replace(
                    `{${'id'}}`,
                    encodeURIComponent(String(requestParameters.id))
                ),
                method: 'DELETE',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides
        );

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete cart item
     * Delete cart item
     */
    async adminCartItemDelete(
        requestParameters: AdminCartItemDeleteRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<void> {
        await this.adminCartItemDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * Retrieves cart item by unique id
     * Get cart item by id
     */
    async adminCartItemGetRaw(
        requestParameters: AdminCartItemGetRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<CartItemGetAdmin>> {
        if (
            requestParameters.id === null ||
            requestParameters.id === undefined
        ) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter requestParameters.id was null or undefined when calling adminCartItemGet.'
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
                path: `/api/admin/CartItem/{id}`.replace(
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
     * Retrieves cart item by unique id
     * Get cart item by id
     */
    async adminCartItemGet(
        requestParameters: AdminCartItemGetRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<CartItemGetAdmin> {
        const response = await this.adminCartItemGetRaw(
            requestParameters,
            initOverrides
        );
        return await response.value();
    }

    /**
     * Retrieves cart items by pages applying filter (platform, seller, usItemId)
     * Get cart items for user (paged)
     */
    async adminCartItemListRaw(
        requestParameters: AdminCartItemListRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<CartItemPagingResponse>> {
        const queryParameters: any = {};

        if (requestParameters.platform !== undefined) {
            queryParameters['Platform'] = requestParameters.platform;
        }

        if (requestParameters.seller !== undefined) {
            queryParameters['Seller'] = requestParameters.seller;
        }

        if (requestParameters.usItemId !== undefined) {
            queryParameters['UsItemId'] = requestParameters.usItemId;
        }

        if (requestParameters.userId !== undefined) {
            queryParameters['UserId'] = requestParameters.userId;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        if (requestParameters.dir !== undefined) {
            queryParameters['Dir'] = requestParameters.dir;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['PageToken'] = requestParameters.pageToken;
        }

        if (requestParameters.includedProperties) {
            queryParameters['IncludedProperties'] =
                requestParameters.includedProperties;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters['Authorization'] =
                await this.configuration.accessToken('bearer', []);
        }

        const response = await this.request(
            {
                path: `/api/admin/CartItem`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides
        );

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Retrieves cart items by pages applying filter (platform, seller, usItemId)
     * Get cart items for user (paged)
     */
    async adminCartItemList(
        requestParameters: AdminCartItemListRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<CartItemPagingResponse> {
        const response = await this.adminCartItemListRaw(
            requestParameters,
            initOverrides
        );
        return await response.value();
    }

    /**
     * Patch cart item by id (only the fields provided in the request will be changed)
     * Patch cart item by id
     */
    async adminCartItemPatchRaw(
        requestParameters: AdminCartItemPatchRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<void>> {
        if (
            requestParameters.id === null ||
            requestParameters.id === undefined
        ) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter requestParameters.id was null or undefined when calling adminCartItemPatch.'
            );
        }

        if (
            requestParameters.cartItemPatch === null ||
            requestParameters.cartItemPatch === undefined
        ) {
            throw new runtime.RequiredError(
                'cartItemPatch',
                'Required parameter requestParameters.cartItemPatch was null or undefined when calling adminCartItemPatch.'
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
                path: `/api/admin/CartItem/{id}`.replace(
                    `{${'id'}}`,
                    encodeURIComponent(String(requestParameters.id))
                ),
                method: 'PATCH',
                headers: headerParameters,
                query: queryParameters,
                body: requestParameters.cartItemPatch,
            },
            initOverrides
        );

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Patch cart item by id (only the fields provided in the request will be changed)
     * Patch cart item by id
     */
    async adminCartItemPatch(
        requestParameters: AdminCartItemPatchRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<void> {
        await this.adminCartItemPatchRaw(requestParameters, initOverrides);
    }

    /**
     * Add crt item for user
     * Add cart item
     */
    async adminCartItemPostRaw(
        requestParameters: AdminCartItemPostRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<ResultGuid>> {
        if (
            requestParameters.cartItemBodyAdmin === null ||
            requestParameters.cartItemBodyAdmin === undefined
        ) {
            throw new runtime.RequiredError(
                'cartItemBodyAdmin',
                'Required parameter requestParameters.cartItemBodyAdmin was null or undefined when calling adminCartItemPost.'
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
                path: `/api/admin/CartItem`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: requestParameters.cartItemBodyAdmin,
            },
            initOverrides
        );

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Add crt item for user
     * Add cart item
     */
    async adminCartItemPost(
        requestParameters: AdminCartItemPostRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<ResultGuid> {
        const response = await this.adminCartItemPostRaw(
            requestParameters,
            initOverrides
        );
        return await response.value();
    }

    /**
     * Update cart item by id (all fields will be changed)
     * Update cart item
     */
    async adminCartItemPutRaw(
        requestParameters: AdminCartItemPutRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<void>> {
        if (
            requestParameters.id === null ||
            requestParameters.id === undefined
        ) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter requestParameters.id was null or undefined when calling adminCartItemPut.'
            );
        }

        if (
            requestParameters.cartItemBody === null ||
            requestParameters.cartItemBody === undefined
        ) {
            throw new runtime.RequiredError(
                'cartItemBody',
                'Required parameter requestParameters.cartItemBody was null or undefined when calling adminCartItemPut.'
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
                path: `/api/admin/CartItem/{id}`.replace(
                    `{${'id'}}`,
                    encodeURIComponent(String(requestParameters.id))
                ),
                method: 'PUT',
                headers: headerParameters,
                query: queryParameters,
                body: requestParameters.cartItemBody,
            },
            initOverrides
        );

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Update cart item by id (all fields will be changed)
     * Update cart item
     */
    async adminCartItemPut(
        requestParameters: AdminCartItemPutRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<void> {
        await this.adminCartItemPutRaw(requestParameters, initOverrides);
    }
}
