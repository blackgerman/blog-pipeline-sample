import { Stage, Construct, StageProps } from "@aws-cdk/core";
 
import { BlogPipelineSampleStack } from "./blog-pipeline-sample-stack";

export class BlogPipelineStage extends Stage {
	constructor(scope: Construct, id: string, props?: StageProps) {
		super(scope, id, props);

        //***********Instantiate the resource stack***********
        new BlogPipelineSampleStack(this, `BlogPipelineSampleStack`);
	}
}