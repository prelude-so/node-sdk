// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as KYCAPI from './kyc';
import { KYC, KYCMatchParams, KYCMatchResponse } from './kyc';

export class Intel extends APIResource {
  kyc: KYCAPI.KYC = new KYCAPI.KYC(this._client);
}

Intel.KYC = KYC;

export declare namespace Intel {
  export { KYC as KYC, type KYCMatchResponse as KYCMatchResponse, type KYCMatchParams as KYCMatchParams };
}
