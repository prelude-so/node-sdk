// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as HistoryAPI from './history';

/**
 * Verify phone numbers.
 */
export class History extends APIResource {
  /**
   * Retrieve everything Prelude recorded for one phone verification: its outcome and
   * the device, network and anti-fraud context it was created in, the chronological
   * timeline of every message attempt and code check, and the anti-fraud signals you
   * forwarded.
   *
   * The identifier is the `id` returned by
   * [Create or retry a verification](/verify/v2/api-reference/create-or-retry-a-verification)
   * or the `verification_id` of the verification webhooks. Both `lifecycle` and
   * `signals` are optional: a verification can resolve with its top-level fields
   * alone.
   *
   * @example
   * ```ts
   * const history =
   *   await client.verification.phone.history.retrieve(
   *     'vrf_01jc0t6fwwfgfsq1md24mhyztj',
   *   );
   * ```
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<HistoryRetrieveResponse> {
    return this._client.get(`/v2/verification/phone/history/${id}`, options);
  }

  /**
   * List your phone verifications, most recent first, one entry per verification
   * with its outcome, channels, attempts and cost. Every filter is optional and they
   * combine with AND.
   *
   * Use it to find every verification a phone number went through from your support
   * tooling, then
   * [Get a phone verification](/verify/v2/api-reference/history/get-a-phone-verification)
   * for the full timeline of one of them. A cursor is bound to the filters that
   * produced it: pass `next_cursor` back with the exact same query parameters.
   *
   * @example
   * ```ts
   * const histories =
   *   await client.verification.phone.history.list();
   * ```
   */
  list(query?: HistoryListParams, options?: Core.RequestOptions): Core.APIPromise<HistoryListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<HistoryListResponse>;
  list(
    query: HistoryListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<HistoryListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v2/verification/phone/history', { query, ...options });
  }
}

/**
 * The end user's mobile network.
 */
export interface PhoneVerificationCarrier {
  mccmnc: string;

  name?: string;
}

export interface PhoneVerificationMoney {
  /**
   * Exact decimal amount. It is never rounded to the currency's minor units, so a
   * sub-cent cost reads as `0.0004` rather than as `0.00`.
   */
  amount: string;

  /**
   * ISO 4217 currency code.
   */
  currency: string;
}

export interface PhoneVerificationPsd2Transaction {
  amount?: PhoneVerificationMoney;

  /**
   * Payee name displayed to the payer.
   */
  recipient?: string;
}

/**
 * A verification and everything Prelude recorded about it.
 */
export interface HistoryRetrieveResponse {
  /**
   * The verification identifier.
   */
  id: string;

  created_at: string;

  expires_at: string;

  /**
   * The E.164 phone number the verification targeted.
   */
  phone_number: string;

  /**
   * The outcome of the verification.
   *
   * - `converted` - The end user submitted a valid code.
   * - `not_converted` - The verification expired without a valid code.
   * - `pending_check` - A code was delivered and Prelude is still waiting for a
   *   check.
   * - `sent` - A code was sent and the verification window is still open.
   * - `challenged` - The verification was restricted to non-SMS and non-voice
   *   channels.
   * - `suspected_fraud` - The anti-fraud system blocked the verification.
   * - `in_blocklist` - The phone number is on the configured block list.
   * - `invalid_line` - The phone number is not a valid line type.
   * - `invalid_number` - The phone number is not a valid number.
   * - `rate_limited` - The verification was refused by a rate limit.
   * - `expired_signals` - The SDK signals were collected too long before the
   *   request.
   * - `shadowed` - The anti-fraud system flagged the verification without blocking
   *   it.
   */
  status:
    | 'converted'
    | 'not_converted'
    | 'pending_check'
    | 'sent'
    | 'challenged'
    | 'suspected_fraud'
    | 'in_blocklist'
    | 'invalid_line'
    | 'invalid_number'
    | 'rate_limited'
    | 'expired_signals'
    | 'shadowed';

  /**
   * Version of your application, when known.
   */
  app_version?: string;

