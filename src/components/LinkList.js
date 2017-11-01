import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import Link from './Link';

const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`;

class LinkList extends Component {
  render() {
    const { allLinksQuery } = this.props;
    const { loading, error, allLinks } = allLinksQuery;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return(
      <div>
        {allLinks.map((link) =>
          <Link key={link.id} link={link} />
        )}
      </div>
    );
  }
}

export default graphql(
  ALL_LINKS_QUERY,
  { name: 'allLinksQuery' }
)(LinkList);
