// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

/**
 * Retrieve detailed information about a phone number including carrier data, line type, and portability status.
 */
export class KYC extends APIResource {
  /**
   * Verify identity attributes against the subscriber record held by the end-user's
   * mobile operator. Send a phone number along with the attributes to check; Prelude
   * resolves the operator internally and returns a per-attribute match. Currently
   * available for France only (Orange, SFR, Bouygues) and must be enabled for your
   * account.
   *
   * @example
   * ```ts
   * const response = await client.intel.kyc.match(
   *   '+12065550100',
   * );
   * ```
   */
  match(
    phone: string,
    body: KYCMatchParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<KYCMatchResponse> {
    return this._client.post(`/v2/intel/kyc/match/${phone}`, { body, ...options });
  }
}

/**
 * The per-attribute match result. Each `<attribute>_match` field is one of `true`,
 * `false`, or `not_available` (the operator could not answer for that attribute).
 * Fuzzy attributes additionally return a `<attribute>_match_score` (0-99
 * similarity) when they do not match exactly; the score is omitted on a match or
 * when `not_available`.
 */
export interface KYCMatchResponse {
  /**
   * Whether the street address matched the operator's record.
   */
  address_match?: 'true' | 'false' | 'not_available';

  /**
   * Similarity score (0-99) for the address. Returned only on a non-match.
   */
  address_match_score?: number;

  /**
   * Whether the date of birth matched the operator's record. Compared exactly; never
   * scored.
   */
  birthdate_match?: 'true' | 'false' | 'not_available';

  /**
   * The country code of the phone number.
   */
  country_code?: string;

  /**
   * Whether the country matched the operator's record. Compared exactly; never
   * scored.
   */
  country_match?: 'true' | 'false' | 'not_available';

  /**
   * Whether the email address matched the operator's record.
   */
  email_match?: 'true' | 'false' | 'not_available';

  /**
   * Similarity score (0-99) for the email. Returned only on a non-match.
   */
  email_match_score?: number;

  /**
   * Whether the family name matched the operator's record.
   */
  family_name_match?: 'true' | 'false' | 'not_available';

  /**
   * Similarity score (0-99) for the family name. Returned only on a non-match.
   */
  family_name_match_score?: number;

  /**
   * Whether the given name matched the operator's record.
   */
  given_name_match?: 'true' | 'false' | 'not_available';

  /**
   * Similarity score (0-99) for the given name. Returned only on a non-match.
   */
  given_name_match_score?: number;

  /**
   * Whether the locality matched the operator's record.
   */
  locality_match?: 'true' | 'false' | 'not_available';

  /**
   * Similarity score (0-99) for the locality. Returned only on a non-match.
   */
  locality_match_score?: number;

  /**
   * The mobile operator that answered the match.
   */
  operator?: string;

  /**
   * The phone number that was matched, in E.164 format.
   */
  phone_number?: string;

  /**
   * Whether the postal code matched the operator's record. Compared exactly; never
   * scored.
   */
  postal_code_match?: 'true' | 'false' | 'not_available';

  /**
   * Whether the region matched the operator's record.
   */
  region_match?: 'true' | 'false' | 'not_available';

  /**
   * Similarity score (0-99) for the region. Returned only on a non-match.
   */
  region_match_score?: number;

  /**
   * A string that identifies this specific request. Report it back to us to help us
   * diagnose your issues.
   */
  request_id?: string;
}

export interface KYCMatchParams {
  /**
   * The street address.
   */
  address?: string;

  /**
   * The date of birth in ISO 8601 (`YYYY-MM-DD`) format. Compared exactly.
   */
  birthdate?: string;

  /**
   * The ISO 3166-1 alpha-2 country code. Compared exactly.
   */
  country?: string;

  /**
   * The email address.
   */
  email?: string;

  /**
   * The end-user's family (last) name.
   */
  family_name?: string;

  /**
   * The end-user's given (first) name.
   */
  given_name?: string;

  /**
   * The locality (city).
   */
  locality?: string;

  /**
   * The postal code. Compared exactly.
   */
  postal_code?: string;

  /**
   * The region, state, or province.
   */
  region?: string;
}

export declare namespace KYC {
  export { type KYCMatchResponse as KYCMatchResponse, type KYCMatchParams as KYCMatchParams };
}
