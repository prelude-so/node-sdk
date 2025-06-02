// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Verification extends APIResource {
  /**
   * Create a new verification for a specific phone number. If another non-expired
   * verification exists (the request is performed within the verification window),
   * this endpoint will perform a retry instead.
   */
  create(
    body: VerificationCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VerificationCreateResponse> {
    return this._client.post('/v2/verification', { body, ...options });
  }

  /**
   * Check the validity of a verification code.
   */
  check(
    body: VerificationCheckParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VerificationCheckResponse> {
    return this._client.post('/v2/verification/check', { body, ...options });
  }
}

export interface VerificationCreateResponse {
  /**
   * The verification identifier.
   */
  id: string;

  /**
   * The method used for verifying this phone number.
   */
  method: 'message' | 'silent' | 'voice';

  /**
   * The status of the verification.
   */
  status: 'success' | 'retry' | 'blocked';

  /**
   * The ordered sequence of channels to be used for verification
   */
  channels?: Array<string>;

  /**
   * The metadata for this verification.
   */
  metadata?: VerificationCreateResponse.Metadata;

  /**
   * The reason why the verification was blocked. Only present when status is
   * "blocked".
   */
  reason?:
    | 'suspicious'
    | 'repeated_attempts'
    | 'invalid_phone_line'
    | 'invalid_phone_number'
    | 'in_block_list';

  request_id?: string;

  /**
   * The silent verification specific properties.
   */
  silent?: VerificationCreateResponse.Silent;
}

export namespace VerificationCreateResponse {
  /**
   * The metadata for this verification.
   */
  export interface Metadata {
    correlation_id?: string;
  }

  /**
   * The silent verification specific properties.
   */
  export interface Silent {
    /**
     * The URL to start the silent verification towards.
     */
    request_url: string;
  }
}

export interface VerificationCheckResponse {
  /**
   * The status of the check.
   */
  status: 'success' | 'failure' | 'expired_or_not_found';

  /**
   * The verification identifier.
   */
  id?: string;

  /**
   * The metadata for this verification.
   */
  metadata?: VerificationCheckResponse.Metadata;

  request_id?: string;
}

export namespace VerificationCheckResponse {
  /**
   * The metadata for this verification.
   */
  export interface Metadata {
    correlation_id?: string;
  }
}

export interface VerificationCreateParams {
  /**
   * The verification target. Either a phone number or an email address. To use the
   * email verification feature contact us to discuss your use case.
   */
  target: VerificationCreateParams.Target;

  /**
   * The identifier of the dispatch that came from the front-end SDK.
   */
  dispatch_id?: string;

  /**
   * The metadata for this verification. This object will be returned with every
   * response or webhook sent that refers to this verification.
   */
  metadata?: VerificationCreateParams.Metadata;

  /**
   * Verification options
   */
  options?: VerificationCreateParams.Options;

  /**
   * The signals used for anti-fraud. For more details, refer to
   * [Signals](/verify/v2/documentation/prevent-fraud#signals).
   */
  signals?: VerificationCreateParams.Signals;
}

export namespace VerificationCreateParams {
  /**
   * The verification target. Either a phone number or an email address. To use the
   * email verification feature contact us to discuss your use case.
   */
  export interface Target {
    /**
     * The type of the target. Either "phone_number" or "email_address".
     */
    type: 'phone_number' | 'email_address';

    /**
     * An E.164 formatted phone number or an email address.
     */
    value: string;
  }

  /**
   * The metadata for this verification. This object will be returned with every
   * response or webhook sent that refers to this verification.
   */
  export interface Metadata {
    /**
     * A user-defined identifier to correlate this verification with.
     */
    correlation_id?: string;
  }

  /**
   * Verification options
   */
  export interface Options {
    /**
     * This allows you to automatically retrieve and fill the OTP code on mobile apps.
     * Currently only Android devices are supported.
     */
    app_realm?: Options.AppRealm;

    /**
     * The URL where webhooks will be sent when verification events occur, including
     * verification creation, attempt creation, and delivery status changes. For more
     * details, refer to [Webhook](/verify/v2/documentation/webhook).
     */
    callback_url?: string;

    /**
     * The size of the code generated. It should be between 4 and 8. Defaults to the
     * code size specified from the Dashboard.
     */
    code_size?: number;

    /**
     * The custom code to use for OTP verification. To use the custom code feature,
     * contact us to enable it for your account. For more details, refer to
     * [Custom Code](/verify/v2/documentation/custom-codes).
     */
    custom_code?: string;

    /**
     * A BCP-47 formatted locale string with the language the text message will be sent
     * to. If there's no locale set, the language will be determined by the country
     * code of the phone number. If the language specified doesn't exist, it defaults
     * to US English.
     */
    locale?: string;

    /**
     * The method used for verifying this phone number. The 'voice' option provides an
     * accessible alternative for visually impaired users by delivering the
     * verification code through a phone call rather than a text message. It also
     * allows verification of landline numbers that cannot receive SMS messages.
     */
    method?: 'auto' | 'voice';

    /**
     * The preferred channel to be used in priority for verification.
     */
    preferred_channel?: 'sms' | 'rcs' | 'whatsapp' | 'viber' | 'zalo' | 'telegram' | 'silent' | 'voice';

    /**
     * The Sender ID to use for this message. The Sender ID needs to be enabled by
     * Prelude.
     */
    sender_id?: string;

    /**
     * The identifier of a verification template. It applies use case-specific
     * settings, such as the message content or certain verification parameters.
     */
    template_id?: string;

    /**
     * The variables to be replaced in the template.
     */
    variables?: Record<string, string>;
  }

  export namespace Options {
    /**
     * This allows you to automatically retrieve and fill the OTP code on mobile apps.
     * Currently only Android devices are supported.
     */
    export interface AppRealm {
      /**
       * The platform the SMS will be sent to. We are currently only supporting
       * "android".
       */
      platform: 'android';

      /**
       * The Android SMS Retriever API hash code that identifies your app.
       */
      value: string;
    }
  }

  /**
   * The signals used for anti-fraud. For more details, refer to
   * [Signals](/verify/v2/documentation/prevent-fraud#signals).
   */
  export interface Signals {
    /**
     * The version of your application.
     */
    app_version?: string;

    /**
     * The unique identifier for the user's device. For Android, this corresponds to
     * the `ANDROID_ID` and for iOS, this corresponds to the `identifierForVendor`.
     */
    device_id?: string;

    /**
     * The model of the user's device.
     */
    device_model?: string;

    /**
     * The type of the user's device.
     */
    device_platform?: 'android' | 'ios' | 'ipados' | 'tvos' | 'web';

    /**
     * The IP address of the user's device.
     */
    ip?: string;

    /**
     * This signal should provide a higher level of trust, indicating that the user is
     * genuine. Contact us to discuss your use case. For more details, refer to
     * [Signals](/verify/v2/documentation/prevent-fraud#signals).
     */
    is_trusted_user?: boolean;

    /**
     * The version of the user's device operating system.
     */
    os_version?: string;

    /**
     * The user agent of the user's device. If the individual fields (os_version,
     * device_platform, device_model) are provided, we will prioritize those values
     * instead of parsing them from the user agent string.
     */
    user_agent?: string;
  }
}

export interface VerificationCheckParams {
  /**
   * The OTP code to validate.
   */
  code: string;

  /**
   * The verification target. Either a phone number or an email address. To use the
   * email verification feature contact us to discuss your use case.
   */
  target: VerificationCheckParams.Target;
}

export namespace VerificationCheckParams {
  /**
   * The verification target. Either a phone number or an email address. To use the
   * email verification feature contact us to discuss your use case.
   */
  export interface Target {
    /**
     * The type of the target. Either "phone_number" or "email_address".
     */
    type: 'phone_number' | 'email_address';

    /**
     * An E.164 formatted phone number or an email address.
     */
    value: string;
  }
}

export declare namespace Verification {
  export {
    type VerificationCreateResponse as VerificationCreateResponse,
    type VerificationCheckResponse as VerificationCheckResponse,
    type VerificationCreateParams as VerificationCreateParams,
    type VerificationCheckParams as VerificationCheckParams,
  };
}
