// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

/**
 * Verify phone numbers.
 */
export class Verification extends APIResource {
  /**
   * Create a new verification for a specific phone number. If another non-expired
   * verification exists (the request is performed within the verification window),
   * this endpoint will perform a retry instead.
   *
   * @example
   * ```ts
   * const verification = await client.verification.create({
   *   target: { type: 'phone_number', value: '+30123456789' },
   * });
   * ```
   */
  create(
    body: VerificationCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VerificationCreateResponse> {
    return this._client.post('/v2/verification', { body, ...options });
  }

  /**
   * Check the validity of a verification code.
   *
   * @example
   * ```ts
   * const response = await client.verification.check({
   *   code: '12345',
   *   target: { type: 'phone_number', value: '+30123456789' },
   * });
   * ```
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
  method: 'email' | 'message' | 'silent' | 'voice';

  /**
   * The status of the verification.
   *
   * - `success` - A new verification window was created.
   * - `retry` - A new attempt was created for an existing verification window.
   * - `challenged` - The verification is suspicious and is restricted to non-SMS and
   *   non-voice channels only. This mode must be enabled for your customer account
   *   by Prelude support.
   * - `blocked` - The verification was blocked.
   * - `shadow_blocked` - The verification triggered a block rule but the decision
   *   was not enforced; this is used to dry-run anti-fraud configuration. This mode
   *   must be enabled for your customer account by Prelude support.
   */
  status: 'success' | 'retry' | 'challenged' | 'blocked' | 'shadow_blocked';

  /**
   * The ordered sequence of channels to be used for verification
   */
  channels?: Array<'rcs' | 'silent' | 'sms' | 'telegram' | 'viber' | 'voice' | 'whatsapp' | 'zalo'>;

  /**
   * The metadata for this verification.
   */
  metadata?: VerificationCreateResponse.Metadata;

  /**
   * The reason why the verification was blocked. Only present when status is
   * "blocked" or "shadow_blocked".
   *
   * - `expired_signature` - The signature of the SDK signals is expired. They should
   *   be sent within the hour following their collection.
   * - `in_block_list` - The phone number is part of the configured block list.
   * - `invalid_phone_line` - The phone number is not a valid line number (e.g.
   *   landline).
   * - `invalid_phone_number` - The phone number is not a valid phone number (e.g.
   *   unallocated range).
   * - `invalid_signature` - The signature of the SDK signals is invalid.
   * - `repeated_attempts` - The phone number has made too many verification
   *   attempts.
   * - `suspicious` - The verification attempt was deemed suspicious by the
   *   anti-fraud system.
   */
  reason?:
    | 'expired_signature'
    | 'in_block_list'
    | 'invalid_phone_line'
    | 'invalid_phone_number'
    | 'invalid_signature'
    | 'repeated_attempts'
    | 'suspicious';

  request_id?: string;

  /**
   * The risk factors that contributed to the verification being blocked. Only
   * present when status is "blocked" or "shadow_blocked" and the anti-fraud system
   * detected specific risk signals.
   *
   * - `behavioral_pattern` - The phone number past behavior during verification
   *   flows exhibits suspicious patterns.
   * - `device_attribute` - The device exhibits characteristics associated with
   *   suspicious activity patterns.
   * - `fraud_database` - The phone number has been flagged as suspicious in one or
   *   more of our fraud databases.
   * - `location_discrepancy` - The phone number prefix and IP address discrepancy
   *   indicates potential fraud.
   * - `network_fingerprint` - The network connection exhibits characteristics
   *   associated with suspicious activity patterns.
   * - `poor_conversion_history` - The phone number has a history of poorly
   *   converting to a verified phone number.
   * - `prefix_concentration` - The phone number is part of a range known to be
   *   associated with suspicious activity patterns.
   * - `suspected_request_tampering` - The SDK signature is invalid and the request
   *   is considered to be tampered with.
   * - `suspicious_ip_address` - The IP address is deemed to be associated with
   *   suspicious activity patterns.
   * - `temporary_phone_number` - The phone number is known to be a temporary or
   *   disposable number.
   */
  risk_factors?: Array<
    | 'behavioral_pattern'
    | 'device_attribute'
    | 'fraud_database'
    | 'location_discrepancy'
    | 'network_fingerprint'
    | 'poor_conversion_history'
    | 'prefix_concentration'
    | 'suspected_request_tampering'
    | 'suspicious_ip_address'
    | 'temporary_phone_number'
  >;

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
    /**
     * A user-defined identifier to correlate this verification with. It is returned in
     * the response and any webhook events that refer to this verification.
     */
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
   * The status of the check. For `prelude:psd2` codes, `transaction_missing` is
   * returned when the `psd2` block is omitted, and `transaction_mismatch` when the
   * submitted variables differ from those provided at issuance.
   */
  status: 'success' | 'failure' | 'expired_or_not_found' | 'transaction_missing' | 'transaction_mismatch';

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
    /**
     * A user-defined identifier to correlate this verification with. It is returned in
     * the response and any webhook events that refer to this verification.
     */
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
     * A user-defined identifier to correlate this verification with. It is returned in
     * the response and any webhook events that refer to this verification.
     */
    correlation_id?: string;
  }

