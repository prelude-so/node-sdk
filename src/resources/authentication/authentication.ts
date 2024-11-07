// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as FeedbackAPI from './feedback';
import { Feedback, FeedbackCreateParams, FeedbackCreateResponse } from './feedback';

export class Authentication extends APIResource {
  feedback: FeedbackAPI.Feedback = new FeedbackAPI.Feedback(this._client);

  /**
   * Send a code
   */
  create(
    body: AuthenticationCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuthenticationCreateResponse> {
    return this._client.post('/authentication', { body, ...options });
  }

  /**
   * Get authentication status
   */
  retrieve(authUuid: string, options?: Core.RequestOptions): Core.APIPromise<AuthenticationRetrieveResponse> {
    return this._client.get(`/authentication/${authUuid}`, options);
  }
}

/**
 * A successful response to an authentication creation request.
 */
export interface AuthenticationCreateResponse {
  /**
   * A unique identifier for the authentication that you can use on the /check and
   * /retry endpoints.
   */
  authentication_uuid?: string;

  created_at?: string;

  /**
   * The time at which the authentication expires and can no longer be checked or
   * retried.
   */
  expires_at?: string;

  /**
   * The status of the authentication. Possible values are:
   *
   * - `pending` - The OTP code is being sent.
   * - `rate_limited` - This user is rate-limited and cannot receive another code.
   * - `spam_detected` - This attempt is flagged as spam. Go to the dashboard for
   *   more details.
   */
  status?: 'pending' | 'rate_limited' | 'spam_detected';
}

export interface AuthenticationRetrieveResponse {
  /**
   * A unique, user-defined identifier that will be included in webhook events.
   */
  correlation_id?: string;

  created_at?: string;

  /**
   * Represents a collection of events that occur during the authentication process.
   * Each event captures specific actions and outcomes related to the authentication
   * attempts, checks, delivery statuses, and balance updates. The array can contain
   * different types of events, each with its own structure and properties.
   */
  events?: Array<
    | AuthenticationRetrieveResponse.Attempt
    | AuthenticationRetrieveResponse.Check
    | AuthenticationRetrieveResponse.DeliveryStatus
    | AuthenticationRetrieveResponse.BalanceUpdate
  >;

  /**
   * An E.164 formatted phone number.
   */
  phone_number?: string;

  /**
   * [Signals](/guides/prevent-fraud#signals) are data points used to distinguish
   * between fraudulent and legitimate users.
   */
  signals?: AuthenticationRetrieveResponse.Signals;

  /**
   * The template id associated with the message content variant to be sent.
   */
  template_id?: string;

  /**
   * The UUID of the corresponding authentication.
   */
  uuid?: string;
}

export namespace AuthenticationRetrieveResponse {
  export interface Attempt {
    /**
     * The ID of the attempt.
     */
    id?: string;

    /**
     * The attempt number.
     */
    attempt_number?: number;

    /**
     * The capability of the attempt.
     */
    capability?: 'rcs' | 'text' | 'whatsapp' | 'viber';

    /**
     * The content of the attempt.
     */
    content?: string;

    created_at?: string;

    /**
     * The sender ID of the attempt.
     */
    sender_id?: string;

    /**
     * The status of the attempt. Possible values are:
     *
     * - `pending` - The attempt is pending.
     * - `delivered` - The attempt was delivered.
     * - `failed` - The attempt failed.
     * - `rate_limited` - The authentication was rate limited and cannot be retried.
     * - `expired` - The authentication has expired and cannot be retried.
     */
    status?: 'pending' | 'delivered' | 'failed' | 'rate_limited' | 'expired';

    /**
     * The type of the event.
     */
    type?: 'attempt' | 'check' | 'delivery_status' | 'balance_update';
  }

  export interface Check {
    /**
     * The ID of the check.
     */
    id?: string;

    /**
     * The code that was checked.
     */
    code?: string;

    created_at?: string;

    /**
     * The status of the check. Possible values are:
     *
     * - `unknown` - The status is unknown.
     * - `valid` - The code is valid.
     * - `invalid` - The code is invalid.
     * - `without_attempt` - No attempt was sent yet, so a check cannot be completed.
     * - `rate_limited` - The authentication was rate limited and cannot be checked.
     * - `already_validated` - The authentication has already been validated.
     * - `expired_auth` - The authentication has expired and cannot be checked.
     */
    status?:
      | 'unknown'
      | 'valid'
      | 'invalid'
      | 'without_attempt'
      | 'rate_limited'
      | 'already_validated'
      | 'expired_auth';

    /**
     * The type of the event.
     */
    type?: 'attempt' | 'check' | 'delivery_status' | 'balance_update';
  }

  export interface DeliveryStatus {
    /**
     * The ID of the attempt.
     */
    attempt_id?: string;

