#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GoodmemsCdkStack } from '../lib/goodmems_cdk-stack';

const app = new cdk.App();
new GoodmemsCdkStack(app, 'GoodmemsCdkStack');
