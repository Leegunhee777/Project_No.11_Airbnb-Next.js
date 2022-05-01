import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      res.statusCode = 400;
      return res.send('위치 정보가 없습니다.');
    }
    try {
      //프론트에서 받아온 위도 경도를 가지고 구글 api로 호출하여 위치정보를 받아서 프론트에 뿌려줌
      const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
      const { data } = await axios.get(URL);
      const addressComponent = data.results[0].address_components;
      const { lat, lng } = data.results[0].geometry.location;
      const result = {
        latitude: lat,
        longitude: lng,
        streetAddress: `${addressComponent[1].long_name}${addressComponent[0].long_name}`,
        district: addressComponent[2].long_name,
        city: addressComponent[3].long_name,
        country: addressComponent[5].long_name,
        postcode: addressComponent[6].long_name,
      };
      res.statusCode = 200;
      res.send(result);
    } catch (e) {
      res.statusCode = 404;
      return res.end();
    }
  }
  res.statusCode = 405;
  return res.end();
};
