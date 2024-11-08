// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Prelude from '@prelude.so/sdk';
import { Response } from 'node-fetch';

const client = new Prelude({
  apiToken: 'My API Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource watch', () => {
  test('feedback: only required params', async () => {
    const responsePromise = client.watch.feedback({
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

  test('feedback: required and optional params', async () => {
    const response = await client.watch.feedback({
      target: { type: 'phone_number', value: '+30123456789' },
      feedback: { type: 'CONFIRM_PHONE_NUMBER' },
    });
  });

  test('predict: only required params', async () => {
    const responsePromise = client.watch.predict({ target: { type: 'phone_number', value: '+30123456789' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('predict: required and optional params', async () => {
    const response = await client.watch.predict({
      target: { type: 'phone_number', value: '+30123456789' },
      signals: { device_id: 'device_id', device_model: 'device_model', device_type: 'device_type', ip: 'ip' },
    });
  });
});
