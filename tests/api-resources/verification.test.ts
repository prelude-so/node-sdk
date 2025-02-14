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
      dispatch_id: 'dispatch_id',
      metadata: { correlation_id: 'correlation_id' },
      options: {
        app_realm: { platform: 'android', value: 'value' },
        code_size: 5,
        custom_code: 'custom_code',
        locale: 'el-GR',
        sender_id: 'sender_id',
        template_id: 'template_id',
      },
      signals: {
        app_version: '1.2.34',
        device_id: '8F0B8FDD-C2CB-4387-B20A-56E9B2E5A0D2',
        device_model: 'iPhone17,2',
        device_platform: 'android',
        ip: '192.0.2.1',
        is_trusted_user: false,
        os_version: '18.0.1',
      },
    });
  });

  test('check: only required params', async () => {
    const responsePromise = client.verification.check({
      code: '12345',
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
      code: '12345',
      target: { type: 'phone_number', value: '+30123456789' },
    });
  });
});
