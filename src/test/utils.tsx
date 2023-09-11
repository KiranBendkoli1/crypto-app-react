import { rest } from "msw"
import { setupServer } from "msw/native"

// declare which API requests to mock
const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/greeting', (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(ctx.json({status: 'loading'}))
    }),
  )
  
  // establish API mocking before all tests
  beforeAll(() => server.listen())
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => server.resetHandlers())
  // clean up once the tests are done
  afterAll(() => server.close())
  
  // ...
  
  test('handles server error', async () => {
    server.use(
      // override the initial "GET /greeting" request handler
      // to return a 500 Server Error
      rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )
  
    // ...
  })