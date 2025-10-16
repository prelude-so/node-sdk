// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class VerificationManagement extends APIResource {
  /**
   * Retrieve sender IDs list.
   *
   * In order to get access to this endpoint, contact our support team.
   */
  listSenderIds(options?: Core.RequestOptions): Core.APIPromise<VerificationManagementListSenderIDsResponse> {
    return this._client.get('/v2/verification/management/sender-id', options);
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

export interface VerificationManagementSubmitSenderIDParams {
  /**
   * The sender ID to add.
   */
  sender_id: string;
}

export declare namespace VerificationManagement {
  export {
    type VerificationManagementListSenderIDsResponse as VerificationManagementListSenderIDsResponse,
    type VerificationManagementSubmitSenderIDResponse as VerificationManagementSubmitSenderIDResponse,
    type VerificationManagementSubmitSenderIDParams as VerificationManagementSubmitSenderIDParams,
  };
}
