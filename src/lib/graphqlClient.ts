const DEFAULT_TIMEOUT_MS = 15_000;

export type GraphQLVariables = Record<string, unknown>;

export interface GraphQLRequestOptions {
  query: string;
  variables?: GraphQLVariables;
  operationName?: string;
  headers?: HeadersInit;
  authToken?: string;
  timeoutMs?: number;
  endpoint?: string;
}

export interface GraphQLClientErrorDetail {
  message: string;
  path?: readonly (string | number)[];
  extensions?: Record<string, unknown>;
}

interface GraphQLResponse<TData> {
  data?: TData;
  errors?: GraphQLClientErrorDetail[];
}

export class GraphQLClientError extends Error {
  public readonly status?: number;
  public readonly details?: GraphQLClientErrorDetail[];

  constructor(message: string, options?: { status?: number; details?: GraphQLClientErrorDetail[] }) {
    super(message);
    this.name = 'GraphQLClientError';
    this.status = options?.status;
    this.details = options?.details;
  }
}

const resolveEndpoint = (override?: string): string => {
  const endpoint =
    override ||
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    process.env.GRAPHQL_ENDPOINT ||
    '';

  if (!endpoint) {
    throw new GraphQLClientError(
      'GraphQL endpoint is not configured. Please set NEXT_PUBLIC_GRAPHQL_ENDPOINT.',
    );
  }

  return endpoint;
};

export const graphQLRequest = async <TData>({
  query,
  variables,
  operationName,
  headers,
  authToken,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  endpoint,
}: GraphQLRequestOptions): Promise<TData> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const resolvedEndpoint = resolveEndpoint(endpoint);

  try {
    const response = await fetch(resolvedEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...headers,
      },
      body: JSON.stringify({
        query,
        variables,
        operationName,
      }),
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') || '';
    const payload: GraphQLResponse<TData> = contentType.includes('application/json')
      ? await response.json()
      : { errors: [{ message: await response.text() }] };

    if (!response.ok) {
      throw new GraphQLClientError('GraphQL network request failed', {
        status: response.status,
        details: payload.errors,
      });
    }

    if (payload.errors?.length) {
      throw new GraphQLClientError('GraphQL operation failed', {
        status: response.status,
        details: payload.errors,
      });
    }

    if (typeof payload.data === 'undefined') {
      throw new GraphQLClientError('GraphQL response did not include data', {
        status: response.status,
      });
    }

    return payload.data;
  } catch (error) {
    if (error instanceof GraphQLClientError) {
      throw error;
    }

    const message =
      error instanceof Error && error.name === 'AbortError'
        ? `GraphQL request timed out after ${timeoutMs}ms`
        : (error as Error)?.message || 'Unknown GraphQL client error';

    throw new GraphQLClientError(message);
  } finally {
    clearTimeout(timeoutId);
  }
};


