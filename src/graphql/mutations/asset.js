import { gql } from '@apollo/client';

export const GET_ASSET_PROPS = gql`
query GetAssetProps($assetId: ID!) {
  assetPropsById(id: $assetId) {
    props
    proof
    cid
  }
}
`;