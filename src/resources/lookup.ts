// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'prelude/core';
import { APIResource } from 'prelude/resource';
import * as LookupAPI from 'prelude/resources/lookup';

export class Lookup extends APIResource {
  /**
   * Perform a phone number lookup
   */
  retrieve(
    phoneNumber: string,
    params: LookupRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LookupRetrieveResponse> {
    const { 'customer-uuid': customerUuid } = params;
    return this._client.get(`/lookup/${phoneNumber}`, {
      ...options,
      headers: { 'customer-uuid': customerUuid, ...options?.headers },
    });
  }
}

export interface LookupRetrieveResponse {
  /**
   * The carrier of the phone number.
   */
  carrier?: string;

  /**
   * The ISO 3166-1 alpha-2 country code of the phone number.
   */
  country_code?: string;

  /**
   * The type of phone line.
   */
  line_type?:
    | 'FixedLine'
    | 'Mobile'
    | 'TollFree'
    | 'PremiumRate'
    | 'SharedCost'
    | 'Voip'
    | 'Pager'
    | 'VoiceMail'
    | 'UniversalAccess'
    | 'Service'
    | 'Unknown';

  /**
   * The mobile country code of the phone number.
   */
  mcc?: string;

  /**
   * The mobile network code of the phone number.
   */
  mnc?: string;

  /**
   * Whether the phone number has been ported.
   */
  number_ported?: boolean;

  /**
   * An E.164 formatted phone number.
   */
  phone_number?: string;
}

export interface LookupRetrieveParams {
  /**
   * Your customer UUID, which can be found in the API settings in the dashboard.
   */
  'customer-uuid': string;
}

export namespace Lookup {
  export import LookupRetrieveResponse = LookupAPI.LookupRetrieveResponse;
  export import LookupRetrieveParams = LookupAPI.LookupRetrieveParams;
}
