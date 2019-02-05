import React from "react";
import { Query, QueryResult, QueryProps } from "react-apollo";
import { DocumentNode } from "graphql";

type QueriesProps = {
  queries: DocumentNode[];
  queriesProps: Array<Partial<QueryProps>>;
  children: (results: QueryResult[]) => JSX.Element | null;
};

function queryWrapperRecursive(
  queries: QueriesProps["queries"],
  queriesProps: QueriesProps["queriesProps"],
  children: QueriesProps["children"],
  results: QueryResult[]
) {
  const [query, ...restQueries] = queries;

  let queryProps: QueryProps | {} = {};
  let restQueriesProps: Array<Partial<QueryProps>> = [];

  if (queriesProps) {
    queryProps = queriesProps[0];
    restQueriesProps = queriesProps.slice(1);
  }

  if (!query) {
    throw new Error("There must be at least one query passed to Queries");
  }

  return (
    <Query query={query} {...queryProps}>
      {restQueries.length === 0
        ? queryResult => children([...results, queryResult])
        : queryResult =>
            queryWrapperRecursive(restQueries, restQueriesProps, children, [
              ...results,
              queryResult,
            ])}
    </Query>
  );
}

const Queries = ({ queries, queriesProps, children }: QueriesProps) =>
  queryWrapperRecursive(queries, queriesProps, children, []);

export default Queries;
