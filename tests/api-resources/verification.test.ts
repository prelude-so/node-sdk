// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Prelude from '@prelude.so/sdk';
import { Response } from 'node-fetch';

const client = new Prelude({
  apiToken: 'My API Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource verification', () => {
  test('create: only required params', async () => {
    const responsePromise = client.verification.create({
      target: { type: 'phone_number', value: '+30123456789' },
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
    const response = await client.verification.create({
      target: { type: 'phone_number', value: '+30123456789' },
      metadata: { correlation_id: 'correlation_id' },
      options: { locale: 'el-GR', sender_id: 'sender_id', template_id: 'template_id' },
      signals: {
        app_realm: 'app_realm',
        app_version: 'app_version',
        device_id: 'device_id',
        device_model: 'device_model',
        device_type: 'IOS',
        ip: 'ip',
        is_trusted_user: 'is_trusted_user',
        os_version: 'os_version',
      },
    });
  });

  test('check: only required params', async () => {
    const responsePromise = client.verification.check({
      target: { type: 'phone_number', value: '+30123456789' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('check: required and optional params', async () => {
    const response = await client.verification.check({
      target: { type: 'phone_number', value: '+30123456789' },
      code: '12345',
    });
  });
});
