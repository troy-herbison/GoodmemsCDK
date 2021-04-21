import * as core from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";

export class GoodmemsCdkStack extends core.Stack {
  constructor(scope: core.App, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(this, "ImageStore");
    bucket.applyRemovalPolicy(core.RemovalPolicy.DESTROY);

    const handler = new lambda.Function(this, "PreSignedUrlHandler", {
      runtime: lambda.Runtime.NODEJS_10_X, 
      code: lambda.Code.fromAsset("../GoodmemsAPI/Lambda"),
      handler: "images.getPreSignedURLToPutToS3",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    bucket.grantReadWrite(handler); 

    const api = new apigateway.RestApi(this, "images-api", {
      restApiName: "Image Service",
      description: "This service serves images."
    });

    const getImagesIntegration = new apigateway.LambdaIntegration(handler);

    api.root.addMethod("POST", getImagesIntegration);
  }
}
