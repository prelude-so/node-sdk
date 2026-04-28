// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Prelude from '@prelude.so/sdk';
import { Response } from 'node-fetch';

const client = new Prelude({
  apiToken: 'My API Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource notify', () => {
  test('getSubscriptionConfig', async () => {
    const responsePromise = client.notify.getSubscriptionConfig('config_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getSubscriptionConfig: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.notify.getSubscriptionConfig('config_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Prelude.NotFoundError);
  });

  test('getSubscriptionPhoneNumber', async () => {
    const responsePromise = client.notify.getSubscriptionPhoneNumber('config_id', 'phone_number');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getSubscriptionPhoneNumber: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.notify.getSubscriptionPhoneNumber('config_id', 'phone_number', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Prelude.NotFoundError);
  });

  test('listSubscriptionConfigs', async () => {
    const responsePromise = client.notify.listSubscriptionConfigs();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listSubscriptionConfigs: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.notify.listSubscriptionConfigs({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Prelude.NotFoundError,
    );
  });

  test('listSubscriptionConfigs: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.notify.listSubscriptionConfigs(
        { cursor: 'cursor', limit: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Prelude.NotFoundError);
  });

  test('listSubscriptionPhoneNumberEvents', async () => {
    const responsePromise = client.notify.listSubscriptionPhoneNumberEvents('config_id', 'phone_number');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listSubscriptionPhoneNumberEvents: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.notify.listSubscriptionPhoneNumberEvents('config_id', 'phone_number', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Prelude.NotFoundError);
  });

  test('listSubscriptionPhoneNumberEvents: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.notify.listSubscriptionPhoneNumberEvents(
        'config_id',
        'phone_number',
        { cursor: 'cursor', limit: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Prelude.NotFoundError);
  });

  test('listSubscriptionPhoneNumbers', async () => {
    const responsePromise = client.notify.listSubscriptionPhoneNumbers('config_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listSubscriptionPhoneNumbers: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.notify.listSubscriptionPhoneNumbers('config_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Prelude.NotFoundError);
  });

  test('listSubscriptionPhoneNumbers: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.notify.listSubscriptionPhoneNumbers(
        'config_id',
        {
          cursor: 'cursor',
          limit: 1,
          state: 'SUB',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Prelude.NotFoundError);
  });

  test('send: only required params', async () => {
    const responsePromise = client.notify.send({
      template_id: 'template_01k8ap1btqf5r9fq2c8ax5fhc9',
      to: '+33612345678',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('send: required and optional params', async () => {
    const response = await client.notify.send({
      template_id: 'template_01k8ap1btqf5r9fq2c8ax5fhc9',
      to: '+33612345678',
      callback_url: 'https://your-app.com/webhooks/notify',
      context: { reply_to: 'im_01k8aq2zggeyssvt53zgvpx63a' },
      correlation_id: 'order-12345',
      document: { url: 'https://example.com/invoice.pdf', filename: 'invoice.pdf' },
      expires_at: '2025-12-25T18:00:00Z',
      from: 'from',
      locale: 'el-GR',
      preferred_channel: 'whatsapp',
      schedule_at: '2025-12-25T10:00:00Z',
      text: "Thanks for reaching out! We'll look into your request.",
      variables: { order_id: '12345', amount: '$49.99' },
    });
  });

  test('sendBatch: only required params', async () => {
    const responsePromise = client.notify.sendBatch({
      template_id: 'template_01k8ap1btqf5r9fq2c8ax5fhc9',
      to: ['+33612345678', '+15551234567'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sendBatch: required and optional params', async () => {
    const response = await client.notify.sendBatch({
      template_id: 'template_01k8ap1btqf5r9fq2c8ax5fhc9',
      to: ['+33612345678', '+15551234567'],
      callback_url: 'https://your-app.com/webhooks/notify',
      correlation_id: 'campaign-12345',
      document: { url: 'https://example.com/invoice.pdf', filename: 'invoice.pdf' },
      expires_at: '2025-12-25T18:00:00Z',
      from: 'from',
      locale: 'el-GR',
      preferred_channel: 'whatsapp',
      schedule_at: '2025-12-25T10:00:00Z',
      variables: { order_id: '12345', amount: '$49.99' },
    });
  });
});
