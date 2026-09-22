// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as Shared from '../shared';
import * as PhoneAPI from './phone/phone';
import { Phone } from './phone/phone';

/**
 * Verify phone numbers.
 */
export class Verification extends APIResource {
  phone: PhoneAPI.Phone = new PhoneAPI.Phone(this._client);

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
   * - `invalid_signature` - The SDK signature did not verify, so the request cannot
   *   be attributed to the device it claims to come from.
   * - `repeated_attempts` - The phone number exceeded the allowed number of
   *   verification attempts in a short period.
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
   * - `automation_signature` - The request appears to come from an automated client
   *   rather than a person.
   * - `carrier_not_permitted` - The destination carrier is one this account does not
   *   accept traffic for.
   * - `client_fingerprint_mismatch` - The client does not appear to be the platform
   *   it identifies itself as.
   * - `custom_policy` - A rule configured for your account matched this request.
   * - `device_emulator` - The request appears to come from an emulator rather than a
   *   physical device.
   * - `device_not_permitted` - The device platform is one your account blocks.
   * - `device_reuse` - One device is driving verifications for an unusual number of
   *   phone numbers.
   * - `expired_signals` - The SDK signals were collected too long before the request
   *   to still attest to it.
   * - `fraud_database` - The phone number is flagged in one or more of the fraud
   *   databases Prelude consults.
   * - `invalid_signature` - The SDK signature did not verify, so the request cannot
   *   be attributed to the device it claims to come from.
   * - `ip_concentration` - The request shares its origin with an unusual volume of
   *   other verifications.
   * - `ip_reputation` - The originating IP address is not trusted.
   * - `location_mismatch` - The network location and the phone number's country are
   *   inconsistent.
   * - `missing_signals` - The verification expected Prelude SDK signals and none
   *   arrived.
   * - `number_range_abuse` - The phone number belongs to a range currently
   *   associated with abuse.
   * - `poor_conversion_history` - Traffic resembling this request rarely completes a
   *   verification.
   * - `proxy_network` - The request did not arrive over the subscriber's own access
   *   network.
   * - `repeated_attempts` - The phone number exceeded the allowed number of
   *   verification attempts in a short period.
   * - `temporary_phone_number` - The phone number belongs to a disposable or
   *   short-lived numbering service.
   */
  risk_factors?: Array<
    | 'automation_signature'
    | 'carrier_not_permitted'
    | 'client_fingerprint_mismatch'
    | 'custom_policy'
    | 'device_emulator'
    | 'device_not_permitted'
    | 'device_reuse'
    | 'expired_signals'
    | 'fraud_database'
    | 'invalid_signature'
    | 'ip_concentration'
    | 'ip_reputation'
    | 'location_mismatch'
    | 'missing_signals'
    | 'number_range_abuse'
    | 'poor_conversion_history'
    | 'proxy_network'
    | 'repeated_attempts'
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
  target: Shared.Target;

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
  signals?: Shared.Signals;
}

export namespace VerificationCreateParams {
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
     * The channels this verification may use, in the order they are tried. Channels
     * you omit are never used, including on retries. This option can only be set when
     * the verification is created. The list is recorded on the verification and
     * applies for its whole lifecycle, so `channels` sent while retrying an existing
     * verification is ignored — unlike `preferred_channel`, which is honored on every
     * retry. Every channel you list must be enabled on your account and active in the
     * destination country, otherwise the request fails with
     * `channel_not_enabled_in_region`. Prelude still picks the best provider within
     * each channel. Cannot be combined with `preferred_channel`. Voice is requested
     * through `method` instead. Disabled by default — contact support to enable it.
     */
    channels?: Array<'sms' | 'rcs' | 'whatsapp' | 'viber' | 'zalo' | 'telegram'>;

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
     * Maximum number of delivery attempts Prelude may add on its own after the one you
     * requested. `0` means a single attempt: if it cannot be delivered, Prelude
     * neither tries another provider nor another channel, and does not retry
     * automatically. `1` allows one additional attempt, and so on — a value larger
     * than the number of routes available for the destination simply behaves like the
     * default. When omitted, Prelude retries as your account is configured, across as
     * many channels as the route offers.
     *
     * This option can only be set when the verification is created. The value is
     * recorded on the verification and applies for its whole lifecycle, so a
     * `max_auto_fallbacks` sent while retrying an existing verification is ignored —
     * the limit cannot be raised or lowered after the fact. A retry you ask for is not
     * an automatic attempt, so it gets a fresh allowance of the same limit. This
     * option is disabled by default — contact Prelude support to enable it on your
     * account.
     */
    max_auto_fallbacks?: number;

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
     * The channel to prioritize when delivering the verification. Prelude prioritizes
     * this channel on the first attempt and continues to prefer it on retries while an
     * untried route on that channel remains; once those are exhausted, retries fall
     * back to the next best available route. If the channel is unavailable (for
     * example, when a verification is challenged), Prelude uses the best available
     * route instead. Cannot be combined with `channels`.
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
  target: Shared.Target;

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

Verification.Phone = Phone;

export declare namespace Verification {
  export {
    type VerificationCreateResponse as VerificationCreateResponse,
    type VerificationCheckResponse as VerificationCheckResponse,
    type VerificationCreateParams as VerificationCreateParams,
    type VerificationCheckParams as VerificationCheckParams,
  };

  export { Phone as Phone };
}
