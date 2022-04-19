import { gql } from '@apollo/client';

export const GET_ASSET_PROPS = gql`
query GetAssetProps ($assetId: String!, $universeVerse: Int!) {
  propByAssetIdAndUniverseVerse(assetId: $assetId, universeVerse: $universeVerse) {
    props
    proof
    cid
  }
}
`;

export const GET_CURRENT_VERSE = gql`
query GetCurrentVerse ($universeId: String!) {
  universeCurrentVerse(universeId: $universeId)
}
`;