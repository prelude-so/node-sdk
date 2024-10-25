// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as RetryAPI from './retry';

export class Retry extends APIResource {
  /**
   * Perform a retry
   */
  create(body: RetryCreateParams, options?: Core.RequestOptions): Core.APIPromise<RetryCreateResponse> {
    return this._client.post('/retry', { body, ...options });
  }
}

export interface RetryCreateResponse {
  /**
   * The UUID of the corresponding authentication.
   */
  authentication_uuid?: string;

  created_at?: string;

  /**
   * The time at which the next retry will be available.
   */
  next_retry_at?: string;

  /**
   * The number of remaining retries.
   */
  remaining_retry?: number;

  /**
   * The status of the retry. Possible values are:
   *
   * - `approved` - The retry was approved and a new code was sent.
   * - `denied` - The retry was denied.
   * - `no_attempt` - No attempt was sent yet, so a retry cannot be completed.
   * - `rate_limited` - The authentication was rate limited and cannot be retried.
   * - `expired_auth` - The authentication has expired and cannot be retried.
   * - `already_validated` - The authentication has already been validated.
   */
  status?: 'approved' | 'denied' | 'no_attempt' | 'rate_limited' | 'expired_auth' | 'already_validated';
}

export interface RetryCreateParams {
  /**
   * The authentication UUID that was returned when you created the authentication.
   */
  authentication_uuid: string;

  /**
   * Your customer UUID, which can be found in the API settings in the dashboard.
   */
  customer_uuid: string;
}

export namespace Retry {
  export type RetryCreateResponse = RetryAPI.RetryCreateResponse;
  export type RetryCreateParams = RetryAPI.RetryCreateParams;
}
