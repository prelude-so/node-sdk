// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Prelude from 'prelude';
import { Response } from 'node-fetch';

const prelude = new Prelude({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource authentication', () => {
  test('create: only required params', async () => {
    const responsePromise = prelude.authentication.create({
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
    const response = await prelude.authentication.create({
      customer_uuid: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      phone_number: '+1234567890',
      app_realm: 'string',
      app_version: 'string',
      callback_url: 'string',
      device_id: 'string',
      device_model: 'string',
      device_type: 'IOS',
      ip: 'string',
      is_returning_user: true,
      os_version: 'string',
      template_id: 'string',
    });
  });
});
