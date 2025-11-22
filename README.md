# DreamFoundation

## GraphQL Setup
- Configure `NEXT_PUBLIC_GRAPHQL_ENDPOINT` (or `GRAPHQL_ENDPOINT` for server-only usage) in `.env.local` with your backend GraphQL URL.
- Use `src/lib/graphqlClient.ts` for all GraphQL calls to benefit from shared configuration, timeouts, and consistent error handling.
- Mutation-specific helpers, such as `src/lib/studentRegistration.ts`, should wrap `graphQLRequest` and be imported where needed (for example, `StudentRegistrationComponent`).