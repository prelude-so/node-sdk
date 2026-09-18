// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

/**
 * Verify phone numbers.
 */
export class Sandbox extends APIResource {
  /**
   * Register a phone number as a sandbox number and associate it with a fixed
   * attempt code. Subsequent verification attempts against this number will not
   * trigger a real SMS/call and will validate against the configured attempt code.
   *
   * This operation is idempotent - re-adding the same phone number will overwrite
   * the existing attempt code.
   *
   * In order to get access to this endpoint, contact our support team.
   *
   * @example
   * ```ts
   * const response =
   *   await client.verificationManagement.sandbox.addPhoneNumber(
   *     {
   *       attempt_code: '123456',
   *       phone_number: '+30123456789',
   *     },
   *   );
   * ```
   */
  addPhoneNumber(
    body: SandboxAddPhoneNumberParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SandboxAddPhoneNumberResponse> {
    return this._client.put('/v2/verification/management/phone-numbers/sandbox', { body, ...options });
  }

  /**
   * Remove a phone number from the sandbox list.
   *
   * This operation is idempotent - deleting a phone number that is not in the
   * sandbox list will succeed without making any changes.
   *
   * In order to get access to this endpoint, contact our support team.
   *
   * @example
   * ```ts
   * const response =
   *   await client.verificationManagement.sandbox.deletePhoneNumber(
   *     '+12065550100',
   *   );
   * ```
   */
  deletePhoneNumber(
    phoneNumber: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SandboxDeletePhoneNumberResponse> {
    return this._client.delete(`/v2/verification/management/phone-numbers/sandbox/${phoneNumber}`, options);
  }

  /**
   * Retrieve the list of sandbox phone numbers for the account. Sandbox numbers are
   * test numbers that bypass the real verification flow and return a fixed attempt
   * code.
   *
   * In order to get access to this endpoint, contact our support team.
   *
   * @example
   * ```ts
   * const response =
   *   await client.verificationManagement.sandbox.listPhoneNumbers();
   * ```
   */
  listPhoneNumbers(options?: Core.RequestOptions): Core.APIPromise<SandboxListPhoneNumbersResponse> {
    return this._client.get('/v2/verification/management/phone-numbers/sandbox', options);
  }
}

export interface SandboxAddPhoneNumberResponse {
  /**
   * The fixed attempt code associated with the sandbox phone number.
   */
  attempt_code: string;

  /**
   * The E.164 formatted phone number that was added to the sandbox list.
   */
  phone_number: string;
}

export interface SandboxDeletePhoneNumberResponse {
  /**
   * The E.164 formatted phone number that was removed from the sandbox list.
   */
  phone_number: string;
}

export interface SandboxListPhoneNumbersResponse {
  /**
   * A list of sandbox phone numbers.
   */
  phone_numbers: Array<SandboxListPhoneNumbersResponse.PhoneNumber>;
}

export namespace SandboxListPhoneNumbersResponse {
  export interface PhoneNumber {
    /**
     * The fixed attempt code associated with the sandbox phone number.
     */
    attempt_code: string;

    /**
     * The date and time when the phone number was added to the sandbox list.
     */
    created_at: string;

    /**
     * An E.164 formatted phone number.
     */
    phone_number: string;
  }
}

export interface SandboxAddPhoneNumberParams {
  /**
   * The fixed attempt code that will validate verification attempts for this phone
   * number.
   */
  attempt_code: string;

  /**
   * An E.164 formatted phone number to add to the sandbox list.
   */
  phone_number: string;
}

export declare namespace Sandbox {
  export {
    type SandboxAddPhoneNumberResponse as SandboxAddPhoneNumberResponse,
    type SandboxDeletePhoneNumberResponse as SandboxDeletePhoneNumberResponse,
    type SandboxListPhoneNumbersResponse as SandboxListPhoneNumbersResponse,
    type SandboxAddPhoneNumberParams as SandboxAddPhoneNumberParams,
  };
}
