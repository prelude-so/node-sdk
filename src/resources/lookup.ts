// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Lookup extends APIResource {
  /**
   * Retrieve detailed information about a phone number including carrier data, line
   * type, and portability status.
   */
  lookup(
    phoneNumber: string,
    query?: LookupLookupParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LookupLookupResponse>;
  lookup(phoneNumber: string, options?: Core.RequestOptions): Core.APIPromise<LookupLookupResponse>;
  lookup(
    phoneNumber: string,
    query: LookupLookupParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<LookupLookupResponse> {
    if (isRequestOptions(query)) {
      return this.lookup(phoneNumber, {}, query);
    }
    return this._client.get(`/v2/lookup/${phoneNumber}`, { query, ...options });
  }
}

export interface LookupLookupResponse {
  /**
   * The CNAM (Caller ID Name) associated with the phone number. Contact us if you
   * need to use this functionality. Once enabled, put `cnam` option to `type` query
   * parameter.
   */
  caller_name?: string;

  /**
   * The country code of the phone number.
   */
  country_code?: string;

  /**
   * A list of flags associated with the phone number.
   *
   * - `ported` - Indicates the phone number has been transferred from one carrier to
   *   another.
   * - `temporary` - Indicates the phone number is likely a temporary or virtual
   *   number, often used for verification services or burner phones.
   */
  flags?: Array<'ported' | 'temporary'>;

  /**
   * The type of phone line.
   *
   * - `calling_cards` - Numbers that are associated with providers of pre-paid
   *   domestic and international calling cards.
   * - `fixed_line` - Landline phone numbers.
   * - `isp` - Numbers reserved for Internet Service Providers.
   * - `local_rate` - Numbers that can be assigned non-geographically.
   * - `mobile` - Mobile phone numbers.
   * - `other` - Other types of services.
   * - `pager` - Number ranges specifically allocated to paging devices.
   * - `payphone` - Allocated numbers for payphone kiosks in some countries.
   * - `premium_rate` - Landline numbers where the calling party pays more than
   *   standard.
   * - `satellite` - Satellite phone numbers.
   * - `service` - Automated applications.
   * - `shared_cost` - Specific landline ranges where the cost of making the call is
   *   shared between the calling and called party.
   * - `short_codes_commercial` - Short codes are memorable, easy-to-use numbers,
   *   like the UK's NHS 111, often sold to businesses. Not available in all
   *   countries.
   * - `toll_free` - Number where the called party pays for the cost of the call not
   *   the calling party.
   * - `universal_access` - Number ranges reserved for Universal Access initiatives.
   * - `unknown` - Unknown phone number type.
   * - `vpn` - Numbers are used exclusively within a private telecommunications
   *   network, connecting the operator's terminals internally and not accessible via
   *   the public telephone network.
   * - `voice_mail` - A specific category of Interactive Voice Response (IVR)
   *   services.
   * - `voip` - Specific ranges for providers of VoIP services to allow incoming
   *   calls from the regular telephony network.
   */
  line_type?:
    | 'calling_cards'
    | 'fixed_line'
    | 'isp'
    | 'local_rate'
    | 'mobile'
    | 'other'
    | 'pager'
    | 'payphone'
    | 'premium_rate'
    | 'satellite'
    | 'service'
    | 'shared_cost'
    | 'short_codes_commercial'
    | 'toll_free'
    | 'universal_access'
    | 'unknown'
    | 'vpn'
    | 'voice_mail'
    | 'voip';

  /**
   * The current carrier information.
   */
  network_info?: LookupLookupResponse.NetworkInfo;

  /**
   * The original carrier information.
   */
  original_network_info?: LookupLookupResponse.OriginalNetworkInfo;

  /**
   * The phone number.
   */
  phone_number?: string;
}

export namespace LookupLookupResponse {
  /**
   * The current carrier information.
   */
  export interface NetworkInfo {
    /**
     * The name of the carrier.
     */
    carrier_name?: string;

    /**
     * Mobile Country Code.
     */
    mcc?: string;

    /**
     * Mobile Network Code.
     */
    mnc?: string;
  }

  /**
   * The original carrier information.
   */
  export interface OriginalNetworkInfo {
    /**
     * The name of the original carrier.
     */
    carrier_name?: string;

    /**
     * Mobile Country Code.
     */
    mcc?: string;

    /**
     * Mobile Network Code.
     */
    mnc?: string;
  }
}

export interface LookupLookupParams {
  /**
   * Optional features. Possible values are:
   *
   * - `cnam` - Retrieve CNAM (Caller ID Name) along with other information. Contact
   *   us if you need to use this functionality.
   */
  type?: Array<'cnam'>;
}

export declare namespace Lookup {
  export { type LookupLookupResponse as LookupLookupResponse, type LookupLookupParams as LookupLookupParams };
}
