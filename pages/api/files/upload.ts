import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
//파일 업로드를 위해 formidable이라는 라이브러리를 설치하도록 하겠다.
//양식데이터, 특히 파일 업로드를 구문 분석하기 위한 Node.js 모듈이다.

import aws from 'aws-sdk';
import { createReadStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const url = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        //parse 함수를 이용하여 파일의 정보를 받을 수 있다.
        //프론트에서 받은 파일의 정보를 서버에서 읽을수있게되었다.
        //이 파일을 저장하여 브라우저에서 불러와 사용할수 있도록 aws s3라는 클라우드 스토리지에 올려보겠다
        form.parse(req, async (err, fields, files: any) => {
          const s3 = new aws.S3({
            accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESSKEY_ID,
          });
          const stream = createReadStream(files.file.filepath);
          //파일이름
          const originalFileName = files.file.newFilename.split('.').shift();
          //확장자
          const fileExtension = files.file.newFilename.split('.').pop();
          s3.upload({
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: `${originalFileName}__${uuidv4()}.${fileExtension}`,
            ACL: 'public-read',
            Body: stream,
          })
            .promise()
            .then(res => resolve(res.Location))
            .catch(error => reject(error));
        });
      });
      res.statusCode = 201;
      res.send(url);
    } catch (e) {
      console.log(e);
      res.end();
    }
  }
  res.statusCode = 405;
  return res.end();
};
