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
  method: 'message';

  /**
   * The status of the verification.
   */
  status: 'success' | 'retry' | 'blocked';

  /**
   * The metadata for this verification.
   */
  metadata?: VerificationCreateResponse.Metadata;

  request_id?: string;
}

export namespace VerificationCreateResponse {
  /**
   * The metadata for this verification.
   */
  export interface Metadata {
    correlation_id?: string;
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
   * The target. Currently this can only be an E.164 formatted phone number.
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
   * The signals used for anti-fraud.
   */
  signals?: VerificationCreateParams.Signals;
}

export namespace VerificationCreateParams {
  /**
   * The target. Currently this can only be an E.164 formatted phone number.
   */
  export interface Target {
    /**
     * The type of the target. Currently this can only be "phone_number".
     */
    type: 'phone_number';

    /**
     * An E.164 formatted phone number to verify.
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
     * The size of the code generated. It should be between 4 and 8. Defaults to the
     * code size specified from the Dashboard.
     */
    code_size?: number;

    /**
     * The custom code to use for OTP verification. This feature is only available for
     * compatibility purposes and subject to Prelude’s approval. Contact us to discuss
     * your use case. For more details, refer to
     * [Multi Routing](/concepts/multi-routing).
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
     * The Sender ID to use for this message. The Sender ID needs to be enabled by
     * Prelude.
     */
    sender_id?: string;

    /**
     * The identifier of a verification settings template. It is used to be able to
     * switch behavior for specific use cases. Contact us if you need to use this
     * functionality.
     */
    template_id?: string;
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
   * The signals used for anti-fraud.
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
     * genuine. For more details, refer to [Signals](/guides/prevent-fraud#signals).
     */
    is_trusted_user?: boolean;

    /**
     * The version of the user's device operating system.
     */
    os_version?: string;
  }
}

export interface VerificationCheckParams {
  /**
   * The OTP code to validate.
   */
  code: string;

  /**
   * The target. Currently this can only be an E.164 formatted phone number.
   */
  target: VerificationCheckParams.Target;
}

export namespace VerificationCheckParams {
  /**
   * The target. Currently this can only be an E.164 formatted phone number.
   */
  export interface Target {
    /**
     * The type of the target. Currently this can only be "phone_number".
     */
    type: 'phone_number';

    /**
     * An E.164 formatted phone number to verify.
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
