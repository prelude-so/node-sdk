// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'prelude/core';
import { APIResource } from 'prelude/resource';
import * as AuthenticationAPI from 'prelude/resources/authentication/authentication';
import * as FeedbackAPI from 'prelude/resources/authentication/feedback';

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
   * Whether the user is a returning user on your app.
   */
  is_returning_user?: boolean;

  /**
   * The version of the user's device operating system.
   */
  os_version?: string;

  /**
   * The template id associated with the message content variant to be sent.
   */
  template_id?: string;
}

export namespace Authentication {
  export import AuthenticationCreateResponse = AuthenticationAPI.AuthenticationCreateResponse;
  export import AuthenticationCreateParams = AuthenticationAPI.AuthenticationCreateParams;
  export import Feedback = FeedbackAPI.Feedback;
  export import FeedbackCreateResponse = FeedbackAPI.FeedbackCreateResponse;
  export import FeedbackCreateParams = FeedbackAPI.FeedbackCreateParams;
}
