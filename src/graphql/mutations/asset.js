import { gql } from '@apollo/client';

export const GET_INFO = gql`
query GetInfo ($assetId: String!, $universeVerse: Int!) {
  propByAssetIdAndUniverseVerse(assetId: $assetId, universeVerse: $universeVerse) {
    props
    proof
    cid
  }
}
`;