// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class VerificationManagement extends APIResource {
  /**
   * Remove a phone number from the allow or block list.
   *
   * This operation is idempotent - re-deleting the same phone number will not result
   * in errors. If the phone number does not exist in the specified list, the
   * operation will succeed without making any changes.
   *
   * In order to get access to this endpoint, contact our support team.
   */
  deletePhoneNumber(
    action: 'allow' | 'block',
    body: VerificationManagementDeletePhoneNumberParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VerificationManagementDeletePhoneNumberResponse> {
    return this._client.delete(`/v2/verification/management/phone-numbers/${action}`, { body, ...options });
  }

  /**
   * Retrieve the list of phone numbers in the allow or block list.
   *
   * In order to get access to this endpoint, contact our support team.
   */
  listPhoneNumbers(
    action: 'allow' | 'block',
    options?: Core.RequestOptions,
  ): Core.APIPromise<VerificationManagementListPhoneNumbersResponse> {
    return this._client.get(`/v2/verification/management/phone-numbers/${action}`, options);
  }

  /**
   * Retrieve sender IDs list.
   *
   * In order to get access to this endpoint, contact our support team.
   */
  listSenderIds(options?: Core.RequestOptions): Core.APIPromise<VerificationManagementListSenderIDsResponse> {
    return this._client.get('/v2/verification/management/sender-id', options);
  }

  /**
   * Add a phone number to the allow or block list.
   *
   * This operation is idempotent - re-adding the same phone number will not result
   * in duplicate entries or errors. If the phone number already exists in the
   * specified list, the operation will succeed without making any changes.
   *
   * In order to get access to this endpoint, contact our support team.
   */
  setPhoneNumber(
    action: 'allow' | 'block',
    body: VerificationManagementSetPhoneNumberParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VerificationManagementSetPhoneNumberResponse> {
    return this._client.post(`/v2/verification/management/phone-numbers/${action}`, { body, ...options });
  }

  /**
   * This endpoint allows you to submit a new sender ID for verification purposes.
   *
   * In order to get access to this endpoint, contact our support team.
   */
  submitSenderId(
    body: VerificationManagementSubmitSenderIDParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VerificationManagementSubmitSenderIDResponse> {
    return this._client.post('/v2/verification/management/sender-id', { body, ...options });
  }
}

export interface VerificationManagementDeletePhoneNumberResponse {
  /**
   * The E.164 formatted phone number that was removed from the list.
   */
  phone_number: string;
}

export interface VerificationManagementListPhoneNumbersResponse {
  /**
   * A list of phone numbers in the allow or block list.
   */
  phone_numbers: Array<VerificationManagementListPhoneNumbersResponse.PhoneNumber>;
}

export namespace VerificationManagementListPhoneNumbersResponse {
  export interface PhoneNumber {
    /**
     * The date and time when the phone number was added to the list.
     */
    created_at: string;

    /**
     * An E.164 formatted phone number.
     */
    phone_number: string;
  }
}

/**
 * A list of Sender ID.
 */
export interface VerificationManagementListSenderIDsResponse {
  sender_ids?: Array<VerificationManagementListSenderIDsResponse.SenderID>;
}

export namespace VerificationManagementListSenderIDsResponse {
  export interface SenderID {
    /**
     * Value that will be presented as Sender ID
     */
    sender_id?: string;

    /**
     * It indicates the status of the Sender ID. Possible values are:
     *
     * - `approved` - The Sender ID is approved.
     * - `pending` - The Sender ID is pending.
     * - `rejected` - The Sender ID is rejected.
     */
    status?: 'approved' | 'pending' | 'rejected';
  }
}

export interface VerificationManagementSetPhoneNumberResponse {
  /**
   * The E.164 formatted phone number that was added to the list.
   */
  phone_number: string;
}

export interface VerificationManagementSubmitSenderIDResponse {
  /**
   * The sender ID that was added.
   */
  sender_id: string;

  /**
   * It indicates the status of the sender ID. Possible values are:
   *
   * - `approved` - The sender ID is approved.
   * - `pending` - The sender ID is pending.
   * - `rejected` - The sender ID is rejected.
   */
  status: 'approved' | 'pending' | 'rejected';

  /**
   * The reason why the sender ID was rejected.
   */
  reason?: string;
}

export interface VerificationManagementDeletePhoneNumberParams {
  /**
   * An E.164 formatted phone number to remove from the list.
   */
  phone_number: string;
}

export interface VerificationManagementSetPhoneNumberParams {
  /**
   * An E.164 formatted phone number to add to the list.
   */
  phone_number: string;
}

export interface VerificationManagementSubmitSenderIDParams {
  /**
   * The sender ID to add.
   */
  sender_id: string;
}

export declare namespace VerificationManagement {
  export {
    type VerificationManagementDeletePhoneNumberResponse as VerificationManagementDeletePhoneNumberResponse,
    type VerificationManagementListPhoneNumbersResponse as VerificationManagementListPhoneNumbersResponse,
    type VerificationManagementListSenderIDsResponse as VerificationManagementListSenderIDsResponse,
    type VerificationManagementSetPhoneNumberResponse as VerificationManagementSetPhoneNumberResponse,
    type VerificationManagementSubmitSenderIDResponse as VerificationManagementSubmitSenderIDResponse,
    type VerificationManagementDeletePhoneNumberParams as VerificationManagementDeletePhoneNumberParams,
    type VerificationManagementSetPhoneNumberParams as VerificationManagementSetPhoneNumberParams,
    type VerificationManagementSubmitSenderIDParams as VerificationManagementSubmitSenderIDParams,
  };
}
