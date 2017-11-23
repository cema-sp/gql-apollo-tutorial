import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import Link from './Link';

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

class LinkList extends Component {
  updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: ALL_LINKS_QUERY });

    const votedLink = data.allLinks.find(link => (link.id === linkId));
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: ALL_LINKS_QUERY, data });
  }

  render() {
    const { allLinksQuery } = this.props;
    const { loading, error, allLinks } = allLinksQuery;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return(
      <div>
        {allLinks.map((link, idx) =>
          <Link
            key={link.id}
            link={link}
            index={idx}
            updateStoreAfterVote={this.updateCacheAfterVote}
          />
        )}
      </div>
    );
  }
}

export default graphql(
  ALL_LINKS_QUERY, { name: 'allLinksQuery' }
)(LinkList);