    /**
     * The attempt number.
     */
    attempt_number?: number;

    created_at?: string;

    /**
     * The date and time from the provider.
     */
    originated_at?: string;

    /**
     * The status of the delivery. Possible values are:
     *
     * - `unknown` - The status of the delivery is unknown.
     * - `submitted` - The message has been submitted to the carrier.
     * - `in_transit` - The message is in transit to the recipient.
     * - `delivered` - The message has been delivered to the recipient.
     * - `undeliverable` - The message could not be delivered to the recipient.
     */
    status?: 'unknown' | 'submitted' | 'in_transit' | 'delivered' | 'undeliverable';

    /**
     * The type of the event.
     */
    type?: 'attempt' | 'check' | 'delivery_status' | 'balance_update';
  }

  export interface BalanceUpdate {
    /**
     * The amount of the balance update.
     */
    amount?: number;

    balance_update_type?:
      | 'unknown'
      | 'authentication'
      | 'attempt'
      | 'attempt_pending'
      | 'attempt_success'
      | 'authentication_pending'
      | 'authentication_success';

    created_at?: string;

    /**
     * The type of the event.
     */
    type?: 'attempt' | 'check' | 'delivery_status' | 'balance_update';
  }

  /**
   * [Signals](/guides/prevent-fraud#signals) are data points used to distinguish
   * between fraudulent and legitimate users.
   */
  export interface Signals {
    /**
     * The Android SMS Retriever API hash code that identifies your app. This allows
     * you to automatically retrieve and fill the OTP code on Android devices.
     */
    app_realm?: string;

    /**
     * The version of your application.
     */
    app_version?: string;

    /**
     * Unique identifier for the user's device. For Android, this corresponds to the
     * `ANDROID_ID` and for iOS, this corresponds to the `identifierForVendor`.
     */
    device_id?: string;

    /**
     * The model of the user's device.
     */
    device_model?: string;

    /**
     * The type of device the user is using.
     */
    device_type?: 'IOS' | 'ANDROID' | 'WEB';

    /**
     * The IP address of the user's device.
     */
    ip?: string;

    /**
     * This signal should do more than just confirm if a user is returning to your app;
     * it should provide a higher level of trust, indicating that the user is genuine.
     * For more details, refer to [Signals](/guides/prevent-fraud#signals).
     */
    is_returning_user?: boolean;

    /**
     * The version of the user's device operating system.
     */
    os_version?: string;
  }
}

export interface AuthenticationCreateParams {
  /**
   * Your customer UUID, which can be found in the API settings in the dashboard.
   */
  customer_uuid: string;

  /**
   * An E.164 formatted phone number to send the OTP to.
   */
  phone_number: string;

  /**
   * The Android SMS Retriever API hash code that identifies your app. This allows
   * you to automatically retrieve and fill the OTP code on Android devices.
   */
  app_realm?: string;

  /**
   * The version of your application.
   */
  app_version?: string;

  /**
   * A webhook URL to which delivery statuses will be sent.
   */
  callback_url?: string;

  /**
   * A unique, user-defined identifier that will be included in webhook events
   */
  correlation_id?: string;

  /**
   * Unique identifier for the user's device. For Android, this corresponds to the
   * `ANDROID_ID` and for iOS, this corresponds to the `identifierForVendor`.
   */
  device_id?: string;

  /**
   * The model of the user's device.
   */
  device_model?: string;

  /**
   * The type of device the user is using.
   */
  device_type?: 'IOS' | 'ANDROID' | 'WEB';

  /**
   * The IP address of the user's device.
   */
  ip?: string;

  /**
   * This signal should do more than just confirm if a user is returning to your app;
   * it should provide a higher level of trust, indicating that the user is genuine.
   * For more details, refer to [Signals](/guides/prevent-fraud#signals).
   */
  is_returning_user?: boolean;

  /**
   * A BCP-47 locale indicating the language the SMS should be sent to; if this is
   * not set, the SMS will be sent to the language specified by the country code of
   * the message. If we don't support the language set, the message will be sent in
   * US English (en-US).
   */
  locale?: string;

  /**
   * The version of the user's device operating system.
   */
  os_version?: string;

  /**
   * The Sender ID to use when sending the message.
   */
  sender_id?: string;

  /**
   * The template id associated with the message content variant to be sent.
   */
  template_id?: string;
}

Authentication.Feedback = Feedback;

export declare namespace Authentication {
  export {
    type AuthenticationCreateResponse as AuthenticationCreateResponse,
    type AuthenticationRetrieveResponse as AuthenticationRetrieveResponse,
    type AuthenticationCreateParams as AuthenticationCreateParams,
  };

  export {
    Feedback as Feedback,
    type FeedbackCreateResponse as FeedbackCreateResponse,
    type FeedbackCreateParams as FeedbackCreateParams,
  };
}
