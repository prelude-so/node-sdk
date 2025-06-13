// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Prelude } from './index';

export abstract class APIResource {
  protected _client: Prelude;

  constructor(client: Prelude) {
    this._client = client;
  }
}
