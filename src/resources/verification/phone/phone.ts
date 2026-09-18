// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as HistoryAPI from './history';
import {
  History,
  HistoryListParams,
  HistoryListResponse,
  HistoryRetrieveResponse,
  PhoneVerificationCarrier,
  PhoneVerificationMoney,
  PhoneVerificationPsd2Transaction,
} from './history';

export class Phone extends APIResource {
  history: HistoryAPI.History = new HistoryAPI.History(this._client);
}

Phone.History = History;

export declare namespace Phone {
  export {
    History as History,
    type PhoneVerificationCarrier as PhoneVerificationCarrier,
    type PhoneVerificationMoney as PhoneVerificationMoney,
    type PhoneVerificationPsd2Transaction as PhoneVerificationPsd2Transaction,
    type HistoryRetrieveResponse as HistoryRetrieveResponse,
    type HistoryListResponse as HistoryListResponse,
    type HistoryListParams as HistoryListParams,
  };
}
