import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from "@aws-cdk/core";
import {
	CodeBuildStep,
	CodePipeline,
	CodePipelineSource
} from "@aws-cdk/pipelines";

import { BlogPipelineStage } from './pipeline-stage';

export class BlogPipelineSampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "BlogPipeline", {
			pipelineName: "BlogPipeline",
			synth: new CodeBuildStep("SynthStep", {
				input: CodePipelineSource.connection(
					"blackgerman/blog-pipeline-sample",
					"main",
					{
						connectionArn:
							"arn:aws:codestar-connections:eu-west-3:775738237454:connection/ae0aac13-a822-46a9-89bf-45650d679994"
					}
				),
				installCommands: ["npm install -g aws-cdk"],
				commands: ["npm ci", "npm run build", "npx cdk synth"]
			})
		}); 

    //***********Instantiate the stage and add it to the pipeline***********
		const deploy = new BlogPipelineStage(this, "Deploy");
		pipeline.addStage(deploy);
  }
}
