import { gql } from '@apollo/client';

export const GET_ASSET_PROPS = gql`
query GetAssetProps($assetId: ID!, $universeVerse: Int) {
  assetPropsById(id: $assetId, verse: $universeVerse) {
    props
    proof
    cid
  }
}
`;

export const GET_CURRENT_VERSE = gql`
query GetCurrentVerse ($assetId: ID!) {
  assetPropsById(id: $assetId) {
    props
    proof
    cid
    verse
  }
}
`;
