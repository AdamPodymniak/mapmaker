import '@styles/globals.css';

import Provider from '@components/Provider';
import Nav from '@components/Nav';

export const metadata = {
    title: "Mapmaker",
    description: "Discover and share your maps"
}

const RootLayout = ({ children }) => (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
  
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );

export default RootLayout