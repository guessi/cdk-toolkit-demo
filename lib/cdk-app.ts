import { App } from 'aws-cdk-lib';
import { PayloadCheckStack } from './payload-check-stack';

// Create a new CDK app
const app = new App();

// Create the stack
new PayloadCheckStack(app, 'TestPayloadStack');

// Synthesize the app
app.synth();
