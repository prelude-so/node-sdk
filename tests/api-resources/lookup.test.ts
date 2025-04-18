// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Prelude from '@prelude.so/sdk';
import { Response } from 'node-fetch';

const client = new Prelude({
  apiToken: 'My API Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource lookup', () => {
  test('lookup', async () => {
    const responsePromise = client.lookup.lookup('+12065550100');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('lookup: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.lookup.lookup('+12065550100', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Prelude.NotFoundError,
    );
  });

  test('lookup: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.lookup.lookup('+12065550100', { type: ['cnam'] }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Prelude.NotFoundError);
  });
});
