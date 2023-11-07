import { constants } from "@/config/constants";
import { ApiError } from "./api-error";
import { ErrorCode } from "@/types/error-code";

enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Patch = "PATCH",
  Put = "PUT",
  Delete = "DELETE",
}

// NOTE: This class is inteded to be used on the client only. Requests from the backend
// to third-party tools should be done using `fetch` directly or another kind of service.
class ApiServiceClass {
  private addedHeaders: Headers;

  constructor() {
    this.addedHeaders = new Headers();
  }

  // NOTE: `data` is of `any` type since it's most likely an instance of `Error` or
  // data that comes from the backend.
  _raiseError(data: any) {
    throw new ApiError({
      code: data?.code || ErrorCode.UNEXPECTED_ERROR,
      message: data?.message || "An unexpected error has occurred",
      errors: data?.errors,
    });
  }

  async _sendRequest(
    method: HttpMethod,
    path: string,
    config: RequestInit = {},
  ) {
    const updatedConfig = { ...config };
    updatedConfig.headers = { ...this.addedHeaders, ...(config.headers || {}) };
    const fullURL = `${constants.apiBaseURL}/${path}`;
    const response = await fetch(fullURL, {
      method,
      ...updatedConfig,
    });
    let data;
    try {
      data = await response.json();
    } catch (error) {
      this._raiseError(error);
    }
    if (!response.ok) {
      this._raiseError(data);
    }
    return data;
  }

  setHeaders(newHeaders: { [key: string]: string }) {
    Object.entries(newHeaders).forEach(([key, value]) =>
      this.addedHeaders.set(key, value),
    );
  }

  get(path: string, config: RequestInit = {}) {
    return this._sendRequest(HttpMethod.Get, path, config);
  }

  post(path: string, config: RequestInit = {}) {
    return this._sendRequest(HttpMethod.Post, path, config);
  }

  patch(path: string, config: RequestInit = {}) {
    return this._sendRequest(HttpMethod.Patch, path, config);
  }

  put(path: string, config: RequestInit = {}) {
    return this._sendRequest(HttpMethod.Put, path, config);
  }

  delete(path: string, config: RequestInit = {}) {
    return this._sendRequest(HttpMethod.Delete, path, config);
  }
}

const ApiService = new ApiServiceClass();

export { ApiService, HttpMethod };
