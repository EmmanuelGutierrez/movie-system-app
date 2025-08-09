/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserDto {
  name: string;
  lastName: string;
  /** @format email */
  email: string;
  /** @minLength 8 */
  password: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Person {
  id: number;
  name: string;
}

export interface File {
  id: number;
  asset_id?: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes: number;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  movie: Movie;
  createdAt: number;
  updatedAt: number;
}

export interface Movie {
  id: number;
  name: string;
  trailer_youtube_id: string;
  description: string;
  genres: Genre[];
  actors?: Person[];
  directors?: Person[];
  duration: number;
  release: number;
  poster?: File;
  photos?: File[];
  screenings?: Screening[];
  active: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Seat {
  id: number;
  row: number;
  number: number;
  theater: Theater;
  seatReservations: SeatReservation[];
}

export interface Cinema {
  id: number;
  name: string;
  location: string;
  description: string;
  theaters: Theater[];
  createdAt: number;
  updatedAt: number;
}

export interface Theater {
  id: number;
  name: string;
  feature: string;
  rows: number;
  seatsPerRow: number;
  seats: Seat[];
  cinema: Cinema;
  screenings: Screening[];
  createdAt: number;
  updatedAt: number;
}

export interface Screening {
  id: number;
  startTime: number;
  endTime: number;
  price: number;
  active: boolean;
  movie: Movie;
  theater: Theater;
  seatReservations: SeatReservation[];
  createdAt: number;
  updatedAt: number;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string | null;
  lastName: string | null;
  role: UserRoleEnum;
  lastLoginAt?: number | null;
  createdAt: number;
  updatedAt: number;
  seatReservations: SeatReservation[];
}

export interface SeatReservation {
  id: number;
  status: SeatReservationStatusEnum;
  screening: Screening;
  seat: Seat;
  user: User;
  createdAt: number;
  updatedAt: number;
}

export interface CreateCinemaDto {
  name: string;
  description: string;
  location: string;
}

export interface PaginatedResponseDto {
  data: any[][];
  page: number;
  total: number;
  inThisPage: number;
}

export interface UpdateCinemaDto {
  name?: string;
  description?: string;
  location?: string;
}

export type CreateInvoiceDto = object;

export type UpdateInvoiceDto = object;

export interface CreateMoviePhotosDto {
  name: string;
  trailer_url: string;
  description: string;
  duration: number;
  release: number;
  directors?: string[];
  actors?: string[];
  genres?: number[];
}

export interface CreateGenreDto {
  name: string;
}

export interface UpdateGenreDto {
  name?: string;
}

export interface CreateScreeningDto {
  name: string;
  movieId: number;
  theaterId: number;
  price: number;
  startTime: number;
}

export interface SeatPosition {
  row: number;
  number: number;
}

export interface UpdateSeatDto {
  /** @minItems 1 */
  seatsPosition: SeatPosition[];
  screeningId: number;
  status: UpdateSeatDtoStatusEnum;
}

export interface SeatReserveDto {
  /** @minItems 1 */
  seatReserve: SeatReservation[];
  screeningId: number;
  temporalTransactionId: string;
}

export interface CreateTheaterDto {
  name: string;
  cinemaId: number;
  rows: number;
  seatsPerRow: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  /**
   * token
   * @example "a1b2c3d4e5"
   */
  token: string;
}

export enum UserRoleEnum {
  USER = "USER",
  Admin = "admin",
}

export enum SeatReservationStatusEnum {
  Available = "available",
  TemporarilyReserved = "temporarily_reserved",
  Occupied = "occupied",
  Disabled = "disabled",
}

export enum UpdateSeatDtoStatusEnum {
  Available = "available",
  TemporarilyReserved = "temporarily_reserved",
  Occupied = "occupied",
  Disabled = "disabled",
}

export enum MovieControllerFindAllParamsGenresEnum {
  Action = "action",
  Adventure = "adventure",
  SciFi = "sci-fi",
  Comedy = "comedy",
  Drama = "drama",
  Fantasy = "fantasy",
  Musical = "musical",
  Thriller = "thriller",
  Horror = "horror",
  Western = "western",
  War = "war",
  Historical = "historical",
  Crime = "crime",
  Noir = "noir",
  Romance = "romance",
  Animation = "animation",
  Documentary = "documentary",
  Superheroes = "superheroes",
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Monotributo Recurrente
 * @version 1.0
 * @contact
 *
 * Monotributo API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name AppControllerGetHello
   * @request GET:/
   * @response `200` `string`
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: "GET",
      format: "json",
      ...params,
    });

  user = {
    /**
     * No description
     *
     * @tags User
     * @name UserControllerCreate
     * @request POST:/user
     * @response `201` `User`
     */
    userControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerFindAll
     * @request GET:/user
     * @response `200` `(User)[]`
     */
    userControllerFindAll: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/user`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerFindOne
     * @request GET:/user/{id}
     * @response `200` `User`
     */
    userControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  cinema = {
    /**
     * No description
     *
     * @tags Cinema
     * @name CinemaControllerCreate
     * @request POST:/cinema
     * @secure
     * @response `201` `Cinema`
     */
    cinemaControllerCreate: (data: CreateCinemaDto, params: RequestParams = {}) =>
      this.request<Cinema, any>({
        path: `/cinema`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Cinema
 * @name CinemaControllerFindAll
 * @request GET:/cinema
 * @response `200` `(PaginatedResponseDto & {
    data?: (Cinema)[],

})` Paginated response Cinema
 */
    cinemaControllerFindAll: (
      query?: {
        limit?: number;
        /** @min 0 */
        page?: number;
        name?: string;
        location?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedResponseDto & {
          data?: Cinema[];
        },
        any
      >({
        path: `/cinema`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cinema
     * @name CinemaControllerFindOne
     * @request GET:/cinema/{id}
     * @response `200` `Cinema`
     */
    cinemaControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<Cinema, any>({
        path: `/cinema/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cinema
     * @name CinemaControllerUpdate
     * @request PATCH:/cinema/{id}
     * @secure
     * @response `200` `Cinema`
     */
    cinemaControllerUpdate: (id: number, data: UpdateCinemaDto, params: RequestParams = {}) =>
      this.request<Cinema, any>({
        path: `/cinema/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  invoice = {
    /**
     * No description
     *
     * @tags Invoice
     * @name InvoiceControllerCreate
     * @request POST:/invoice
     * @response `201` `string`
     */
    invoiceControllerCreate: (data: CreateInvoiceDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/invoice`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Invoice
     * @name InvoiceControllerFindAll
     * @request GET:/invoice
     * @response `200` `string`
     */
    invoiceControllerFindAll: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/invoice`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Invoice
     * @name InvoiceControllerFindOne
     * @request GET:/invoice/{id}
     * @response `200` `string`
     */
    invoiceControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/invoice/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Invoice
     * @name InvoiceControllerUpdate
     * @request PATCH:/invoice/{id}
     * @response `200` `string`
     */
    invoiceControllerUpdate: (id: string, data: UpdateInvoiceDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/invoice/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Invoice
     * @name InvoiceControllerRemove
     * @request DELETE:/invoice/{id}
     * @response `200` `string`
     */
    invoiceControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/invoice/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
  movie = {
    /**
     * No description
     *
     * @tags Movie
     * @name MovieControllerCreate
     * @request POST:/movie
     * @secure
     * @response `201` `Movie`
     */
    movieControllerCreate: (data: CreateMoviePhotosDto, params: RequestParams = {}) =>
      this.request<Movie, any>({
        path: `/movie`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Movie
 * @name MovieControllerFindAll
 * @request GET:/movie
 * @response `200` `(PaginatedResponseDto & {
    data?: (Movie)[],

})` Paginated response Movie
 */
    movieControllerFindAll: (
      query?: {
        limit?: number;
        /** @min 0 */
        page?: number;
        genres?: MovieControllerFindAllParamsGenresEnum[];
        description?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedResponseDto & {
          data?: Movie[];
        },
        any
      >({
        path: `/movie`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Movie
     * @name MovieControllerFindOne
     * @request GET:/movie/{id}
     * @response `200` `Movie`
     */
    movieControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<Movie, any>({
        path: `/movie/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  genre = {
    /**
     * No description
     *
     * @tags Genre
     * @name GenreControllerCreate
     * @request POST:/genre
     * @response `201` `Genre`
     */
    genreControllerCreate: (data: CreateGenreDto, params: RequestParams = {}) =>
      this.request<Genre, any>({
        path: `/genre`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Genre
     * @name GenreControllerFindAll
     * @request GET:/genre
     * @response `200` `(Genre)[]`
     */
    genreControllerFindAll: (params: RequestParams = {}) =>
      this.request<Genre[], any>({
        path: `/genre`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Genre
     * @name GenreControllerFindOne
     * @request GET:/genre/{id}
     * @response `200` `Genre`
     */
    genreControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Genre, any>({
        path: `/genre/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Genre
     * @name GenreControllerUpdate
     * @request PATCH:/genre/{id}
     * @response `200` `Genre`
     */
    genreControllerUpdate: (id: string, data: UpdateGenreDto, params: RequestParams = {}) =>
      this.request<Genre, any>({
        path: `/genre/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Genre
     * @name GenreControllerRemove
     * @request DELETE:/genre/{id}
     * @response `200` `void`
     */
    genreControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/genre/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  screening = {
    /**
     * No description
     *
     * @tags Screening
     * @name ScreeningControllerCreate
     * @request POST:/screening
     * @secure
     * @response `201` `Screening`
     */
    screeningControllerCreate: (data: CreateScreeningDto, params: RequestParams = {}) =>
      this.request<Screening, any>({
        path: `/screening`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Screening
 * @name ScreeningControllerFindAll
 * @request GET:/screening
 * @response `200` `(PaginatedResponseDto & {
    data?: (Screening)[],

})` Paginated response Screening
 */
    screeningControllerFindAll: (
      query?: {
        limit?: number;
        /** @min 0 */
        page?: number;
        /** @min 0 */
        startTime?: number;
        genres?: string[];
        name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedResponseDto & {
          data?: Screening[];
        },
        any
      >({
        path: `/screening`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Screening
     * @name ScreeningControllerFindOneSeat
     * @request GET:/screening/screening-seats/{id}
     * @response `200` `(SeatReservation)[]`
     */
    screeningControllerFindOneSeat: (id: number, params: RequestParams = {}) =>
      this.request<SeatReservation[], any>({
        path: `/screening/screening-seats/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Screening
     * @name ScreeningControllerScreeningsAvailableByMovie
     * @request GET:/screening/screening-available/{id}
     * @response `200` `(Screening)[]`
     */
    screeningControllerScreeningsAvailableByMovie: (id: number, params: RequestParams = {}) =>
      this.request<Screening[], any>({
        path: `/screening/screening-available/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Screening
     * @name ScreeningControllerGetTemporarilyReserveSeat
     * @request GET:/screening/reserved-seats/{id}
     * @secure
     * @response `200` `(SeatReservation)[]`
     */
    screeningControllerGetTemporarilyReserveSeat: (id: number, params: RequestParams = {}) =>
      this.request<SeatReservation[], any>({
        path: `/screening/reserved-seats/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Screening
     * @name ScreeningControllerFindOne
     * @request GET:/screening/{id}
     * @response `200` `Screening`
     */
    screeningControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<Screening, any>({
        path: `/screening/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Screening
     * @name ScreeningControllerUpdate
     * @request PATCH:/screening/update-seat
     * @secure
     * @response `200` `void`
     */
    screeningControllerUpdate: (data: UpdateSeatDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/screening/update-seat`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Screening
     * @name ScreeningControllerTempReserveSeat
     * @request PATCH:/screening/temp-reserve-seat
     * @secure
     * @response `200` `void`
     */
    screeningControllerTempReserveSeat: (data: SeatReserveDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/screening/temp-reserve-seat`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Screening
     * @name ScreeningControllerReserveSeat
     * @request PATCH:/screening/reserve-seat
     * @secure
     * @response `200` `void`
     */
    screeningControllerReserveSeat: (data: SeatReserveDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/screening/reserve-seat`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  theater = {
    /**
     * No description
     *
     * @tags Theater
     * @name TheaterControllerCreate
     * @request POST:/theater
     * @response `201` `Theater`
     */
    theaterControllerCreate: (data: CreateTheaterDto, params: RequestParams = {}) =>
      this.request<Theater, any>({
        path: `/theater`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Theater
     * @name TheaterControllerFindAll
     * @request GET:/theater
     * @response `200` `void`
     */
    theaterControllerFindAll: (
      query?: {
        limit?: number;
        /** @min 0 */
        page?: number;
        /** @min 1 */
        rows?: number;
        /** @min 1 */
        seatsPerRow?: number;
        name?: string;
        cinemaId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/theater`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Theater
     * @name TheaterControllerFindOne
     * @request GET:/theater/{id}
     * @response `200` `Theater`
     */
    theaterControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<Theater, any>({
        path: `/theater/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @request POST:/auth/login
     * @response `200` `LoginResponseDto` Login response
     * @response `201` `void`
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<LoginResponseDto, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @request POST:/auth/register
     * @response `201` `void`
     */
    authControllerRegister: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
