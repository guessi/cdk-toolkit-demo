# CDK Toolkit Demo

A demonstration of using [AWS CDK Toolkit Library](https://github.com/aws/aws-cdk-cli) to programmatically operate CloudFormation stacks

This project reimplements the demo scripts in [TypeScript](https://www.typescriptlang.org/), extending the examples from [Build Custom CLI's, Deployment Automation, and more with the AWS CDK Toolkit Library](https://community.aws/content/2wm6TNpUlPMVgcvXVySywxWaO7T) with additional integrations and test coverage.

## Prerequisites

- NodeJS LTS
- AWS CLI
- TypeScript

## Installation

```bash
npm install
```

## How to Run

### Quick Start

Run the complete workflow with a single command:

```bash
npm start
```

<details>
<summary>Click here to see the full output</summary>

```bash
npm start
```

```bash
> cdk-toolkit-demo@1.0.0 start
> npm run build && cd lambda && npx tsc && cd .. && npx ts-node bin/lambda-test.ts


> cdk-toolkit-demo@1.0.0 prebuild
> npm run clean


> cdk-toolkit-demo@1.0.0 clean
> rm -rf dist cdk.out


> cdk-toolkit-demo@1.0.0 build
> tsc

✨  Synthesis time: 0s
TestPayloadStack: start: Building TestPayloadStack Template
TestPayloadStack: success: Built TestPayloadStack Template
TestPayloadStack: start: Publishing TestPayloadStack Template (current_account-current_region)
TestPayloadStack: success: Published TestPayloadStack Template (current_account-current_region)
Stack TestPayloadStack
IAM Statement Changes
┌───┬───────────────────────────────────────┬────────┬────────────────┬──────────────────────────────┬───────────┐
│   │ Resource                              │ Effect │ Action         │ Principal                    │ Condition │
├───┼───────────────────────────────────────┼────────┼────────────────┼──────────────────────────────┼───────────┤
│ + │ ${PayloadCheckLambda/ServiceRole.Arn} │ Allow  │ sts:AssumeRole │ Service:lambda.amazonaws.com │           │
└───┴───────────────────────────────────────┴────────┴────────────────┴──────────────────────────────┴───────────┘
IAM Policy Changes
┌───┬───────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────┐
│   │ Resource                          │ Managed Policy ARN                                                             │
├───┼───────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────┤
│ + │ ${PayloadCheckLambda/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole │
└───┴───────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)



"--require-approval" is enabled and stack includes security-sensitive updates.
Do you wish to deploy these changes
TestPayloadStack: deploying... [1/1]
TestPayloadStack: creating CloudFormation changeset...
TestPayloadStack | 0/4 | 8:57:21 PM | REVIEW_IN_PROGRESS   | AWS::CloudFormation::Stack | TestPayloadStack User Initiated
TestPayloadStack | 0/4 | 8:57:27 PM | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack | TestPayloadStack User Initiated
TestPayloadStack | 0/4 | 8:57:29 PM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | PayloadCheckLambda/ServiceRole (PayloadCheckLambdaServiceRole71A1ABD0)
TestPayloadStack | 0/4 | 8:57:29 PM | CREATE_IN_PROGRESS   | AWS::CDK::Metadata         | CDKMetadata/Default (CDKMetadata)
TestPayloadStack | 0/4 | 8:57:30 PM | CREATE_IN_PROGRESS   | AWS::IAM::Role             | PayloadCheckLambda/ServiceRole (PayloadCheckLambdaServiceRole71A1ABD0) Resource creation Initiated
TestPayloadStack | 0/4 | 8:57:30 PM | CREATE_IN_PROGRESS   | AWS::CDK::Metadata         | CDKMetadata/Default (CDKMetadata) Resource creation Initiated
TestPayloadStack | 1/4 | 8:57:30 PM | CREATE_COMPLETE      | AWS::CDK::Metadata         | CDKMetadata/Default (CDKMetadata)
TestPayloadStack | 2/4 | 8:57:47 PM | CREATE_COMPLETE      | AWS::IAM::Role             | PayloadCheckLambda/ServiceRole (PayloadCheckLambdaServiceRole71A1ABD0)
TestPayloadStack | 2/4 | 8:57:48 PM | CREATE_IN_PROGRESS   | AWS::Lambda::Function      | PayloadCheckLambda (PayloadCheckLambdaAE0A8F40)
TestPayloadStack | 2/4 | 8:57:49 PM | CREATE_IN_PROGRESS   | AWS::Lambda::Function      | PayloadCheckLambda (PayloadCheckLambdaAE0A8F40) Resource creation Initiated
TestPayloadStack | 2/4 | 8:57:50 PM | CREATE_IN_PROGRESS   | AWS::Lambda::Function      | PayloadCheckLambda (PayloadCheckLambdaAE0A8F40) Eventual consistency check initiated
TestPayloadStack | 2/4 | 8:57:50 PM | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack | TestPayloadStack Eventual consistency check initiated
TestPayloadStack | 3/4 | 8:57:56 PM | CREATE_COMPLETE      | AWS::Lambda::Function      | PayloadCheckLambda (PayloadCheckLambdaAE0A8F40)
TestPayloadStack | 4/4 | 8:57:57 PM | CREATE_COMPLETE      | AWS::CloudFormation::Stack | TestPayloadStack

 ✅  TestPayloadStack
✨  Deployment time: 43.22s
Outputs:
TestPayloadStack.functionArn = arn:aws:lambda:{{ AWS_REGION }}:{{ AWS_ACCOUNT }}:function:TestPayloadStack-PayloadCheckLambdaAE0A8F40-SIzaKuKqiNYS
Stack ARN:
arn:aws:cloudformation:{{ AWS_REGION }}:{{ AWS_ACCOUNT }}$:stack/TestPayloadStack/ca3f4350-3e1e-11f0-a38a-0ecd28d91eff
✨  Total time: 43.22s
Lambda response payload: {"statusCode":200,"headers":{"Content-Type":"application/json"},"body":"{\"status\":\"ok\",\"message\":\"Test failure path handled successfully\"}"}
Lambda execution successful: { status: 'ok', message: 'Test failure path handled successfully' }
✨  Synthesis time: 0s
Are you sure you want to delete: TestPayloadStack
TestPayloadStack: destroying... [1/1]
TestPayloadStack |   0 | 8:58:03 PM | DELETE_IN_PROGRESS   | AWS::CloudFormation::Stack | TestPayloadStack User Initiated
TestPayloadStack |   0 | 8:58:04 PM | DELETE_IN_PROGRESS   | AWS::Lambda::Function      | PayloadCheckLambda (PayloadCheckLambdaAE0A8F40)
TestPayloadStack |   0 | 8:58:04 PM | DELETE_IN_PROGRESS   | AWS::CDK::Metadata         | CDKMetadata/Default (CDKMetadata)
TestPayloadStack |   1 | 8:58:06 PM | DELETE_COMPLETE      | AWS::CDK::Metadata         | CDKMetadata/Default (CDKMetadata)
TestPayloadStack |   2 | 8:58:08 PM | DELETE_COMPLETE      | AWS::Lambda::Function      | PayloadCheckLambda (PayloadCheckLambdaAE0A8F40)
TestPayloadStack |   2 | 8:58:09 PM | DELETE_IN_PROGRESS   | AWS::IAM::Role             | PayloadCheckLambda/ServiceRole (PayloadCheckLambdaServiceRole71A1ABD0)

 ✅  TestPayloadStack: destroyed
✨  Destroy time: 18.16s
```
</details>

### Run scripts with CDK

```bash
# Synthesize CloudFormation template
npx cdk synth

# Deploy stack
npx cdk deploy

# Destroy stack
npx cdk destroy
```

## Testing

The project includes automated tests for the Lambda function:

```bash
# Run all tests
npm test
```

## Frequently Asked Questions

### How do I access the AWS CDK Toolkit Library?

- The AWS CDK Toolkit Library was released on May 30, 2025 with the announcement [AWS CDK Toolkit Library is now generally available](https://aws.amazon.com/about-aws/whats-new/2025/05/aws-cdk-toolkit-library-available/). You can find the library at https://github.com/aws/aws-cdk-cli

### Is there a tutorial available?

- Yes! The announcement includes a detailed getting started guide: [Build Custom CLI's, Deployment Automation, and more with the AWS CDK Toolkit Library](https://community.aws/content/2wm6TNpUlPMVgcvXVySywxWaO7T)
