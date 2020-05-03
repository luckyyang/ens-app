import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import 'core-js/es/object'
import App from 'App'
import { setupENS } from 'eladomains-ui'
import { SET_ERROR } from 'graphql/mutations'

import { GlobalStateProvider } from 'globalState'
import 'globalStyles'
import { setupClient } from 'apolloClient'
import { getNetworkId } from 'eladomains-ui'

window.addEventListener('load', async () => {
  let client
  console.log('===== ensAddress: ', process.env.REACT_APP_ENS_ADDRESS)
  try {
    if (
      process.env.REACT_APP_STAGE === 'local' &&
      process.env.REACT_APP_ENS_ADDRESS
    ) {
      await setupENS({
        reloadOnAccountsChange: true,
        customProvider: 'https://rpc.elaeth.io',
        ensAddress: process.env.REACT_APP_ENS_ADDRESS
      })
    } else {
      await setupENS({
        reloadOnAccountsChange: false,
        customProvider: 'https://rpc.elaeth.io',
        ensAddress: process.env.REACT_APP_ENS_ADDRESS
      })
    }
    const networkId = await getNetworkId()
    client = await setupClient(networkId)
  } catch (e) {
    console.log(e)
    await client.mutate({
      mutation: SET_ERROR,
      variables: { message: e.message }
    })
  }
  ReactDOM.render(
    <ApolloProvider client={client}>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </ApolloProvider>,
    document.getElementById('root')
  )
})
