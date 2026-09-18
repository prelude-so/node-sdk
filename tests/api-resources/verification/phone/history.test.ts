// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Prelude from '@prelude.so/sdk';
import { Response } from 'node-fetch';

const client = new Prelude({
  apiToken: 'My API Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource history', () => {
  test('retrieve', async () => {
    const responsePromise = client.verification.phone.history.retrieve('vrf_01jc0t6fwwfgfsq1md24mhyztj');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.verification.phone.history.retrieve('vrf_01jc0t6fwwfgfsq1md24mhyztj', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Prelude.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.verification.phone.history.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.verification.phone.history.list({ path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Prelude.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.verification.phone.history.list(
        {
          channels: ['sms'],
          cursor: 'cursor',
          device_platform: 'android',
          from: '2026-09-01T00:00:00Z',
          limit: 1,
          max_attempts: 0,
          min_attempts: 0,
          phone_number: '+33612345678',
          region: 'FR',
          status: 'converted',
          template_id: 'template_01jc0t6fwwfgfsq1md24mhyztj',
          to: '2026-09-08T00:00:00Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Prelude.NotFoundError);
  });
});
