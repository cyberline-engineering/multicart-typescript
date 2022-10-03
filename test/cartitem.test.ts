import { describe, expect, test } from '@jest/globals';
import { CartItemApi } from '../src';

describe('cart item API client', () => {
    test('get cart item text', async () => {
        const id = '01a47eab-4a25-418e-ab3b-6619156feb92';
        const client = new CartItemApi();
        const cartItem = await client.cartItemGet({ id });

        expect(cartItem).toBeDefined();
        expect(cartItem.id).toBe(id);
    });
});