  /**
   * Why the anti-fraud system blocked the verification. Empty unless it did.
   *
   * - `behavioral_pattern` - The phone number past behavior during verification
   *   flows exhibits suspicious patterns.
   * - `device_attribute` - The end-user device reported attributes associated with
   *   fraud or emulation.
   * - `fraud_database` - The phone number appears in a fraud database.
   * - `location_discrepancy` - The phone number region and the observed location
   *   disagree.
   * - `missing_signals` - The verification expected Prelude SDK signals and none
   *   arrived.
   * - `network_fingerprint` - The network fingerprint matches known fraudulent
   *   traffic.
   * - `poor_conversion_history` - The phone number rarely completes the
   *   verifications it starts.
   * - `prefix_concentration` - The phone number is part of a range known to be
   *   associated with suspicious activity patterns.
   * - `repeated_number` - The phone number was used far more often than normal
   *   traffic would explain.
   * - `suspected_request_tampering` - The SDK signals were altered or expired
   *   between collection and use.
   * - `suspicious_ip_address` - The originating IP address is associated with
   *   suspicious activity.
   * - `temporary_phone_number` - The phone number is known to be a temporary or
   *   disposable number.
   */
  block_reasons?: Array<
    | 'behavioral_pattern'
    | 'device_attribute'
    | 'fraud_database'
    | 'location_discrepancy'
    | 'missing_signals'
    | 'network_fingerprint'
    | 'poor_conversion_history'
    | 'prefix_concentration'
    | 'repeated_number'
    | 'suspected_request_tampering'
    | 'suspicious_ip_address'
    | 'temporary_phone_number'
  >;

  /**
   * The end user's mobile network.
   */
  carrier?: PhoneVerificationCarrier;

  /**
   * The correlation identifier you supplied when creating the verification.
   */
  correlation_id?: string;

  /**
   * Model of the end-user device, when known.
   */
  device_model?: string;

  /**
   * Platform of the end-user device, when known.
   */
  device_platform?: 'android' | 'ios' | 'ipados' | 'tvos' | 'web';

  /**
   * IP address the verification was created from.
   */
  ip_address?: string;

  /**
   * ISO 3166-1 alpha-2 region of the caller's IP address.
   */
  ip_address_region?: string;

  /**
   * Distance between the phone number region and the IP location.
   */
  ip_distance_meters?: number;

  /**
   * Chronological timeline of the verification: creation, message attempts with
   * delivery events, code checks and signals reception. Omitted when Prelude holds
   * no timeline for the verification.
   */
  lifecycle?: HistoryRetrieveResponse.Lifecycle;

  /**
   * Whether the phone number was allow-listed, block-listed, or sandboxed at
   * verification time.
   */
  phone_number_condition?: 'allow_listed' | 'block_listed' | 'sandboxed';

  /**
   * Whether the phone number is currently allow-listed, block-listed, or sandboxed.
   */
  phone_number_current_condition?: 'allow_listed' | 'block_listed' | 'sandboxed';

  /**
   * ISO 3166-1 alpha-2 region of the phone number.
   */
  phone_number_region?: string;

  /**
   * The anti-fraud signals you forwarded when creating the verification.
   */
  signals?: HistoryRetrieveResponse.Signals;

  /**
   * Whether the SDK signals integrity check passed.
   */
  signals_hash_status?: 'valid' | 'invalid';

  /**
   * The template used for this verification.
   */
  template_id?: string;
}

export namespace HistoryRetrieveResponse {
  /**
   * Chronological timeline of the verification: creation, message attempts with
   * delivery events, code checks and signals reception. Omitted when Prelude holds
   * no timeline for the verification.
   */
  export interface Lifecycle {
    events: Array<Lifecycle.Event>;

    total_cost?: HistoryAPI.PhoneVerificationMoney;

    /**
     * How many times the message was reported undeliverable by independent routes.
     * Above zero usually means the phone number is incorrect or the device
     * unreachable.
     */
    undeliverable_route_count?: number;
  }

  export namespace Lifecycle {
    /**
     * One timeline entry. `type` names the single payload field that is set.
     */
    export interface Event {
      type: 'create' | 'attempt' | 'check' | 'signals';

      /**
       * One message sent for this verification.
       */
      attempt?: Event.Attempt;

      /**
       * One code submission for this verification.
       */
      check?: Event.Check;

      create?: Event.Create;

      signals?: Event.Signals;
    }

    export namespace Event {
      /**
       * One message sent for this verification.
       */
      export interface Attempt {
        id: string;

        created_at: string;

        /**
         * The end user's mobile network.
         */
        carrier?: HistoryAPI.PhoneVerificationCarrier;

        channel?: 'sms' | 'rcs' | 'whatsapp' | 'viber' | 'zalo' | 'telegram' | 'voice' | 'silent';

        /**
         * Message body. While the verification can still be completed, the code inside it
         * is masked rather than removed.
         */
        content?: string;

        cost?: HistoryAPI.PhoneVerificationMoney;

