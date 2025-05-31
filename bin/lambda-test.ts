import { Toolkit } from '@aws-cdk/toolkit-lib';
import { createCloudAssembly, deployStack, invokeLambda, destroyStack } from '../lib/actions';

async function main(): Promise<void> {
  const toolkit = new Toolkit();
  const stackName = 'TestPayloadStack';
  let cloudAssembly;

  try {
    cloudAssembly = await createCloudAssembly(toolkit);
    const stack = await deployStack(toolkit, cloudAssembly, stackName);

    const functionArn = stack.outputs?.['functionArn'] as string;
    if (!functionArn) {
      throw new Error('Function ARN not found in stack outputs');
    }
    await invokeLambda(functionArn, { payload: 'test-failed' });

    await destroyStack(toolkit, cloudAssembly, stackName);
  } catch (error: unknown) {
    console.error(error);

    if (cloudAssembly) {
      try {
        if (!(error instanceof Error && error.message.includes('manifest.json'))) {
          await destroyStack(toolkit, cloudAssembly, stackName);
        }
      } catch (cleanupError) {
        console.error(cleanupError);
      }
    }

    process.exit(1);
  }
}

main();
