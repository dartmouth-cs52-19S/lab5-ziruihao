import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const signS3 = (req, res) => {
  const s3 = new aws.S3({ signatureVersion: 'v4' });
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) { res.status(422).end(); }

    const returnData = {
      signedRequest: data,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
    };
    console.log(returnData);
    return (res.send(JSON.stringify(returnData)));
  });
};

export default signS3;
