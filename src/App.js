import './App.css';
import FormGetAsset from './components/FormGetAsset';
import Header from './components/Header';
import Config from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  // uri: Config.url,
  uri: 'http://188.166.169.44:4001/',
  cache: new InMemoryCache()
});

console.log('Config');
console.log(Config);

function App() {
  return (
    <ApolloProvider client={client}>
      
      <Header />
      <div className="App">
        <FormGetAsset />
      </div>
    </ApolloProvider>
  );
}

export default App;
