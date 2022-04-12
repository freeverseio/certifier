import { gql } from '@apollo/client';

export const CREATE_ASSET = gql`
  mutation AddFreeAsset(
    $owner: String!
    $email: String!
    $encryptedId: String!
  ) {
    addFreeAsset(
        owner: $owner
        email: $email
        encryptedId: $encryptedId
    ){
      assetId
    }
  }
`;

export const GET_INFO = gql`
query GetInfo ($assetId: String!, $universeVerse: Int!) {
  propByAssetIdAndUniverseVerse(assetId: $assetId, universeVerse: $universeVerse) {
    props
    proof
    cid
  }
}
`;