        delivery_events?: Array<Attempt.DeliveryEvent>;

        delivery_status?: 'unknown' | 'in_transit' | 'delivered' | 'undeliverable' | 'read';

        /**
         * Channel you asked for, when it differs from the one used.
         */
        preferred_channel?: 'sms' | 'rcs' | 'whatsapp' | 'viber' | 'zalo' | 'telegram' | 'voice' | 'silent';

        status?: 'succeeded' | 'failed';

        /**
         * What caused the attempt.
         */
        trigger?: 'initial' | 'auto_retry' | 'user_retry';
      }

      export namespace Attempt {
        export interface DeliveryEvent {
          received_at: string;

          /**
           * The state this event reported. It is finer-grained than the attempt's
           * `delivery_status` and includes the states a silent verification goes through.
           */
          status:
            | 'unknown'
            | 'submitted'
            | 'in_transit'
            | 'delivered'
            | 'undeliverable'
            | 'expired'
            | 'read'
            | 'silent_started'
            | 'silent_verified'
            | 'silent_mismatch';
        }
      }

      /**
       * One code submission for this verification.
       */
      export interface Check {
        created_at: string;

        is_valid: boolean;

        channel?: 'sms' | 'rcs' | 'whatsapp' | 'viber' | 'zalo' | 'telegram' | 'voice' | 'silent';

        /**
         * Present on checks against a `prelude:psd2` code.
         */
        psd2_info?: Check.Psd2Info;

        /**
         * Why an invalid check failed, when known.
         */
        status_detail?:
          | 'expired_attempt'
          | 'expired_auth'
          | 'rate_limited'
          | 'transaction_missing'
          | 'transaction_mismatch';

        /**
         * The submitted code. Absent while the verification can still be completed, so
         * that a check in flight cannot be read back through this endpoint, and absent on
         * silent verification checks, which carry no code.
         */
        value?: string;
      }

      export namespace Check {
        /**
         * Present on checks against a `prelude:psd2` code.
         */
        export interface Psd2Info {
          /**
           * The transaction submitted when the code was issued.
           */
          expected_transaction?: HistoryAPI.PhoneVerificationPsd2Transaction;

          /**
           * The transaction submitted with this check. Differs from `expected_transaction`
           * when `status_detail` is `transaction_mismatch`.
           */
          received_transaction?: HistoryAPI.PhoneVerificationPsd2Transaction;
        }
      }

      export interface Create {
        created_at: string;

        cost?: HistoryAPI.PhoneVerificationMoney;
      }

      export interface Signals {
        received_at: string;

        expired_at?: string;

        status?: 'valid' | 'invalid';
      }
    }
  }

  /**
   * The anti-fraud signals you forwarded when creating the verification.
   */
  export interface Signals {
    /**
     * Whether you flagged this end user as trusted when creating the verification.
     * Declared by you, not computed by Prelude.
     */
    is_trusted_user: boolean;

    /**
     * End-user device identifier you forwarded.
     */
    device_id?: string;

    /**
     * TLS fingerprint you forwarded.
     */
    ja4_fingerprint?: string;

    os_version?: string;

    user_agent?: string;
  }
}

export interface HistoryListResponse {
  /**
   * The page of verifications, most recent first.
   */
  verifications: Array<HistoryListResponse.Verification>;

  /**
   * Pagination cursor for the next page of results. Omitted if there are no more
   * pages.
   */
  next_cursor?: string;
}

export namespace HistoryListResponse {
  /**
   * One entry of the verification history.
   * [Get a phone verification](/verify/v2/api-reference/history/get-a-phone-verification)
   * returns the full record.
   */
  export interface Verification {
    /**
     * The verification identifier.
     */
    id: string;

    /**
     * The channels the verification could use, and which one the end user converted
     * through. Empty when the verification used only channels this API does not list.
     */
    channels: Array<Verification.Channel>;

    created_at: string;

    /**
     * Whether at least one message was reported delivered.
     */
    delivered: boolean;

    /**
     * The E.164 phone number the verification targeted.
     */
    phone_number: string;

