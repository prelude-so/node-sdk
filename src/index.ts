// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import { Transactional, TransactionalSendParams, TransactionalSendResponse } from './resources/transactional';
import {
  Verification,
  VerificationCheckParams,
  VerificationCheckResponse,
  VerificationCreateParams,
  VerificationCreateResponse,
} from './resources/verification';
import {
  Watch,
  WatchFeedBackParams,
  WatchFeedBackResponse,
  WatchPredictParams,
  WatchPredictResponse,
} from './resources/watch';

export interface ClientOptions {
  /**
   * Bearer token for authorizing API requests.
   */
  apiToken?: string | undefined;

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
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

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
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

/**
 * API Client for interfacing with the Prelude API.
 */
export class Prelude extends Core.APIClient {
  apiToken: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Prelude API.
   *
   * @param {string | undefined} [opts.apiToken=process.env['API_TOKEN'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['PRELUDE_BASE_URL'] ?? https://api.prelude.dev] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('PRELUDE_BASE_URL'),
    apiToken = Core.readEnv('API_TOKEN'),
    ...opts
  }: ClientOptions = {}) {
    if (apiToken === undefined) {
      throw new Errors.PreludeError(
        "The API_TOKEN environment variable is missing or empty; either provide it, or instantiate the Prelude client with an apiToken option, like new Prelude({ apiToken: 'My API Token' }).",
      );
    }

    const options: ClientOptions = {
      apiToken,
      ...opts,
      baseURL: baseURL || `https://api.prelude.dev`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiToken = apiToken;
  }

  transactional: API.Transactional = new API.Transactional(this);
  verification: API.Verification = new API.Verification(this);
  watch: API.Watch = new API.Watch(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: `Bearer ${this.apiToken}` };
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

Prelude.Transactional = Transactional;
Prelude.Verification = Verification;
Prelude.Watch = Watch;
export declare namespace Prelude {
  export type RequestOptions = Core.RequestOptions;

  export {
    Transactional as Transactional,
    type TransactionalSendResponse as TransactionalSendResponse,
    type TransactionalSendParams as TransactionalSendParams,
  };

  export {
    Verification as Verification,
    type VerificationCreateResponse as VerificationCreateResponse,
    type VerificationCheckResponse as VerificationCheckResponse,
    type VerificationCreateParams as VerificationCreateParams,
    type VerificationCheckParams as VerificationCheckParams,
  };

  export {
    Watch as Watch,
    type WatchFeedBackResponse as WatchFeedBackResponse,
    type WatchPredictResponse as WatchPredictResponse,
    type WatchFeedBackParams as WatchFeedBackParams,
    type WatchPredictParams as WatchPredictParams,
  };
}

export { toFile, fileFromPath } from './uploads';
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

export default Prelude;
