import { graphql } from 'msw'

export const handlers = [

  graphql.mutation('AddFreeAsset', (req, res, ctx) => {
    const  data  = req.variables;
    if (data.email === '123456') {
      return res(
        ctx.errors([
          {
            message: 'Email not not valid',
          },
        ])
      )
    }
    return res(
      ctx.data({
        addFreeAsset: {
          email: '',
          owner: '',
          encryptedId: '',
          assetId: '12345'
        }
      })
    )
  }),
]