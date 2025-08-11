// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Prelude from '@prelude.so/sdk';
import { Response } from 'node-fetch';

const client = new Prelude({
  apiToken: 'My API Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource transactional', () => {
  // Prism doesn't support callbacks yet
  test.skip('send: only required params', async () => {
    const responsePromise = client.transactional.send({
      template_id: 'template_01jd1xq0cffycayqtdkdbv4d61',
      to: '+30123456789',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism doesn't support callbacks yet
  test.skip('send: required and optional params', async () => {
    const response = await client.transactional.send({
      template_id: 'template_01jd1xq0cffycayqtdkdbv4d61',
      to: '+30123456789',
      callback_url: 'callback_url',
      correlation_id: 'correlation_id',
      expires_at: 'expires_at',
      from: 'from',
      locale: 'el-GR',
      variables: { foo: 'bar' },
    });
  });
});
