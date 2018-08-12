const BookListController = require('./booksListController');
const Router = require('../routing/router');
const BooksListRoutesBuilder = require('../routing/routesBuilders/booksListRoutesBuilder');

beforeEach(() => {
  const router = new Router([
    new BooksListRoutesBuilder(),
  ]);
  router.registerRoutes(jest.fn(), jest.fn());
});

describe('testing BooksListController controller', () => {
  test('GetBook action success', async (done) => {
    const sendFunc = (status, resource) => {
      expect(status).toBe(200);
      expect(resource.id).toBe(0);
      done();
    };
    const controller = new BookListController({ params: { id: 0 }, send: sendFunc });
    await controller.getBook();
  });

  test('RateBook action success', async (done) => {
    const sendFunc = (status, resource) => {
      expect(status).toBe(200);
      expect(resource.id).toBe(0);
      expect(resource.rating).toBe(5);
      done();
    };
    const controller = new BookListController(
        { params: { id: 0 }, body: { rating: 5 }, send: sendFunc },
    );
    await controller.rateBook();
  });

  test('RemoveBook action success', async (done) => {
    const sendFunc = (status) => {
      expect(status).toBe(204);
      done();
    };
    const controller = new BookListController({ send: sendFunc });
    await controller.removeBook();
  });
});
