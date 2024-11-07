// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Prelude from 'prelude';
import { Response } from 'node-fetch';

const client = new Prelude({
  apiKey: 'My API Key',
  customerUuid: 'My Customer Uuid',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource authentication', () => {
  test('create: only required params', async () => {
    const responsePromise = client.authentication.create({
      customer_uuid: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      phone_number: '+1234567890',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.authentication.create({
      customer_uuid: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      phone_number: '+1234567890',
      app_realm: 'app_realm',
      app_version: 'app_version',
      callback_url: 'callback_url',
      correlation_id: 'correlation_id',
      device_id: 'device_id',
      device_model: 'device_model',
      device_type: 'IOS',
      ip: 'ip',
      is_returning_user: true,
      locale: 'en-US',
      os_version: 'os_version',
      sender_id: 'sender_id',
      template_id: 'template_id',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.authentication.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      client.authentication.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Prelude.NotFoundError);
  });
});
