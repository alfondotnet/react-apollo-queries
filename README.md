## react-apollo-queries

Small `<Query>` wrapper component for [react-apollo](https://github.com/apollographql/react-apollo) that supports multiple parallel queries and handles the nesting for you.

Instead of:

```
<Query query={LOAD_USER} variables={{ userId: this.props.userId }}>
  {({ data }) => <Query query={LOAD_IMAGES}}>
    ...
  </Query>}
</Query>
```

Write:

```
<Queries queries={[LOAD_USER, LOAD_IMAGES]} queriesProps={[
  {
    variables: { userId: this.props.userId}
  }
]}>
  {([ {data: userData }, {data: imagesData }]) => ...}
</Queries>
```

### Motivation

When migrating to graphQL, and using something like [apollo-link-rest](https://github.com/apollographql/apollo-link-rest), sometimes you want
to throw parallel queries so faster fields don't have to wait on slower ones.
