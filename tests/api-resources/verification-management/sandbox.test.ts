// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Prelude from '@prelude.so/sdk';
import { Response } from 'node-fetch';

const client = new Prelude({
  apiToken: 'My API Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sandbox', () => {
  test('addPhoneNumber: only required params', async () => {
    const responsePromise = client.verificationManagement.sandbox.addPhoneNumber({
      attempt_code: '123456',
      phone_number: '+30123456789',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('addPhoneNumber: required and optional params', async () => {
    const response = await client.verificationManagement.sandbox.addPhoneNumber({
      attempt_code: '123456',
      phone_number: '+30123456789',
    });
  });

  test('deletePhoneNumber', async () => {
    const responsePromise = client.verificationManagement.sandbox.deletePhoneNumber('+12065550100');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('deletePhoneNumber: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.verificationManagement.sandbox.deletePhoneNumber('+12065550100', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Prelude.NotFoundError);
  });

  test('listPhoneNumbers', async () => {
    const responsePromise = client.verificationManagement.sandbox.listPhoneNumbers();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listPhoneNumbers: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.verificationManagement.sandbox.listPhoneNumbers({ path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Prelude.NotFoundError);
  });
});
