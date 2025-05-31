interface LambdaEvent {
  payload?: string;
  [key: string]: unknown;
}

interface LambdaResponse {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
}

export const handler = async (event: LambdaEvent): Promise<LambdaResponse> => {
  try {
    console.log('Processing event:', JSON.stringify(event));

    if (event.payload === 'test-failed') {
      console.log('Test failure path triggered');
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'ok',
          message: 'Test failure path handled successfully',
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'ok',
        message: 'Lambda executed successfully',
        nodeVersion: process.version,
        features: {
          hasStructuredClone: typeof globalThis.structuredClone === 'function',
          hasWebStreams: typeof globalThis.ReadableStream === 'function',
          hasWebCrypto: typeof globalThis.crypto === 'object',
        },
      }),
    };
  } catch (error) {
    console.error('Error:', error);

    let errorBody = '';
    try {
      errorBody = JSON.stringify({
        status: 'error',
        message: 'Lambda execution failed',
        error: error instanceof Error ? error.message : String(error),
      });
    } catch {
      errorBody = '{"status":"error","message":"Lambda execution failed"}';
    }

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: errorBody,
    };
  }
};