    /**
     * The outcome of the verification.
     *
     * - `converted` - The end user submitted a valid code.
     * - `not_converted` - The verification expired without a valid code.
     * - `pending_check` - A code was delivered and Prelude is still waiting for a
     *   check.
     * - `sent` - A code was sent and the verification window is still open.
     * - `challenged` - The verification was restricted to non-SMS and non-voice
     *   channels.
     * - `suspected_fraud` - The anti-fraud system blocked the verification.
     * - `in_blocklist` - The phone number is on the configured block list.
     * - `invalid_line` - The phone number is not a valid line type.
     * - `invalid_number` - The phone number is not a valid number.
     * - `rate_limited` - The verification was refused by a rate limit.
     * - `expired_signals` - The SDK signals were collected too long before the
     *   request.
     * - `shadowed` - The anti-fraud system flagged the verification without blocking
     *   it.
     */
    status:
      | 'converted'
      | 'not_converted'
      | 'pending_check'
      | 'sent'
      | 'challenged'
      | 'suspected_fraud'
      | 'in_blocklist'
      | 'invalid_line'
      | 'invalid_number'
      | 'rate_limited'
      | 'expired_signals'
      | 'shadowed';

    /**
     * Number of messages sent for the verification, `0` when none was. Absent for
     * sandboxed phone numbers.
     */
    attempts?: number;

    /**
     * When the end user submitted a valid code. Absent unless the verification
     * converted.
     */
    converted_at?: string;

    /**
     * Total cost of the verification. Absent when nothing was billed.
     */
    cost?: HistoryAPI.PhoneVerificationMoney;

    /**
     * Platform of the end-user device, when known.
     */
    device_platform?: 'android' | 'ios' | 'ipados' | 'tvos' | 'web';

    /**
     * Whether the phone number was allow-listed, block-listed, or sandboxed at
     * verification time.
     */
    phone_number_condition?: 'allow_listed' | 'block_listed' | 'sandboxed';

    /**
     * Whether the SDK signals integrity check passed.
     */
    signals_hash_status?: 'valid' | 'invalid';
  }

  export namespace Verification {
    export interface Channel {
      channel: 'sms' | 'rcs' | 'whatsapp' | 'viber' | 'zalo' | 'telegram' | 'voice' | 'silent';

      /**
       * Whether the end user submitted a valid code received through this channel.
       */
      converted: boolean;
    }
  }
}

export interface HistoryListParams {
  /**
   * Only verifications that could use one of these channels. Repeat the parameter
   * for several values.
   */
  channels?: Array<'sms' | 'rcs' | 'whatsapp' | 'viber' | 'zalo' | 'telegram' | 'voice' | 'silent'>;

  /**
   * Pagination cursor from the previous response.
   */
  cursor?: string;

  /**
   * Only verifications created from this device platform.
   */
  device_platform?: 'android' | 'ios' | 'ipados' | 'tvos' | 'web';

  /**
   * Only verifications created at or after this RFC 3339 timestamp. Goes with `to`,
   * at most 6 months apart. Without them the whole history is searched.
   */
  from?: string;

  /**
   * Maximum number of verifications to return per page.
   */
  limit?: number;

  /**
   * Only verifications that sent at most this many messages. `0` keeps the
   * verifications that never sent one.
   */
  max_attempts?: number;

  /**
   * Only verifications that sent at least this many messages.
   */
  min_attempts?: number;

  /**
   * Only verifications targeting this E.164 phone number. The leading `+` may be
   * omitted.
   */
  phone_number?: string;

  /**
   * Only verifications of phone numbers from this region, as an ISO 3166-1 alpha-2
   * code.
   */
  region?: string;

  /**
   * Only verifications in this status. `pending_check` cannot be filtered on.
   */
  status?:
    | 'converted'
    | 'not_converted'
    | 'pending_check'
    | 'sent'
    | 'challenged'
    | 'suspected_fraud'
    | 'in_blocklist'
    | 'invalid_line'
    | 'invalid_number'
    | 'rate_limited'
    | 'expired_signals'
    | 'shadowed';

  /**
   * Only verifications sent with this template, as returned in `template_id` by
   * [Get a phone verification](/verify/v2/api-reference/history/get-a-phone-verification).
   * Built-in templates (`prelude:*`) cannot be filtered on.
   */
  template_id?: string;

  /**
   * Only verifications created at or before this RFC 3339 timestamp. Goes with
   * `from`.
   */
  to?: string;
}

export declare namespace History {
  export {
    type PhoneVerificationCarrier as PhoneVerificationCarrier,
    type PhoneVerificationMoney as PhoneVerificationMoney,
    type PhoneVerificationPsd2Transaction as PhoneVerificationPsd2Transaction,
    type HistoryRetrieveResponse as HistoryRetrieveResponse,
    type HistoryListResponse as HistoryListResponse,
    type HistoryListParams as HistoryListParams,
  };
}
