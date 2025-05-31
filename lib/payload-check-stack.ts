import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class PayloadCheckStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const payloadCheckLambda = new lambda.Function(this, 'PayloadCheckLambda', {
      runtime: lambda.Runtime.NODEJS_LATEST,
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      handler: 'index.handler',
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
        NODE_ENV: 'production',
      },
      timeout: cdk.Duration.seconds(10),
      memorySize: 128,
    });

    new cdk.CfnOutput(this, 'functionArn', {
      value: payloadCheckLambda.functionArn,
    });
  }
}