  /**
   * Verification options
   */
  export interface Options {
    /**
     * This allows automatic OTP retrieval on mobile apps and web browsers. Supported
     * platforms are Android (SMS Retriever API) and Web (WebOTP API).
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
     * When `true`, the verification is routed through challenge-safe channels
     * (non-SMS/Voice) regardless of country eligibility or any antispam outcome. The
     * resulting verification has `status: "challenged"`. Use this when you have your
     * own signal that the request is suspicious and want stricter routing — the
     * verification is **not** classified as fraud and does not contribute to
     * anti-fraud counters or risk factors. This feature is disabled by default —
     * contact Prelude support to enable it on your account.
     */
    force_challenge?: boolean;

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
     * allows verification of landline numbers that cannot receive SMS messages. The
     * 'message' option explicitly requests message delivery (SMS, WhatsApp ...) and
     * skips silent verification, useful for scenarios requiring direct user
     * interaction.
     */
    method?: 'auto' | 'voice' | 'message';

    /**
     * The preferred channel to be used in priority for verification.
     */
    preferred_channel?: 'sms' | 'rcs' | 'whatsapp' | 'viber' | 'zalo' | 'telegram';

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
    variables?: { [key: string]: string };
  }

  export namespace Options {
    /**
     * This allows automatic OTP retrieval on mobile apps and web browsers. Supported
     * platforms are Android (SMS Retriever API) and Web (WebOTP API).
     */
    export interface AppRealm {
      /**
       * The platform for automatic OTP retrieval. Use "android" for the SMS Retriever
       * API or "web" for the WebOTP API.
       */
      platform: 'android' | 'web';

      /**
       * The value depends on the platform:
       *
       * - For Android: The SMS Retriever API hash code (11 characters). See
       *   [Google documentation](https://developers.google.com/identity/sms-retriever/verify#computing_your_apps_hash_string).
       * - For Web: The origin domain (e.g., "example.com" or "www.example.com"). See
       *   [WebOTP API documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebOTP_API).
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
     * A unique ID for the user's device. You should ensure that each user device has a
     * unique `device_id` value. Ideally, for Android, this corresponds to the
     * `ANDROID_ID` and for iOS, this corresponds to the `identifierForVendor`.
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
     * The public IP v4 or v6 address of the end-user's device. You should collect this
     * from your backend. If your backend is behind a proxy, use the `X-Forwarded-For`,
     * `Forwarded`, `True-Client-IP`, `CF-Connecting-IP` or an equivalent header to get
     * the actual public IP of the end-user's device.
     */
    ip?: string;

    /**
     * This signal should indicate a higher level of trust, explicitly stating that the
     * user is genuine. Contact us to discuss your use case. For more details, refer to
     * [Signals](/verify/v2/documentation/prevent-fraud#signals).
     */
    is_trusted_user?: boolean;

    /**
     * The JA4 fingerprint observed for the end-user's connection. Prelude will infer
     * it automatically when you use our Frontend SDKs (which use Prelude's edge
     * network), but you can also forward the value if you terminate TLS yourself.
     */
    ja4_fingerprint?: string;

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

  /**
   * Required when checking a code issued under the `prelude:psd2` template. The
   * submitted variables must match those provided at issuance; any mismatch
   * invalidates the code (PSD2 SCA RTS Article 5 dynamic linking). Ignored on
   * non-PSD2 verifications.
   */
  psd2?: VerificationCheckParams.Psd2;
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

  /**
   * Required when checking a code issued under the `prelude:psd2` template. The
   * submitted variables must match those provided at issuance; any mismatch
   * invalidates the code (PSD2 SCA RTS Article 5 dynamic linking). Ignored on
   * non-PSD2 verifications.
   */
  export interface Psd2 {
    /**
     * Decimal amount of the transaction.
     */
    amount: string;

    /**
     * ISO 4217 currency code.
     */
    currency: string;

    /**
     * Payee name displayed to the payer.
     */
    recipient: string;
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
