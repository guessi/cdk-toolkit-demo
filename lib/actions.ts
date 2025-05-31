import { Toolkit, StackSelectionStrategy } from '@aws-cdk/toolkit-lib';
import { LambdaClient, InvokeCommand, InvokeCommandOutput } from '@aws-sdk/client-lambda';
import { App } from 'aws-cdk-lib';
import { PayloadCheckStack } from './payload-check-stack';

interface DeployedStack {
  stackName: string;
  outputs?: Record<string, unknown>;
  [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CloudAssembly = any;

export async function createCloudAssembly(toolkit: Toolkit): Promise<CloudAssembly> {
  try {
    return await toolkit.fromAssemblyBuilder(async () => {
      const app = new App();
      new PayloadCheckStack(app, 'TestPayloadStack');
      return app.synth();
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error creating cloud assembly:', errorMessage);
    throw error;
  }
}

export async function deployStack(toolkit: Toolkit, cloudAssembly: CloudAssembly, stackName: string): Promise<DeployedStack> {
  try {
    const result = await toolkit.deploy(cloudAssembly, {
      stacks: {
        strategy: StackSelectionStrategy.PATTERN_MUST_MATCH,
        patterns: [stackName],
      },
    });

    const stack = result.stacks.find((s) => s.stackName === stackName);
    if (!stack) {
      throw new Error(`Stack ${stackName} not found after deployment`);
    }

    return {
      ...stack,
      stackName: stack.stackName,
      outputs: stack.outputs || {},
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error deploying stack:', errorMessage);
    throw error;
  }
}

export async function invokeLambda(functionArn: string, payload: Record<string, unknown>): Promise<unknown> {
  try {
    const lambdaClient = new LambdaClient({});
    const invokeCommand = new InvokeCommand({
      FunctionName: functionArn,
      Payload: Buffer.from(JSON.stringify(payload)),
      InvocationType: 'RequestResponse',
    });

    const response: InvokeCommandOutput = await lambdaClient.send(invokeCommand);

    if (response.FunctionError) {
      console.error(`Lambda execution error: ${response.FunctionError}`);
      console.error('Response payload:', Buffer.from(response.Payload ?? []).toString());
      throw new Error(`Lambda execution failed: ${response.FunctionError}`);
    }

    const responsePayload = Buffer.from(response.Payload ?? []).toString();
    console.log('Lambda response payload:', responsePayload);

    const responseData = JSON.parse(responsePayload);

    if (responseData.statusCode === 200) {
      const body = JSON.parse(responseData.body);
      console.log('Lambda execution successful:', body);
      return body;
    } else {
      console.error('Lambda returned non-200 status code:', responseData.statusCode);
      return responseData;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error invoking Lambda:', errorMessage);
    throw error;
  }
}

export async function destroyStack(toolkit: Toolkit, cloudAssembly: CloudAssembly, stackName: string): Promise<void> {
  try {
    await toolkit.destroy(cloudAssembly, {
      stacks: {
        strategy: StackSelectionStrategy.PATTERN_MUST_MATCH,
        patterns: [stackName],
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('manifest.json')) {
      console.log('Stack already destroyed, cdk.out directory cleaned up');
      return;
    }
    throw error;
  }
}
