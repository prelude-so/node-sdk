// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import { Check, CheckCreateParams, CheckCreateResponse } from './resources/check';
import { Lookup, LookupRetrieveParams, LookupRetrieveResponse } from './resources/lookup';
import { Retry, RetryCreateParams, RetryCreateResponse } from './resources/retry';
import {
  Authentication,
  AuthenticationCreateParams,
  AuthenticationCreateResponse,
  AuthenticationRetrieveResponse,
} from './resources/authentication/authentication';

export interface ClientOptions {
  /**
   * Defaults to process.env['PRELUDE_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Defaults to process.env['PRELUDE_CUSTOMER_UUID'].
   */
  customerUuid?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['PRELUDE_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
}

/**
 * API Client for interfacing with the Prelude API.
 */
export class Prelude extends Core.APIClient {
  apiKey: string;
  customerUuid: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Prelude API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['PRELUDE_API_KEY'] ?? undefined]
   * @param {string | undefined} [opts.customerUuid=process.env['PRELUDE_CUSTOMER_UUID'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['PRELUDE_BASE_URL'] ?? https://api.ding.live/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('PRELUDE_BASE_URL'),
    apiKey = Core.readEnv('PRELUDE_API_KEY'),
    customerUuid = Core.readEnv('PRELUDE_CUSTOMER_UUID'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.PreludeError(
        "The PRELUDE_API_KEY environment variable is missing or empty; either provide it, or instantiate the Prelude client with an apiKey option, like new Prelude({ apiKey: 'My API Key' }).",
      );
    }
    if (customerUuid === undefined) {
      throw new Errors.PreludeError(
        "The PRELUDE_CUSTOMER_UUID environment variable is missing or empty; either provide it, or instantiate the Prelude client with an customerUuid option, like new Prelude({ customerUuid: 'My Customer Uuid' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      customerUuid,
      ...opts,
      baseURL: baseURL || `https://api.ding.live/v1`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
    this.customerUuid = customerUuid;
  }

  authentication: API.Authentication = new API.Authentication(this);
  check: API.Check = new API.Check(this);
  retry: API.Retry = new API.Retry(this);
  lookup: API.Lookup = new API.Lookup(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      CUSTOMER_UUID: this.customerUuid,
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { 'x-api-key': this.apiKey };
  }

  static Prelude = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static PreludeError = Errors.PreludeError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

export {
  PreludeError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

Prelude.Authentication = Authentication;
Prelude.Check = Check;
Prelude.Retry = Retry;
Prelude.Lookup = Lookup;

export declare namespace Prelude {
  export type RequestOptions = Core.RequestOptions;

  export {
    Authentication as Authentication,
    type AuthenticationCreateResponse as AuthenticationCreateResponse,
    type AuthenticationRetrieveResponse as AuthenticationRetrieveResponse,
    type AuthenticationCreateParams as AuthenticationCreateParams,
  };

  export {
    Check as Check,
    type CheckCreateResponse as CheckCreateResponse,
    type CheckCreateParams as CheckCreateParams,
  };

  export {
    Retry as Retry,
    type RetryCreateResponse as RetryCreateResponse,
    type RetryCreateParams as RetryCreateParams,
  };

  export {
    Lookup as Lookup,
    type LookupRetrieveResponse as LookupRetrieveResponse,
    type LookupRetrieveParams as LookupRetrieveParams,
  };
}

export default Prelude;
