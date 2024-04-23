// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'prelude/core';
import { APIResource } from 'prelude/resource';
import * as CheckAPI from 'prelude/resources/check';

export class Check extends APIResource {
  /**
   * Check a code
   */
  create(body: CheckCreateParams, options?: Core.RequestOptions): Core.APIPromise<CheckCreateResponse> {
    return this._client.post('/check', { body, ...options });
  }
}

export interface CheckCreateResponse {
  /**
   * The UUID of the corresponding authentication.
   */
  authentication_uuid?: string;

  /**
   * The status of the check. Possible values are:
   *
   * - `valid` - The code is valid.
   * - `invalid` - The code is invalid.
   * - `without_attempt` - No attempt was sent yet, so a check cannot be completed.
   * - `rate_limited` - The authentication was rate limited and cannot be checked.
   * - `already_validated` - The authentication has already been validated.
   * - `expired_auth` - The authentication has expired and cannot be checked.
   */
  status?: 'valid' | 'invalid' | 'without_attempt' | 'rate_limited' | 'already_validated' | 'expired_auth';
}

export interface CheckCreateParams {
  /**
   * The authentication UUID that was returned when you created the authentication.
   */
  authentication_uuid: string;

  /**
   * The code that the user entered.
   */
  check_code: string;

  /**
   * Your customer UUID, which can be found in the API settings in the Dashboard.
   */
  customer_uuid: string;
}

export namespace Check {
  export import CheckCreateResponse = CheckAPI.CheckCreateResponse;
  export import CheckCreateParams = CheckAPI.CheckCreateParams;
}
