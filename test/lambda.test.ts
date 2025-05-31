import { handler } from '../lambda/index';

interface MockConsole extends Console {
  log: jest.Mock;
  error: jest.Mock;
}

(global.console as MockConsole) = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
};

describe('Lambda Handler Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return success response with status 200', async () => {
    const event = { payload: 'test-data' };

    const result = await handler(event);

    expect(result).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: expect.stringContaining('Lambda executed successfully'),
    });

    const body = JSON.parse(result.body);
    expect(body.status).toBe('ok');
    expect(body.message).toBe('Lambda executed successfully');

    expect(console.log as jest.Mock).toHaveBeenCalledWith('Processing event:', JSON.stringify(event));
  });

  test('should handle test-failed payload correctly', async () => {
    const event = { payload: 'test-failed' };

    const result = await handler(event);

    expect(result).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'ok',
        message: 'Test failure path handled successfully',
      }),
    });
    expect(console.log as jest.Mock).toHaveBeenCalledWith('Processing event:', JSON.stringify(event));
    expect(console.log as jest.Mock).toHaveBeenCalledWith('Test failure path triggered');
  });

  test('should handle errors and return status 500', async () => {
    const event = { payload: 'test-data' };
    const testError = new Error('Test error');

    (console.log as jest.Mock).mockImplementationOnce(() => {
      throw testError;
    });

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(result.headers).toEqual({
      'Content-Type': 'application/json',
    });

    const body = JSON.parse(result.body);
    expect(body.status).toBe('error');
    expect(body.message).toBe('Lambda execution failed');

    expect(console.error as jest.Mock).toHaveBeenCalledWith('Error:', testError);
  });
});
